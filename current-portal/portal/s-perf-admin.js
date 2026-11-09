(function (global) {
  var ROSTER_KEY = "cognition-s-perf-roster-v1";
  var FIELDS = ["submitOpen", "submitClose", "midOpen", "midClose", "finalOpen", "finalClose"];

  function escapeText(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;");
  }
  function escapeAttr(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  }
  function line(text, mid, fin, fbMid, fbFin) {
    return {
      text: text || "",
      resultMid: mid || "",
      resultFinal: fin || "",
      feedbackMid: fbMid || "",
      feedbackFinal: fbFin || "",
    };
  }
  function seedRoster() {
    return {
      linxiao: {
        id: "linxiao", name: "林晓", dept: "亚马逊运营", role: "运营专员", lv: "LV4.1", team: true,
        periods: {
          "2026|h2": {
            applied: true, submittedAt: "2026-07-18T02:30:00.000Z",
            bizResults: [
              line("美国站 Q4 广告花费占比控制在 12% 以内", "10 月花费占比 11.4%", "", "", ""),
              line("主力 ASIN 自然单占比提升到 40%", "自然单占比 36%，还在爬", "", "", ""),
              line("库存周转天数降到 45 天", "当前 52 天，已砍掉两款滞销", "", "", ""),
            ],
            challenges: [
              line("大促期间不牺牲自然排名换广告", "排名稳住了，广告结构还在调", "", "", ""),
              line("两个滞销 SKU 在 10 月清完", "清完 1 个，另一个还剩 3 周库存", "", "", ""),
              line("周报改成按链接而不是按店铺", "", "", "", ""),
            ],
          },
        },
      },
      chenyuan: {
        id: "chenyuan", name: "陈远", dept: "供应链", role: "计划专员", lv: "LV3.2", team: true,
        periods: {
          "2026|h2": {
            applied: true, submittedAt: "2026-07-20T06:00:00.000Z",
            bizResults: [
              line("缺货 SKU 从 18 个降到 6 个", "", "", "", ""),
              line("海运占比提到 70%", "", "", "", ""),
              line("周计划准确率达到 85%", "", "", "", ""),
            ],
            challenges: [
              line("大促备货不提前压仓", "", "", "", ""),
              line("供应商交期波动控制在 5 天内", "", "", "", ""),
              line("新品首单和返单分开评审", "", "", "", ""),
            ],
          },
        },
      },
      zhouning: {
        id: "zhouning", name: "周宁", dept: "品牌", role: "设计师", lv: "LV3.2", team: true,
        periods: {},
      },
      zhaoqi: {
        id: "zhaoqi", name: "赵启", dept: "广告", role: "投放专员", lv: "LV4.2", team: true,
        periods: {
          "2026|h2": {
            applied: true, submittedAt: "2026-07-16T01:10:00.000Z",
            bizResults: [
              line("品牌广告 ACOS 降到 18%", "10 月 ACOS 19.6%", "12 月 ACOS 17.8%", "中期先守排名，不要为了 ACOS 砍核心词", ""),
              line("复购人群广告带来的销售额占 25%", "复购人群占比 21%", "", "", ""),
              line("无效搜索词每周清理一次", "已连续 6 周清理", "", "保持，并把高花费低转化词单独列出来", ""),
            ],
            challenges: [
              line("大促当天预算不临时加倍", "大促当天按预案执行", "", "", ""),
              line("新品冷启动 14 天内不看 ACOS", "", "", "", ""),
              line("投放周报只保留三个动作", "已改成三动作", "", "", ""),
            ],
          },
          "2026|h1": {
            applied: true, submittedAt: "2026-01-12T02:00:00.000Z",
            bizResults: [
              line("上半年品牌词花费占比降到 30%", "3 月占比 33%", "6 月占比 29%", "方向对", "达成"),
              line("否定词库补齐竞品品牌词", "已补 40 个", "已补 70 个", "继续补", "够用"),
              line("自动广告每周出一次搜索词", "按周执行", "按周执行", "", "形成习惯"),
            ],
            challenges: [
              line("不把自动广告当放量工具", "已限制预算", "预算上限守住了", "", "守住了"),
              line("核心词排名周波动不超过 5 名", "波动 4 名", "波动 3 名", "", "稳定"),
              line("投放和运营共用一张链接表", "已共用", "已共用", "", "继续用"),
            ],
          },
        },
      },
      hemin: {
        id: "hemin", name: "何敏", dept: "产品", role: "产品经理", lv: "LV5.1", team: false,
        periods: {
          "2025|h2": {
            applied: true, submittedAt: "2025-07-11T03:20:00.000Z",
            bizResults: [
              line("详情页改版后转化率提升 0.4 个点", "中期转化 +0.2", "最终转化 +0.5", "样本够了再扩店铺", "可以沉淀成模板"),
              line("差评主题每月归类一次", "已归类 2 次", "已归类 6 次", "归类要对应到改版项", "闭环完整"),
              line("新品上架清单从 20 项收到 12 项", "收到 15 项", "收到 12 项", "", "达成"),
            ],
            challenges: [
              line("改版不同时改主图和 A+", "主图先上", "A+ 第二批上", "分开看数据", "数据干净"),
              line("差评不靠补发掩盖", "没有补发换评", "没有补发换评", "", "守住了"),
              line("清单每项有负责人", "已标负责人", "已标负责人", "", "可复用"),
            ],
          },
        },
      },
    };
  }

  function loadRoster() {
    try {
      var raw = localStorage.getItem(ROSTER_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    var data = seedRoster();
    saveRoster(data);
    return data;
  }
  function saveRoster(data) {
    localStorage.setItem(ROSTER_KEY, JSON.stringify(data));
  }

  function texts(row, key) {
    if (!row) return [];
    if (row[key] && row[key].length) return row[key];
    if (key === "bizResults") {
      return (row.okr || []).map(function (item) {
        return line(item.content, item.resultMid, item.resultFinal, item.feedbackMid, item.feedbackFinal);
      });
    }
    return (row.projects || []).map(function (item) {
      return line(item.goal, item.resultMid, item.resultFinal, item.feedbackMid, item.feedbackFinal);
    });
  }
  function hasField(row, field) {
    return texts(row, "bizResults").concat(texts(row, "challenges")).some(function (item) {
      return item && String(item[field] || "").trim();
    });
  }
  function statusOf(row) {
    if (!row || !row.applied) return { key: "none", text: "未提报" };
    if (!row.submittedAt) return { key: "draft", text: "填写中" };
    return { key: "submitted", text: "已提报" };
  }
  function liveSelf(period) {
    var data = global.SPerf.loadRows();
    var row = data[period];
    var info = (row && row.info) || {};
    return {
      id: "self",
      name: info.name || "吴冰娜",
      dept: info.dept || "（DP）数字平台",
      role: info.role || "软件产品经理",
      lv: info.lv || "LV5.1",
      team: false,
      source: "self",
      row: row && row.applied ? row : null,
    };
  }
  function people(period, teamOnly) {
    var roster = loadRoster();
    var list = Object.keys(roster).map(function (id) {
      var person = roster[id];
      var row = person.periods && person.periods[period];
      return {
        id: person.id,
        name: person.name,
        dept: person.dept,
        role: person.role,
        lv: person.lv || "",
        team: !!person.team,
        source: "roster",
        row: row && row.applied ? row : null,
      };
    });
    if (!teamOnly) list.unshift(liveSelf(period));
    if (teamOnly) list = list.filter(function (person) { return person.team; });
    return list;
  }
  function show(value) {
    var text = String(value || "").trim();
    return text ? escapeText(text) : '<span class="s-admin-empty">未填写</span>';
  }
  function readBlock(title, items) {
    var body = (items || []).filter(function (item) { return item && String(item.text || "").trim(); }).map(function (item, i) {
      return '<article class="s-admin-item"><h3>' + (i + 1) + ". " + escapeText(item.text) + "</h3>" +
        '<div class="s-admin-kv">' +
        "<p><b>中期回顾</b>" + show(item.resultMid) + "</p>" +
        "<p><b>中期反馈</b>" + show(item.feedbackMid) + "</p>" +
        "<p><b>最终结果</b>" + show(item.resultFinal) + "</p>" +
        "<p><b>最终反馈</b>" + show(item.feedbackFinal) + "</p>" +
        "</div></article>";
    }).join("");
    return '<h2>' + escapeText(title) + "</h2>" + (body || '<p class="lead">没有内容。</p>');
  }
  function leaderBlock(person, period, title, listName, items) {
    var phase = global.SPerf.windows.phase(period);
    var body = (items || []).map(function (item, i) {
      if (!item || !String(item.text || "").trim()) return "";
      var midOff = phase.mid === "open" ? "" : " disabled";
      var finOff = phase.final === "open" ? "" : " disabled";
      return '<article class="s-admin-item"><h3>' + (i + 1) + ". " + escapeText(item.text) + "</h3>" +
        '<div class="s-admin-kv">' +
        "<p><b>中期回顾</b>" + show(item.resultMid) + "</p>" +
        '<label>中期反馈<textarea data-person="' + escapeAttr(person.id) + '" data-list="' + listName + '" data-index="' + i + '" data-fb="feedbackMid"' + midOff + ">" + escapeText(item.feedbackMid) + "</textarea></label>" +
        "<p><b>最终结果</b>" + show(item.resultFinal) + "</p>" +
        '<label>最终反馈<textarea data-person="' + escapeAttr(person.id) + '" data-list="' + listName + '" data-index="' + i + '" data-fb="feedbackFinal"' + finOff + ">" + escapeText(item.feedbackFinal) + "</textarea></label>" +
        "</div></article>";
    }).join("");
    return '<h2>' + escapeText(title) + "</h2>" + (body || '<p class="lead">没有内容。</p>');
  }
  function detailHead(person, period) {
    var row = person.row;
    var when = row && row.submittedAt ? global.SPerf.formatSubmittedAt(row.submittedAt) : "未提交";
    return '<div class="card"><h2>' + escapeText(person.name) + " · " + escapeText(global.SPerf.labelOf(period)) + "</h2>" +
      '<p class="lead">' + escapeText(person.dept) + " · " + escapeText(person.role) +
      (person.lv ? " · " + escapeText(person.lv) : "") + " · " + statusOf(row).text + " · " + escapeText(when) + "</p>";
  }
  function validateWindow(win) {
    function ts(value) {
      if (!value) return null;
      var d = new Date(value);
      return isNaN(d.getTime()) ? null : d.getTime();
    }
    var times = FIELDS.map(function (field) { return ts(win[field]); });
    if (times.some(function (t) { return t == null; })) return "六个时间都要填写。";
    if (!(times[0] < times[1] && times[1] <= times[2] && times[2] < times[3] && times[3] <= times[4] && times[4] < times[5])) {
      return "时间顺序应为：开始提报 < 截止提报 ≤ 开放中期 < 截止中期 ≤ 开放最终 < 截止最终。";
    }
    return "";
  }
  function pillWord(name, state) {
    if (name === "最终结果" && state === "open") return "已开放";
    if (state === "open") return "进行中";
    if (state === "before" || state === "unset") return state === "unset" ? "未设置" : "未开始";
    return "已截止";
  }

  function queryParam(name) {
    var match = location.search.match(new RegExp("(?:\\?|&)" + name + "=([^&]+)"));
    if (!match) return "";
    try { return decodeURIComponent(match[1]); } catch (e) { return match[1]; }
  }

  function mountAdmin(root) {
    if (!root || !global.SPerf) return;
    var periods = global.SPerf.windows.periods();
    var fromUrl = queryParam("period");
    var state = {
      period: periods.indexOf(fromUrl) >= 0 ? fromUrl : "2026|h2",
      dept: "",
      status: "all",
      q: "",
      note: "",
      error: "",
    };
    function render() {
      var phase = global.SPerf.windows.phase(state.period);
      var win = global.SPerf.windows.get(state.period);
      var list = people(state.period, false).filter(function (person) {
        if (state.dept && person.dept !== state.dept) return false;
        var q = state.q.trim();
        if (q && person.name.indexOf(q) < 0) return false;
        var key = statusOf(person.row).key;
        if (state.status === "mid") return hasField(person.row, "resultMid");
        if (state.status === "final") return hasField(person.row, "resultFinal");
        if (state.status === "all") return true;
        return key === state.status;
      });
      var depts = [];
      people(state.period, false).forEach(function (person) {
        if (depts.indexOf(person.dept) < 0) depts.push(person.dept);
      });
      var submitted = list.filter(function (person) { return statusOf(person.row).key === "submitted"; }).length;
      var periods = global.SPerf.windows.periods().map(function (key) {
        return '<button type="button" class="chip' + (key === state.period ? " on" : "") + '" data-period="' + escapeAttr(key) + '">' +
          escapeText(global.SPerf.labelOf(key)) + "</button>";
      }).join("");
      var rows = list.map(function (person) {
        var row = person.row;
        return "<tr><td>" + escapeText(person.name) + "</td><td>" + escapeText(person.dept) + "</td><td>" + escapeText(person.role) +
          "</td><td>" + statusOf(row).text + "</td><td>" + escapeText(row && row.submittedAt ? global.SPerf.formatSubmittedAt(row.submittedAt) : "—") +
          "</td><td>" + (hasField(row, "resultMid") ? "已填" : "未填") +
          "</td><td>" + (hasField(row, "resultFinal") ? "已填" : "未填") +
          '</td><td><a class="chip" href="s-perf-detail.html?period=' + encodeURIComponent(state.period) +
          "&id=" + encodeURIComponent(person.id) + '">查看</a></td></tr>';
      }).join("");
      function field(name, label) {
        return "<label>" + label + '<input type="datetime-local" name="' + name + '" value="' + escapeAttr(win[name] || "") + '" required></label>';
      }
      root.innerHTML =
        '<p class="route">HRBP · 绩效 S</p><h1>绩效 S 管理</h1>' +
        '<p class="lead">查看全员提报和详情，并控制本周期的提报、中期回顾、最终结果窗口。保存后员工端和主管接收页按新时间开关。</p>' +
        '<div class="s-win-pills">' + periods + "</div>" +
        '<form class="card" id="s-window-form"><h2>' + escapeText(global.SPerf.labelOf(state.period)) + " 窗口</h2>" +
        '<div class="s-win-pills">' +
        '<span class="s-win-pill ' + (phase.submit === "open" ? "is-open" : (phase.submit === "before" ? "is-wait" : "is-shut")) + '">提报 · ' + pillWord("提报", phase.submit) + "</span>" +
        '<span class="s-win-pill ' + (phase.mid === "open" ? "is-open" : (phase.mid === "before" ? "is-wait" : "is-shut")) + '">中期回顾 · ' + pillWord("中期回顾", phase.mid) + "</span>" +
        '<span class="s-win-pill ' + (phase.final === "open" ? "is-open" : (phase.final === "before" ? "is-wait" : "is-shut")) + '">最终结果 · ' + pillWord("最终结果", phase.final) + "</span>" +
        "</div>" +
        '<div class="s-admin-windows">' +
        field("submitOpen", "开始提报") + field("submitClose", "截止提报") +
        field("midOpen", "开放中期回顾") + field("midClose", "截止中期回顾") +
        field("finalOpen", "开放最终结果") + field("finalClose", "截止最终结果") +
        "</div>" +
        '<div class="s-admin-toolbar"><button type="submit" class="btn">保存窗口</button>' +
        (state.note ? '<span class="s-admin-saved">' + escapeText(state.note) + "</span>" : "") +
        (state.error ? '<span class="s-admin-error">' + escapeText(state.error) + "</span>" : "") +
        "</div></form>" +
        '<div class="s-admin-toolbar">' +
        '<select data-dept><option value="">全部部门</option>' + depts.map(function (dept) {
          return '<option' + (dept === state.dept ? " selected" : "") + ">" + escapeText(dept) + "</option>";
        }).join("") + "</select>" +
        '<select data-status>' +
        '<option value="all"' + (state.status === "all" ? " selected" : "") + ">全部状态</option>" +
        '<option value="submitted"' + (state.status === "submitted" ? " selected" : "") + ">已提报</option>" +
        '<option value="draft"' + (state.status === "draft" ? " selected" : "") + ">填写中</option>" +
        '<option value="none"' + (state.status === "none" ? " selected" : "") + ">未提报</option>" +
        '<option value="mid"' + (state.status === "mid" ? " selected" : "") + ">中期已更新</option>" +
        '<option value="final"' + (state.status === "final" ? " selected" : "") + ">最终已更新</option>" +
        "</select>" +
        '<input data-q placeholder="搜索姓名" value="' + escapeAttr(state.q) + '">' +
        '<span class="lead">当前列表 ' + list.length + " 人，已提报 " + submitted + " 人</span></div>" +
        '<div class="card"><table><tr><th>姓名</th><th>部门</th><th>职位</th><th>状态</th><th>提报时间</th><th>中期</th><th>最终</th><th></th></tr>' +
        (rows || '<tr><td colspan="8">没有匹配的人员。</td></tr>') +
        "</table></div>";
    }
    root.addEventListener("click", function (e) {
      var periodBtn = e.target.closest("[data-period]");
      if (periodBtn) {
        state.period = periodBtn.getAttribute("data-period");
        state.note = "";
        state.error = "";
        render();
      }
    });
    root.addEventListener("change", function (e) {
      if (e.target.hasAttribute("data-dept")) state.dept = e.target.value;
      if (e.target.hasAttribute("data-status")) state.status = e.target.value;
      if (e.target.hasAttribute("data-dept") || e.target.hasAttribute("data-status")) render();
    });
    root.addEventListener("input", function (e) {
      if (!e.target.hasAttribute("data-q")) return;
      state.q = e.target.value;
      var caret = e.target.selectionStart;
      render();
      var again = root.querySelector("[data-q]");
      if (!again) return;
      again.focus();
      if (caret != null) again.setSelectionRange(caret, caret);
    });
    root.addEventListener("submit", function (e) {
      if (e.target.id !== "s-window-form") return;
      e.preventDefault();
      var win = {};
      FIELDS.forEach(function (field) {
        win[field] = (e.target.elements[field].value || "").slice(0, 16);
      });
      var err = validateWindow(win);
      if (err) {
        state.error = err;
        state.note = "";
        render();
        return;
      }
      var all = global.SPerf.windows.load();
      all[state.period] = win;
      global.SPerf.windows.save(all);
      state.error = "";
      state.note = "已保存。员工端和主管接收页会按这个窗口开关。";
      render();
    });
    render();
  }

  function mountInbox(root) {
    if (!root || !global.SPerf) return;
    var state = { period: "2026|h2", openId: "", note: "" };
    function render() {
      var phase = global.SPerf.windows.phase(state.period);
      var list = people(state.period, true);
      var periods = global.SPerf.windows.periods().map(function (key) {
        return '<button type="button" class="chip' + (key === state.period ? " on" : "") + '" data-period="' + escapeAttr(key) + '">' +
          escapeText(global.SPerf.labelOf(key)) + "</button>";
      }).join("");
      var rows = list.map(function (person) {
        var row = person.row;
        return "<tr><td>" + escapeText(person.name) + "</td><td>" + escapeText(person.dept) + "</td><td>" + escapeText(person.role) +
          "</td><td>" + statusOf(row).text + "</td><td>" + (hasField(row, "resultMid") ? "已填" : "未填") +
          "</td><td>" + (hasField(row, "resultFinal") ? "已填" : "未填") +
          "</td><td>" + (hasField(row, "feedbackMid") ? "已反馈" : "未反馈") +
          "</td><td>" + (hasField(row, "feedbackFinal") ? "已反馈" : "未反馈") +
          '</td><td><button type="button" class="chip" data-open="' + escapeAttr(person.id) + '">' +
          (state.openId === person.id ? "收起" : "查看") + "</button></td></tr>";
      }).join("");
      var opened = list.filter(function (person) { return person.id === state.openId; })[0];
      var detail = "";
      if (opened) {
        if (!opened.row || statusOf(opened.row).key === "none") {
          detail = detailHead(opened, state.period) + "<p>尚未提报，不能填写反馈。</p></div>";
        } else {
          detail = detailHead(opened, state.period) +
            "<p class=\"lead\">中期回顾和最终结果只读。中期反馈" + (phase.mid === "open" ? "当前可写" : "当前锁定") +
            "，最终反馈" + (phase.final === "open" ? "当前可写" : "当前锁定") + "。</p></div>" +
            '<div class="card" id="s-leader-detail">' +
            leaderBlock(opened, state.period, "预期业绩结果", "bizResults", texts(opened.row, "bizResults")) +
            leaderBlock(opened, state.period, "挑战", "challenges", texts(opened.row, "challenges")) +
            (state.note ? '<p class="s-admin-saved">' + escapeText(state.note) + "</p>" : "") +
            "</div>";
        }
      }
      root.innerHTML =
        '<p class="route">主管 · 绩效 S 接收</p><h1>绩效 S 接收</h1>' +
        '<p class="lead">查看团队员工的中期回顾和最终结果，并在对应窗口内填写中期反馈、最终反馈。不修改员工原文。</p>' +
        '<div class="s-win-pills">' + periods + "</div>" +
        global.SPerf.windows.hint(state.period, false) +
        '<div class="card"><table><tr><th>姓名</th><th>部门</th><th>职位</th><th>状态</th><th>中期回顾</th><th>最终结果</th><th>中期反馈</th><th>最终反馈</th><th></th></tr>' +
        (rows || '<tr><td colspan="9">这个周期没有团队成员。</td></tr>') +
        "</table></div>" + detail;
    }
    root.addEventListener("click", function (e) {
      var periodBtn = e.target.closest("[data-period]");
      if (periodBtn) {
        state.period = periodBtn.getAttribute("data-period");
        state.openId = "";
        state.note = "";
        render();
        return;
      }
      var openBtn = e.target.closest("[data-open]");
      if (!openBtn) return;
      var id = openBtn.getAttribute("data-open");
      state.openId = state.openId === id ? "" : id;
      state.note = "";
      render();
    });
    root.addEventListener("input", function (e) {
      var el = e.target;
      var field = el.getAttribute("data-fb");
      if (!field) return;
      var phase = global.SPerf.windows.phase(state.period);
      if (field === "feedbackMid" && phase.mid !== "open") return;
      if (field === "feedbackFinal" && phase.final !== "open") return;
      var roster = loadRoster();
      var person = roster[el.getAttribute("data-person")];
      var row = person && person.periods && person.periods[state.period];
      var list = row && row[el.getAttribute("data-list")];
      var item = list && list[Number(el.getAttribute("data-index"))];
      if (!item) return;
      item[field] = el.value;
      saveRoster(roster);
      state.note = "反馈已保存。";
      var note = root.querySelector("#s-leader-detail .s-admin-saved");
      if (note) note.textContent = state.note;
      else {
        var box = root.querySelector("#s-leader-detail");
        if (box) box.insertAdjacentHTML("beforeend", '<p class="s-admin-saved">' + escapeText(state.note) + "</p>");
      }
    });
    render();
  }

  function mountDetail(root) {
    if (!root || !global.SPerf) return;
    var period = queryParam("period") || "2026|h2";
    var id = queryParam("id");
    var back = "s-perf-manage.html?period=" + encodeURIComponent(period);
    var person = people(period, false).filter(function (item) { return item.id === id; })[0];
    if (!person) {
      root.innerHTML =
        '<p class="lead"><a href="' + escapeAttr(back) + '">← 返回绩效 S 管理</a></p>' +
        '<div class="card"><p>未找到这条提报。</p></div>';
      return;
    }
    var empty = !person.row || statusOf(person.row).key === "none";
    var body = empty
      ? "<p>尚未提报，没有详情。</p></div>"
      : '<p class="lead">只读。主管反馈由主管在绩效接收页填写。</p></div>' +
        '<div class="card">' + readBlock("预期业绩结果", texts(person.row, "bizResults")) +
        readBlock("挑战", texts(person.row, "challenges")) + "</div>";
    root.innerHTML =
      '<p class="route">HRBP · 绩效 S 详情</p>' +
      '<p class="lead"><a href="' + escapeAttr(back) + '">← 返回绩效 S 管理</a></p>' +
      detailHead(person, period) + body;
  }

  function directory() {
    return people("2026|h2", false).map(function (person) {
      return { id: person.id, name: person.name, dept: person.dept, role: person.role, lv: person.lv || "" };
    });
  }

  global.SPerfAdmin = { mountAdmin: mountAdmin, mountInbox: mountInbox, mountDetail: mountDetail, directory: directory };
})(window);
