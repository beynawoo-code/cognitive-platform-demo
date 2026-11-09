(function (global) {
  var Mock = global.QuarterlyPerfMock;
  if (!Mock) return;

  function escapeText(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  }

  var SEASONS = [
    { id: "", name: "全部季度" },
    { id: "202602", name: "2026Q1&Q2" },
    { id: "202504", name: "2025Q4" },
    { id: "202503", name: "2025Q3" },
    { id: "202502", name: "2025Q2" },
  ];

  var STATUSES = [
    { id: "", name: "全部状态" },
    { id: "FINISHED", name: "已完成" },
    { id: "LEADER_APPROVING", name: "Leader审批中" },
    { id: "BP_APPROVING", name: "BP处理中" },
  ];

  var GRADES = [
    { id: "", name: "全部" },
    { id: "S", name: "S" },
    { id: "A_PLUS", name: "A+" },
    { id: "A", name: "A" },
    { id: "B_PLUS", name: "B+" },
    { id: "B", name: "B" },
  ];

  function filterHtml(prefix) {
    prefix = prefix || "qp";
    function opts(key, items) {
      return items.map(function (it) {
        return '<option value="' + escapeText(it.id) + '">' + escapeText(it.name) + "</option>";
      }).join("");
    }
    return (
      '<div class="perf-filter-bar card">' +
      '<label>选择季度<select data-key="season" data-prefix="' + prefix + '">' + opts("season", SEASONS) + "</select></label>" +
      '<label>状态<select data-key="status" data-prefix="' + prefix + '">' + opts("status", STATUSES) + "</select></label>" +
      '<label>Leader 审核等级<select data-key="leader" data-prefix="' + prefix + '">' + opts("leader", GRADES) + "</select></label>" +
      '<label>选择最终等级<select data-key="final" data-prefix="' + prefix + '">' + opts("final", GRADES) + "</select></label>" +
      '<button type="button" class="btn perf-filter-search" data-prefix="' + prefix + '">搜索</button>' +
      "</div>"
    );
  }

  function readFilters(root, prefix) {
    var out = {};
    root.querySelectorAll('[data-prefix="' + prefix + '"][data-key]').forEach(function (el) {
      out[el.getAttribute("data-key")] = el.value || "";
    });
    return out;
  }

  function applyFilters(rows, f) {
    return rows.filter(function (r) {
      if (f.season && String(r.season) !== f.season) return false;
      if (f.status && r.approveStatus !== f.status) return false;
      if (f.leader && r.leaderAchievementEvaluation !== f.leader) return false;
      if (f.final && r.bpAchievementEvaluation !== f.final) return false;
      return true;
    });
  }

  function leaderCell(row, hideLeader) {
    if (hideLeader && row.employeeId === Mock.CURRENT_EMPLOYEE_ID) return "**";
    var v = row.leaderAchievementEvaluation;
    if (v === "INVISIBLE") return "—";
    return Mock.gradeLabel(v);
  }

  function tableHtml(rows, opts) {
    opts = opts || {};
    var hideLeader = !!opts.hideLeaderForSelf;
    var from = opts.from || "me";
    if (!rows.length) {
      return '<p class="lead perf-empty">没有符合条件的绩效记录。</p>';
    }
    var head =
      "<tr><th>部门</th><th>职位</th><th>姓名</th><th>职级</th><th>季度</th><th>提报时间</th><th>提报来源</th>" +
      "<th>自评等级</th><th>历史等级</th><th>Leader 审核等级</th><th>状态</th><th>最终等级</th><th>操作</th></tr>";
    var body = rows.map(function (r) {
      var detailPath = from.indexOf("admin") >= 0 ? "../portal/detail-quarterly-perf.html" : "detail-quarterly-perf.html";
      var href = detailPath + "?id=" + encodeURIComponent(String(r.id)) + "&from=" + encodeURIComponent(from);
      return (
        "<tr>" +
        "<td>" + escapeText(r.departmentName) + "</td>" +
        "<td>" + escapeText(r.title) + "</td>" +
        "<td>" + escapeText(r.name) + "</td>" +
        "<td>" + escapeText(r.titleLevel) + "</td>" +
        "<td>" + escapeText(r.showSeason) + "</td>" +
        "<td>" + escapeText(r.submitTime) + "</td>" +
        "<td>" + escapeText(Mock.sourceLabel(r.submitSource)) + "</td>" +
        "<td>" + escapeText(Mock.gradeLabel(r.selfAchievementEvaluation)) + "</td>" +
        "<td>" + escapeText(r.lastAchievementEvaluations || "—") + "</td>" +
        "<td>" + escapeText(leaderCell(r, hideLeader)) + "</td>" +
        "<td>" + escapeText(Mock.statusLabel(r.approveStatus)) + "</td>" +
        "<td>" + escapeText(Mock.gradeLabel(r.bpAchievementEvaluation)) + "</td>" +
        '<td><a href="' + href + '">查看</a></td>' +
        "</tr>"
      );
    }).join("");
    return '<div class="perf-table-wrap"><table class="s-table perf-table">' + head + body + "</table></div>" +
      '<p class="lead perf-pager">共 <b>' + rows.length + "</b> 条 · Demo 前端分页（15 条/页）</p>";
  }

  function gradeToneClass(v) {
    var g = Mock.gradeLabel(v);
    if (g === "S") return "perf-q-chip--s";
    if (g === "A+") return "perf-q-chip--ap";
    if (g === "A") return "perf-q-chip--a";
    if (g === "B+") return "perf-q-chip--bp";
    if (g === "B") return "perf-q-chip--b";
    return "perf-q-chip--na";
  }

  function meChipHtml(r, opts) {
    opts = opts || {};
    var grade = Mock.gradeLabel(r.bpAchievementEvaluation);
    var href = "detail-quarterly-perf.html?id=" + encodeURIComponent(String(r.id)) + "&from=me";
    var latest = opts.latest ? " perf-q-chip--latest" : "";
    return (
      '<a class="perf-q-chip ' + gradeToneClass(r.bpAchievementEvaluation) + latest + '" href="' + href + '" title="' +
      escapeText(r.showSeason) + " · " + escapeText(grade) + '">' +
      '<span class="perf-q-chip-season">' + escapeText(r.showSeason) + "</span>" +
      '<span class="perf-q-chip-grade">' + escapeText(grade) + "</span></a>"
    );
  }

  function simpleMeListHtml(rows) {
    var sorted = rows.slice().sort(function (a, b) { return (b.season || 0) - (a.season || 0); });
    if (!sorted.length) {
      return '<p class="lead perf-empty">暂无绩效结果记录。</p>';
    }
    var compact = 10;
    var head = sorted.slice(0, compact);
    var tail = sorted.slice(compact);
    var latest = head[0];
    var latestGrade = Mock.gradeLabel(latest.bpAchievementEvaluation);
    return (
      '<div class="perf-q-summary">' +
      '<span class="perf-q-summary-label">最近</span>' +
      '<b class="perf-q-summary-grade ' + gradeToneClass(latest.bpAchievementEvaluation) + '">' + escapeText(latestGrade) + "</b>" +
      '<span class="perf-q-summary-sep">·</span>' +
      '<span class="perf-q-summary-season">' + escapeText(latest.showSeason) + "</span>" +
      "</div>" +
      '<div class="perf-q-grid" role="list">' +
      head.map(function (r, i) { return meChipHtml(r, { latest: i === 0 }); }).join("") +
      "</div>" +
      (tail.length
        ? '<div class="perf-q-grid perf-q-grid--tail" id="perf-q-tail" hidden role="list">' +
          tail.map(function (r) { return meChipHtml(r); }).join("") +
          "</div>" +
          '<button type="button" class="perf-q-more chip" data-perf-q-more aria-expanded="false">更早 ' + tail.length + " 期</button>"
        : "") +
      '<p class="perf-q-foot">周期与最终等级 · Demo mock · 明细见后台「季度绩效管理」</p>'
    );
  }

  function mountMeBlock(container) {
    if (!container) return;
    container.innerHTML =
      '<div class="card perf-me-card" id="perf-results">' +
      '<div class="perf-me-head perf-me-head--compact">' +
      "<h2>绩效结果</h2>" +
      '<span class="perf-me-meta" data-qp-meta></span></div>' +
      '<div class="perf-table-slot" data-qp-slot="mine"></div>' +
      "</div>";

    var rows = Mock.mineRows().filter(function (r) { return r.approveStatus === "FINISHED"; });
    container.querySelector('[data-qp-slot="mine"]').innerHTML = simpleMeListHtml(rows);
    var meta = container.querySelector("[data-qp-meta]");
    if (meta && rows.length) meta.textContent = "共 " + rows.length + " 期";

    container.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-perf-q-more]");
      if (!btn) return;
      var tail = container.querySelector("#perf-q-tail");
      if (!tail) return;
      var open = tail.hidden;
      tail.hidden = !open;
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "收起" : "更早 " + tail.querySelectorAll(".perf-q-chip").length + " 期";
    });
  }

  function mountAdmin(main) {
    if (!main) return;
    var kpiTab = 1;
    main.innerHTML =
      '<p class="route">产品归属认知平台后台 · 数据真源 digitize <b>GET /v1/achievement/evaluation/list</b>（Demo mock）</p>' +
      '<h1>季度绩效管理</h1>' +
      '<p class="lead">原 ERP 菜单 <b>/growth/performance</b> 能力迁移至认知平台运营后台；本页为静态可视化。</p>' +
      '<div class="perf-admin-tabs">' +
      '<button type="button" class="perf-tab on" data-admin-tab="1">绩效</button>' +
      '<button type="button" class="perf-tab" data-admin-tab="2">不参与绩效人员</button>' +
      "</div>" +
      '<div data-admin-panel="1">' +
      filterHtml("admin") +
      '<div class="perf-admin-actions">' +
      '<button type="button" class="chip" disabled title="Demo">导出</button>' +
      '<button type="button" class="chip" disabled title="Demo">设置</button>' +
      '<button type="button" class="chip perf-demo-toast">绩效提报</button>' +
      "</div>" +
      '<div class="perf-table-slot" data-admin-slot="1"></div></div>' +
      '<div data-admin-panel="2" hidden><div class="perf-table-wrap"><table class="s-table perf-table">' +
      "<tr><th>部门</th><th>职位</th><th>姓名</th><th>手机号</th><th>季度</th></tr>" +
      Mock.notInList.map(function (r) {
        return "<tr><td>" + escapeText(r.department) + "</td><td>" + escapeText(r.title) + "</td><td>" + escapeText(r.name) + "</td><td>" + escapeText(r.mobile) + "</td><td>" + escapeText(r.showSeason) + "</td></tr>";
      }).join("") +
      "</table></div></div>";

    function renderAdminList() {
      var f = readFilters(main, "admin");
      var rows = applyFilters(Mock.getList(), f);
      main.querySelector('[data-admin-slot="1"]').innerHTML = tableHtml(rows, { from: "admin" });
    }

    main.addEventListener("click", function (e) {
      if (e.target.closest(".perf-demo-toast")) {
        window.alert("Demo：提报入口仍指向 ERP /growth/performance/report，正式切流后挂认知平台。");
        return;
      }
      var tab = e.target.closest("[data-admin-tab]");
      if (tab) {
        kpiTab = Number(tab.getAttribute("data-admin-tab"));
        main.querySelectorAll("[data-admin-tab]").forEach(function (b) {
          b.classList.toggle("on", b === tab);
        });
        main.querySelector('[data-admin-panel="1"]').hidden = kpiTab !== 1;
        main.querySelector('[data-admin-panel="2"]').hidden = kpiTab !== 2;
        return;
      }
      if (e.target.closest('.perf-filter-search[data-prefix="admin"]')) renderAdminList();
    });

    renderAdminList();
  }

  function mountDetail(el) {
    if (!el) return;
    var params = new URLSearchParams(location.search);
    var id = params.get("id");
    var from = params.get("from") || "me";
    var row = Mock.getById(id);
    if (!row) {
      el.innerHTML = '<p class="lead">未找到该绩效记录。</p><a href="me.html#perf-results">返回个人中心</a>';
      return;
    }
    var backHref = from.indexOf("admin") >= 0 ? "../admin/performance-manage.html" : "me.html#perf-results";
    var hideLeader = row.workRole === "GENERAL" && row.employeeId === Mock.CURRENT_EMPLOYEE_ID;
    var leaderDisp = hideLeader ? "**" : Mock.gradeLabel(row.leaderAchievementEvaluation);
    var finalDisp = Mock.gradeLabel(row.bpAchievementEvaluation);

    el.innerHTML =
      '<p class="lead"><a href="' + backHref + '">← 返回</a></p>' +
      '<div class="card perf-detail-head">' +
      "<h1>" + escapeText(row.departmentName) + "部门 " + escapeText(row.desc) + " 绩效考核（只读）</h1>" +
      '<p class="lead">受评人：' + escapeText(row.name) + " · 部门：" + escapeText(row.departmentName) + " · 职位：" + escapeText(row.title) + "</p>" +
      '<p>自行提报绩效等级：<b>' + escapeText(Mock.gradeLabel(row.selfAchievementEvaluation)) + "</b></p>" +
      "<p>Leader 填写绩效等级：<b>" + escapeText(leaderDisp) + "</b></p>" +
      "<p>最终绩效等级：<b>" + escapeText(finalDisp) + "</b></p>" +
      '<p class="lead perf-readonly-tag">只读详情 · 不可编辑或审批</p></div>' +
      "<h2>项目信息</h2>" +
      '<div class="card perf-detail-section"><table class="s-table perf-table"><tr><th>项目名称</th><th>编号</th><th>定档</th><th>定档时间</th><th>状态</th><th>主要工作</th><th>占比</th></tr>' +
      (row.projects || []).map(function (p) {
        return "<tr><td>" + escapeText(p.projectName) + "</td><td>" + escapeText(p.projectCode) + "</td><td>" + escapeText(p.projectLevel) +
          "</td><td>" + escapeText(p.schedulingTime) + "</td><td>" + escapeText(p.projectRuntimeStatus) + "</td><td>" + escapeText(p.workContent) + "</td><td>" + escapeText(String(p.weightRate)) + "%</td></tr>";
      }).join("") +
      "</table></div>" +
      "<h2>BDA 案例</h2>" +
      '<div class="card perf-detail-section">' +
      ((row.bda && row.bda.length)
        ? '<table class="s-table perf-table"><tr><th>提交人</th><th>主角</th><th>时间</th><th>BDA</th><th>背景</th><th>行为</th><th>结果</th><th>状态</th></tr>' +
          row.bda.map(function (b) {
            return "<tr><td>" + escapeText(b.submitEmployeeName) + "</td><td>" + escapeText(b.employeeName) + "</td><td>" + escapeText(b.submitTime) +
              "</td><td>" + escapeText(b.employeeValue) + "</td><td>" + escapeText(b.challenge) + "</td><td>" + escapeText(b.behavior) + "</td><td>" + escapeText(b.result) + "</td><td>" + escapeText(b.approveStatus) + "</td></tr>";
          }).join("") + "</table>"
        : "<p class=\"lead\">本周期无关联 BDA 案例。</p>") +
      "</div>" +
      "<h2>学习培训</h2>" +
      '<div class="card perf-detail-section"><table class="s-table perf-table"><tr><th>课程</th><th>讲师</th><th>状态</th><th>分数</th></tr>' +
      (row.study || []).map(function (s) {
        return "<tr><td>" + escapeText(s.courseName) + "</td><td>" + escapeText(s.mentorName) + "</td><td>" + escapeText(s.completeStatus) + "</td><td>" + escapeText(String(s.score)) + "</td></tr>";
      }).join("") +
      "</table></div>";
  }

  global.QuarterlyPerf = {
    mountMeBlock: mountMeBlock,
    mountAdmin: mountAdmin,
    mountDetail: mountDetail,
  };
})(typeof window !== "undefined" ? window : this);
