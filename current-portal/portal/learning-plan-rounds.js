(function (global) {
  var Mock = global.LearningPlanRoundsMock;
  if (!Mock) return;

  function esc(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;");
  }

  function formatAvg(n) {
    if (n == null || isNaN(n)) return "—";
    var s = n.toFixed(1);
    if (s.slice(-2) === ".0") s = s.slice(0, -2);
    return s;
  }

  function mentorsForRound(r) {
    if (r.mentors && r.mentors.length) return r.mentors.slice();
    if (r.mentor) return [r.mentor];
    return [];
  }

  function examAttempts(r) {
    return Mock.examAttemptsForRound ? Mock.examAttemptsForRound(r) : [];
  }

  function examCellHtml(r) {
    var attempts = examAttempts(r);
    if (!attempts.length) {
      return '<span class="lp-exam-score-muted">暂无记录</span>';
    }
    var lines = attempts
      .map(function (a, i) {
        var url = Mock.examResultUrlForRound(r, a.score, i + 1);
        return (
          '<div class="lp-exam-attempt">' +
          '<span class="lp-exam-attempt-idx">第 ' +
          (i + 1) +
          " 次</span> " +
          '<a class="lp-exam-attempt-score" href="' +
          esc(url) +
          '"><b>' +
          esc(String(a.score)) +
          "</b> 分</a>" +
          "</div>"
        );
      })
      .join("");
    return '<div class="lp-exam-cell"><div class="lp-exam-history">' + lines + "</div></div>";
  }

  function examAvgCellHtml(r) {
    var attempts = examAttempts(r);
    if (!attempts.length) {
      return '<span class="lp-exam-score-muted">—</span>';
    }
    var avg = Mock.averageScore(attempts);
    return '<div class="lp-exam-avg-col"><b>' + esc(formatAvg(avg)) + "</b><span>分</span></div>";
  }

  function opsIcon(href, title, label, extraClass, badge) {
    var cls = "lp-ops-ico" + (extraClass ? " " + extraClass : "");
    var badgeHtml = badge != null && badge !== "" ? '<i class="lp-ops-badge">' + esc(String(badge)) + "</i>" : "";
    return (
      '<a class="' + cls + '" href="' + esc(href) + '" title="' + esc(title) + '">' +
      badgeHtml +
      '<span class="lp-ops-ico-label">' + esc(label) + "</span></a>"
    );
  }

  function opsIconMuted(title, label) {
    return (
      '<span class="lp-ops-ico is-muted" title="' + esc(title) + '">' +
      '<span class="lp-ops-ico-label">' + esc(label) + "</span></span>"
    );
  }

  function summaryCellHtml(r) {
    var submitted = !!r.summarySubmitted && r.summary && r.summary.body;
    var status = submitted
      ? '<span class="tag ok">已交</span>'
      : '<span class="tag">未交</span>';
    return status;
  }

  function opsCellHtml(r) {
    var submitted = !!r.summarySubmitted && r.summary && r.summary.body;
    var viewUrl = Mock.summaryUrlForRound(r, "view");
    var editUrl = Mock.summaryUrlForRound(r, submitted ? "edit" : "submit");
    var feedback = (r.summary && r.summary.feedback) || [];
    var introUrl = Mock.examIntroUrlForRound(r);
    var html = '<div class="lp-ops-cell" role="group" aria-label="轮次操作">';
    html += opsIcon(Mock.profUrlForRound(r), "进入素材", "素材", "lp-ops-ico-primary");
    html += opsIcon(introUrl, "进入考试", "考试", "lp-ops-ico-primary");
    if (!submitted) {
      html += opsIcon(editUrl, "提交总结", "总结", "lp-ops-ico-accent");
    } else {
      html += opsIcon(viewUrl, "查看总结", "查阅", "");
      html += opsIcon(editUrl, "编辑总结", "编辑", "");
      if (feedback.length) {
        html += opsIcon(viewUrl + "#feedback", "导师反馈", "反馈", "lp-ops-ico-fb", feedback.length);
      } else {
        html += opsIconMuted("待导师反馈", "待评");
      }
    }
    html += "</div>";
    return html;
  }

  function mentorCellHtml(r) {
    var names = mentorsForRound(r);
    if (!names.length) return "—";
    return names
      .map(function (m) {
        return '<span class="chip chip-sm lp-mentor-chip">' + esc(m) + "</span>";
      })
      .join(" ");
  }

  function tableHtml() {
    var rows = Mock.rounds();
    if (!rows.length) {
      return '<p class="lead">暂无学习计划轮次，请从右上角「提报学习计划」开始第一轮。</p>';
    }
    var head =
      "<tr><th>轮次</th><th>周期</th><th>价值点</th><th>导师</th><th>浏览素材</th><th>总结</th><th>轮次考试</th><th>综合均分</th><th>操作</th></tr>";
    var body = rows
      .map(function (r) {
        var vps = (r.vps || [])
          .map(function (v) {
            return '<a class="chip chip-sm" href="' + esc(Mock.profUrlForVp(v)) + '">' + esc(v) + "</a>";
          })
          .join(" ");
        return (
          "<tr>" +
          '<td><b>' +
          esc(r.title) +
          '</b><br><span class="lead">' +
          esc(r.status) +
          "</span></td>" +
          "<td>" +
          esc(r.range) +
          "</td>" +
          '<td class="lp-vp-cell">' +
          vps +
          "</td>" +
          '<td class="lp-vp-cell lp-mentor-cell">' +
          mentorCellHtml(r) +
          "</td>" +
          "<td>" +
          esc(String(r.readCount)) +
          " 篇</td>" +
          '<td class="lp-summary-col">' +
          summaryCellHtml(r) +
          "</td>" +
          '<td class="lp-exam-col">' +
          examCellHtml(r) +
          "</td>" +
          '<td class="lp-exam-avg-td">' +
          examAvgCellHtml(r) +
          "</td>" +
          '<td class="lp-ops-col">' +
          opsCellHtml(r) +
          "</td>" +
          "</tr>"
        );
      })
      .join("");
    return (
      '<div class="perf-table-wrap"><table class="s-table lp-rounds-table">' +
      head +
      body +
      "</table></div>" +
      '<p class="lead">按轮次汇总；轮次考试题目由 AI 根据价值点与素材自动生成。每次考试分数单独记录，「综合均分」为该轮历次分数算术平均。</p>'
    );
  }

  function mount(container) {
    if (!container) return;
    container.innerHTML = tableHtml();
  }

  global.LearningPlanRounds = { mount: mount, tableHtml: tableHtml };
})(typeof window !== "undefined" ? window : global);
