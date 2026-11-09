(function (global) {
  var KEY = "cognition-s-perf-v3";
  var ENG_KEY = "cognition-s-perf-feed-eng-v1";
  var bdaItems = [
    ["信念", ["用户至上：为用户创造惊喜", "崇尚技术：用技术创造价值", "长期主义：为未来构建能力"]],
    ["决策", ["围绕目标：目标是决策的中心", "逻辑明确：逻辑是最核心能力", "充分调研：调研是决策的基础", "追求挑战：挑战是决策的方向"]],
    ["行动", ["重视沟通：做高效沟通专家", "积极行动：做工作的策划者", "承诺在线：交付超预期结果", "持续审视：从实践提炼认知"]]
  ];
  var statusText = { todo: "未开始", doing: "进行中", done: "已完成" };
  var EDIT_LOG_DEMO_DIM_AT = "2026-10-29T10:01:00+08:00";

  /** 演示数据：案例沉淀→案例沉 维度编辑日志固定为 2026-10-29 10:01 */
  function normalizeDemoEditLogDimAt(row) {
    if (!row || !Array.isArray(row.editLog)) return false;
    var touched = false;
    row.editLog.forEach(function (log) {
      if (log.before !== "案例沉淀" || log.after !== "案例沉") return;
      if (log.field !== "okr.1.dim" && !(log.label && log.label.indexOf("目标维度") >= 0)) return;
      if (log.at === EDIT_LOG_DEMO_DIM_AT) return;
      log.at = EDIT_LOG_DEMO_DIM_AT;
      touched = true;
    });
    return touched;
  }

  function blank() {
    return {
      applied: true,
      info: { name: "吴冰娜", dept: "", role: "", lv: "LV5.1", group: "", lead: "否", isMentor: false },
      okr: [{ dim: "", content: "", weight: "", resultMid: "", resultFinal: "", feedbackMid: "", feedbackFinal: "" }],
      projects: [{ theme: "", goal: "", weight: "", resultMid: "", resultFinal: "", feedbackMid: "", feedbackFinal: "" }],
      bda: { principle: "", action: "", result: "", checked: [] },
      summary: { score: "", challenge: "" },
      growth: { level: "", acts: ["", "", "", ""] },
      peers: { support: "", note: "" },
      modules: [],
      submittedAt: null,
    };
  }

  function formatSubmittedAt(iso) {
    if (!iso) return "";
    try {
      var d = new Date(iso);
      if (isNaN(d.getTime())) return iso;
      return d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日 " +
        String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
    } catch (e) {
      return iso;
    }
  }

  function submitBarHtml(row) {
    var label = row.submittedAt ? "再次提交" : "提交";
    var hint = row.submittedAt
      ? '<span class="s-submit-ok">已提交 ' + escapeText(formatSubmittedAt(row.submittedAt)) + "</span>"
      : "";
    return '<div class="s-submit-actions">' + hint +
      '<button type="button" class="btn" id="s-submit-plan">' + label + "</button></div>";
  }

  function seed() {
    return {
      "2026|h2": {
        applied: true,
        listed: false,
        info: { name: "吴冰娜", dept: "（DP）数字平台", role: "软件产品经理", lv: "LV5.1", group: "软件产品组", lead: "否", isMentor: false },
        okr: [
          {
            dim: "认知供给", content: "下半年把首页四栏和个人中心目标卡对齐线上", weight: "40%",
            resultMid: "中期：首页四栏结构已对齐，目标卡开发中",
            resultFinal: "最终：首页已完成，目标卡已可切换",
            feedbackMid: "中期反馈：节奏正常，注意联调时间",
            feedbackFinal: "最终反馈：进度清晰，继续保持",
          },
          {
            dim: "案例沉淀", content: "CBDA 案例按维度可筛选、可进入详情", weight: "30%",
            resultMid: "中期：筛选接口已评审",
            resultFinal: "",
            feedbackMid: "中期反馈：请锁定上线迭代",
            feedbackFinal: "",
          },
        ],
        projects: [
          {
            theme: "认知平台现网对齐", goal: "提报、首页、个人中心与线上结构一致", weight: "30%",
            resultMid: "中期：提报与个人中心已对齐",
            resultFinal: "最终：提报绩效 S 与模块进度已打通",
            feedbackMid: "中期反馈：提报链路 OK",
            feedbackFinal: "最终反馈：详情页字段仍待对齐",
          },
        ],
        bda: {
          principle: "B1用户至上-为用户创造惊喜",
          action: "从个人中心进入评估后，返回仍回到现网个人中心",
          result: "返回路径已接到现网个人中心",
          checked: ["长期主义：为未来构建能力", "逻辑明确：逻辑是最核心能力", "承诺在线：交付超预期结果"]
        },
        bizResults: [
          { text: "下半年把首页四栏和个人中心目标卡对齐线上", resultMid: "中期：首页四栏结构已对齐，目标卡开发中", resultFinal: "最终：首页已完成，目标卡已可切换", feedbackMid: "中期反馈：节奏正常，注意联调时间", feedbackFinal: "最终反馈：进度清晰，继续保持" },
          { text: "CBDA 案例按维度可筛选、可进入详情", resultMid: "中期：筛选接口已评审", resultFinal: "", feedbackMid: "中期反馈：请锁定上线迭代", feedbackFinal: "" },
          { text: "提报、首页、个人中心与线上结构一致", resultMid: "中期：提报与个人中心已对齐", resultFinal: "最终：提报绩效 S 与模块进度已打通", feedbackMid: "中期反馈：提报链路 OK", feedbackFinal: "最终反馈：详情页字段仍待对齐" },
        ],
        challenges: [
          { text: "考试点绿规则与有效期要在个人中心可配置", resultMid: "", resultFinal: "", feedbackMid: "", feedbackFinal: "" },
          { text: "晋升路径只展示实际停留层级", resultMid: "", resultFinal: "", feedbackMid: "", feedbackFinal: "" },
          { text: "绩效 S 改为三条结果加三条挑战且无权重", resultMid: "", resultFinal: "", feedbackMid: "", feedbackFinal: "" },
        ],
        summary: { score: "80", challenge: "下半年聚焦认知供给与案例沉淀，模块进度与价值点评估同步推进。" },
        growth: { level: "中参与度", acts: ["认知平台走查", "绩效模板对齐", "", ""] },
        peers: { support: "7", note: "示例：2 个支持，7 分" },
        modules: []
      },
      "2025|h2": {
        applied: true,
        listed: true,
        info: { name: "吴冰娜", dept: "（DP）数字平台", role: "软件产品经理", lv: "LV4.1", group: "软件产品组", lead: "否", isMentor: false },
        okr: [
          {
            dim: "认知供给", content: "2025 下半年完成 CBDA 首页改版方案", weight: "50%",
            resultMid: "中期：方案评审通过", resultFinal: "最终：改版已上线",
            feedbackMid: "中期反馈：范围控制良好", feedbackFinal: "最终反馈：达成预期",
          },
          {
            dim: "案例沉淀", content: "沉淀 3 篇 CBDA 示范案例", weight: "50%",
            resultMid: "中期：2 篇已发布", resultFinal: "最终：3 篇全部发布",
            feedbackMid: "中期反馈：继续推进第 3 篇", feedbackFinal: "最终反馈：质量达标",
          },
        ],
        projects: [
          {
            theme: "绩效看板迁移", goal: "完成需求梳理与原型", weight: "100%",
            resultMid: "中期：原型评审", resultFinal: "最终：已进入开发排期",
            feedbackMid: "中期反馈：与业务对齐频次够", feedbackFinal: "最终反馈：归档完整",
          },
        ],
        bda: { principle: "", action: "", result: "", checked: [] },
        bizResults: [
          { text: "2025 下半年完成 CBDA 首页改版方案", resultMid: "中期：方案评审通过", resultFinal: "最终：改版已上线", feedbackMid: "中期反馈：范围控制良好", feedbackFinal: "最终反馈：达成预期" },
          { text: "沉淀 3 篇 CBDA 示范案例", resultMid: "中期：2 篇已发布", resultFinal: "最终：3 篇全部发布", feedbackMid: "中期反馈：继续推进第 3 篇", feedbackFinal: "最终反馈：质量达标" },
          { text: "绩效看板完成需求梳理与原型", resultMid: "中期：原型评审", resultFinal: "最终：已进入开发排期", feedbackMid: "中期反馈：与业务对齐频次够", feedbackFinal: "最终反馈：归档完整" },
        ],
        challenges: [
          { text: "改版范围控制在已评审方案内", resultMid: "", resultFinal: "", feedbackMid: "", feedbackFinal: "" },
          { text: "第 3 篇案例按期发布", resultMid: "", resultFinal: "", feedbackMid: "", feedbackFinal: "" },
          { text: "原型与业务对齐后进入排期", resultMid: "", resultFinal: "", feedbackMid: "", feedbackFinal: "" },
        ],
        summary: { score: "82", challenge: "2025 下半年兼顾供给与案例。" },
        growth: { level: "中参与度", acts: ["", "", "", ""] },
        peers: { support: "7", note: "" },
        modules: [],
        submittedAt: "2026-01-15T10:00:00.000Z",
      },
      "2025|h1": {
        applied: true,
        listed: true,
        info: { name: "吴冰娜", dept: "（DP）数字平台", role: "软件产品经理", lv: "LV4.1", group: "软件产品组", lead: "否", isMentor: false },
        okr: [
          {
            dim: "专业成长", content: "完成 VPSLP 二期方案设计", weight: "100%",
            resultMid: "中期：方案初稿", resultFinal: "最终：方案评审通过",
            feedbackMid: "中期反馈：结构清晰", feedbackFinal: "最终反馈：可进入实施",
          },
        ],
        projects: [],
        bda: { principle: "", action: "", result: "", checked: [] },
        summary: { score: "78", challenge: "上半年以方案为主。" },
        growth: { level: "", acts: ["", "", "", ""] },
        peers: { support: "", note: "" },
        modules: [],
        submittedAt: "2025-07-10T10:00:00.000Z",
      },
    };
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var saved = JSON.parse(raw);
        var changed = false;
        Object.keys(saved).forEach(function (k) {
          var row = saved[k];
          var info = row && row.info;
          if (info && !info.lv) { info.lv = "LV5.1"; changed = true; }
          if (info && (info.lv === "LV2.2" || info.lv === "L5.1")) { info.lv = "LV5.1"; changed = true; }
          if (info && info.isMentor) { info.isMentor = false; changed = true; }
          if (row && row.listed === undefined) { row.listed = !!row.submittedAt; changed = true; }
          if (row && row.submittedAt === undefined) {
            row.submittedAt = null;
            changed = true;
          }
          if (row) {
            (row.okr || []).forEach(function (item) {
              if (ensureGoalReviewFields(item)) changed = true;
            });
            (row.projects || []).forEach(function (item) {
              if (ensureGoalReviewFields(item)) changed = true;
            });
          }
          if (row && row.applied) {
            syncModulesFromPlan(row);
            changed = true;
          }
          if (row && !Array.isArray(row.editLog)) {
            row.editLog = [];
            changed = true;
          }
          if (row && normalizeDemoEditLogDimAt(row)) changed = true;
        });
        var demoHist = seed();
        ["2025|h2", "2025|h1"].forEach(function (k) {
          if (!saved[k] && demoHist[k]) {
            saved[k] = demoHist[k];
            changed = true;
          }
        });
        if (changed) save(saved);
        return saved;
      }
    } catch (e) {}
    var data = seed();
    var row = data["2026|h2"];
    if (row) {
      syncModulesFromPlan(row);
      if (row.modules[0]) row.modules[0].status = "done";
      if (row.modules[1]) row.modules[1].status = "doing";
    }
    save(data);
    return data;
  }

  function save(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  function halfName(half) { return half === "h1" ? "上半年" : "下半年"; }

  function labelOf(key) {
    var parts = key.split("|");
    return parts[0] + " " + halfName(parts[1]);
  }

  var WINDOW_KEY = "cognition-s-perf-windows-v1";

  function defaultWindows() {
    return {
      "2026|h2": {
        submitOpen: "2026-07-01T09:00",
        submitClose: "2026-11-30T18:00",
        midOpen: "2026-10-08T09:00",
        midClose: "2026-11-20T18:00",
        finalOpen: "2026-12-10T09:00",
        finalClose: "2026-12-31T18:00",
      },
      "2026|h1": {
        submitOpen: "2026-01-05T09:00",
        submitClose: "2026-01-31T18:00",
        midOpen: "2026-03-02T09:00",
        midClose: "2026-03-20T18:00",
        finalOpen: "2026-06-01T09:00",
        finalClose: "2026-06-30T18:00",
      },
      "2025|h2": {
        submitOpen: "2025-07-01T09:00",
        submitClose: "2025-07-31T18:00",
        midOpen: "2025-10-08T09:00",
        midClose: "2025-10-20T18:00",
        finalOpen: "2025-12-10T09:00",
        finalClose: "2025-12-31T18:00",
      },
      "2025|h1": {
        submitOpen: "2025-01-06T09:00",
        submitClose: "2025-01-31T18:00",
        midOpen: "2025-03-03T09:00",
        midClose: "2025-03-21T18:00",
        finalOpen: "2025-06-02T09:00",
        finalClose: "2025-06-30T18:00",
      },
    };
  }

  function parseWindowTime(value) {
    if (!value) return null;
    var d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }

  function formatWindowAt(value) {
    var d = parseWindowTime(value);
    if (!d) return "未设置";
    function p(n) { return String(n).padStart(2, "0"); }
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes());
  }

  function loadWindows() {
    var defaults = defaultWindows();
    var fields = ["submitOpen", "submitClose", "midOpen", "midClose", "finalOpen", "finalClose"];
    try {
      var raw = localStorage.getItem(WINDOW_KEY);
      if (raw) {
        var saved = JSON.parse(raw);
        var changed = false;
        Object.keys(defaults).forEach(function (k) {
          if (!saved[k]) {
            saved[k] = defaults[k];
            changed = true;
            return;
          }
          fields.forEach(function (field) {
            if (!saved[k][field] && defaults[k][field]) {
              saved[k][field] = defaults[k][field];
              changed = true;
            }
          });
        });
        if (changed) saveWindows(saved);
        return saved;
      }
    } catch (e) {}
    saveWindows(defaults);
    return defaults;
  }

  function saveWindows(data) {
    localStorage.setItem(WINDOW_KEY, JSON.stringify(data));
  }

  function windowOf(periodKey) {
    var all = loadWindows();
    return all[periodKey] || {
      submitOpen: "",
      submitClose: "",
      midOpen: "",
      midClose: "",
      finalOpen: "",
      finalClose: "",
    };
  }

  function phaseOf(open, close, now) {
    var start = parseWindowTime(open);
    if (!start) return "unset";
    if (now.getTime() < start.getTime()) return "before";
    var end = parseWindowTime(close);
    if (end && now.getTime() > end.getTime()) return "after";
    return "open";
  }

  function windowPhase(periodKey, now) {
    var w = windowOf(periodKey);
    var t = now || new Date();
    return {
      submit: phaseOf(w.submitOpen, w.submitClose, t),
      mid: phaseOf(w.midOpen, w.midClose, t),
      final: phaseOf(w.finalOpen, w.finalClose, t),
    };
  }

  function windowPeriods() {
    return Object.keys(loadWindows()).sort(function (a, b) {
      var pa = a.split("|");
      var pb = b.split("|");
      if (pa[0] !== pb[0]) return Number(pb[0]) - Number(pa[0]);
      if (pa[1] === pb[1]) return 0;
      return pa[1] === "h2" ? -1 : 1;
    });
  }

  function pathAllowedByWindow(path, periodKey) {
    var phase = windowPhase(periodKey);
    if (/\.feedback(Mid|Final)$/.test(path)) return false;
    if (/\.resultMid$/.test(path)) return phase.mid === "open";
    if (/\.resultFinal$/.test(path)) return phase.final === "open";
    if (/^(bizResults|challenges)\.\d+\.text$/.test(path)) return phase.submit === "open";
    return true;
  }

  function reviewLocks(periodKey) {
    var phase = windowPhase(periodKey);
    return {
      text: phase.submit !== "open",
      mid: phase.mid !== "open",
      final: phase.final !== "open",
      feedback: true,
    };
  }

  function windowRangeText(periodKey) {
    var w = windowOf(periodKey);
    var phase = windowPhase(periodKey);
    var head = phase.submit === "before" ? "提报窗口尚未开始。" : (phase.submit === "open" ? "提报窗口进行中。" : "提报窗口已截止。");
    return head + "提报时间 " + formatWindowAt(w.submitOpen) + " 至 " + formatWindowAt(w.submitClose) + "。";
  }

  function windowHintHtml(periodKey, inboxHref) {
    var phase = windowPhase(periodKey);
    var w = windowOf(periodKey);
    function pill(name, state) {
      var cls = state === "open" ? "is-open" : (state === "before" || state === "unset" ? "is-wait" : "is-shut");
      var word = state === "open" ? "进行中" : (state === "before" ? "未开始" : (state === "unset" ? "未设置" : "已截止"));
      if (name === "最终结果" && state === "open") word = "已开放";
      return '<span class="s-win-pill ' + cls + '">' + name + " · " + word + "</span>";
    }
    var inbox = inboxHref
      ? '主管反馈在 <a href="' + escapeAttr(inboxHref) + '">绩效接收</a> 页填写。'
      : "";
    return '<div class="s-win-pills">' +
      pill("提报", phase.submit) + pill("中期回顾", phase.mid) + pill("最终结果", phase.final) +
      "</div>" +
      '<p class="lead s-win-range">提报 ' + formatWindowAt(w.submitOpen) + " 至 " + formatWindowAt(w.submitClose) +
      " · 中期回顾 " + formatWindowAt(w.midOpen) + " 至 " + formatWindowAt(w.midClose) +
      " · 最终结果 " + formatWindowAt(w.finalOpen) + " 至 " + formatWindowAt(w.finalClose) +
      "。" + inbox + "</p>";
  }

  function periodTabLabel(key) {
    var parts = key.split("|");
    var half = parts[1] === "h1" ? "H1" : "H2";
    return parts[0] + "年 " + half;
  }

  function appliedKeys(data) {
    return Object.keys(data).filter(function (k) { return data[k] && data[k].applied; });
  }

  function comparePeriodKeys(a, b) {
    var pa = a.split("|");
    var pb = b.split("|");
    if (pa[0] !== pb[0]) return pb[0].localeCompare(pa[0]);
    if (pa[1] === pb[1]) return 0;
    return pa[1] === "h2" ? -1 : 1;
  }

  function sortPeriodKeys(keys) {
    return keys.slice().sort(comparePeriodKeys);
  }

  function periodSortRank(key) {
    var parts = String(key || "").split("|");
    var year = Number(parts[0]) || 0;
    var half = parts[1] === "h2" ? 2 : 1;
    return year * 10 + half;
  }

  function latestKey(data) {
    var keys = appliedKeys(data);
    return keys.length ? sortPeriodKeys(keys)[0] : "";
  }

  function periodFromSearch() {
    if (typeof location === "undefined") return "";
    var m = location.search.match(/(?:\?|&)period=([^&]+)/);
    if (!m) return "";
    try {
      return decodeURIComponent(m[1]);
    } catch (e) {
      return "";
    }
  }

  function escapeAttr(s) { return String(s || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;"); }
  function escapeText(s) { return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function infoInitial(name) {
    var s = String(name || "").trim();
    return s ? s.charAt(0) : "?";
  }

  function infoLeadLabel(lead) {
    var t = String(lead || "").trim();
    if (t === "是") return "组长 / 主管";
    if (t === "否") return "成员";
    return t || "—";
  }

  function infoProfileCardHtml(row, opts) {
    var info = row.info || {};
    var publicView = opts && opts.publicView;
    var tags = [
      { k: "部门", v: info.dept },
      { k: "岗位", v: info.role },
      { k: "小组", v: info.group },
    ].filter(function (x) { return x.v; });
    var tagHtml = tags.length
      ? tags.map(function (x) {
        return '<span class="s-info-tag" title="' + escapeAttr(x.k) + '">' + escapeText(x.v) + "</span>";
      }).join("")
      : '<span class="s-info-tag s-info-tag-muted">暂无组织信息</span>';
    var lvBadge = publicView
      ? ""
      : '<span class="s-info-lv-badge">' + escapeText(info.lv || "—") + "</span>";
    var metricsBlock = publicView
      ? ""
      : '<div class="s-info-metrics">' +
        '<div class="s-info-metric"><span>职级</span><b>' + escapeText(info.lv || "—") + "</b></div>" +
        '<div class="s-info-metric"><span>组织角色</span><b>' + escapeText(infoLeadLabel(info.lead)) + "</b></div>" +
        "</div>";
    var eyebrow = publicView ? "基本信息 · 全员可见（不含职级 LV）" : "基本信息 · 档案只读";
    return '<div class="card s-info-profile' + (publicView ? " s-info-profile--public" : "") + '">' +
      '<div class="s-info-inner">' +
      '<p class="s-info-eyebrow">' + eyebrow + "</p>" +
      '<div class="s-info-top' + (publicView ? " s-info-top--public" : "") + '">' +
      '<div class="s-info-identity">' +
      '<div class="avatar s-info-avatar" aria-hidden="true">' + escapeText(infoInitial(info.name)) + "</div>" +
      "<div>" +
      '<div class="s-info-name-row">' +
      '<h2 class="s-info-name">' + escapeText(info.name || "—") + "</h2>" +
      lvBadge +
      "</div>" +
      '<div class="s-info-tags">' + tagHtml + "</div>" +
      "</div></div>" +
      metricsBlock +
      "</div>" +
      (opts && opts.hideWeight ? "" : '<p class="s-info-weight-hint">权重占比由个人评估，「业绩/OKR 目标 + 项目目标」合计须为 <b>100%</b>。</p>') +
      "</div></div>";
  }

  function feedAuthorMetaHtml(info) {
    var parts = [];
    if (info.dept) parts.push(info.dept);
    else if (info.group) parts.push(info.group);
    if (info.role) parts.push(info.role);
    return escapeText(parts.length ? parts.join(" · ") : "—");
  }

  function field(label, value, path) {
    return '<label>' + label + '</label><input data-path="' + path + '" value="' + escapeAttr(value) + '">';
  }
  function area(label, value, path) {
    return '<label>' + label + '</label><textarea rows="2" data-path="' + path + '">' + escapeText(value) + "</textarea>";
  }
  function fieldReadonly(label, value) {
    var text = (value || "").trim();
    return '<div class="s-ro-field"><label>' + label + '</label><p class="s-ro-value">' + (text ? escapeText(text) : "—") + "</p></div>";
  }
  function areaReadonly(label, value) {
    var text = (value || "").trim();
    return '<div class="s-ro-field"><label>' + label + '</label><p class="s-ro-value s-ro-value--block">' + (text ? escapeText(text) : "—") + "</p></div>";
  }

  function ensureGoalReviewFields(item) {
    if (!item) return false;
    var changed = false;
    if (item.resultMid === undefined) { item.resultMid = ""; changed = true; }
    if (item.resultFinal === undefined) {
      item.resultFinal = item.result != null ? item.result : "";
      changed = true;
    }
    if (item.feedbackMid === undefined) { item.feedbackMid = ""; changed = true; }
    if (item.feedbackFinal === undefined) {
      item.feedbackFinal = item.feedback != null ? item.feedback : "";
      changed = true;
    }
    return changed;
  }

  function moduleIndexFor(row, listName, index) {
    var sk = (listName === "okr" ? "okr" : "project") + "|" + index;
    for (var j = 0; j < (row.modules || []).length; j++) {
      if (row.modules[j].sourceKey === sk) return j;
    }
    return -1;
  }

  function reviewInputs(listName, index, item, role, kind) {
    var emp = role !== "leader";
    var midKey = kind === "result" ? "resultMid" : "feedbackMid";
    var finalKey = kind === "result" ? "resultFinal" : "feedbackFinal";
    var midLabel = kind === "result" ? "中期回顾" : "中期反馈";
    var finalLabel = kind === "result" ? "最终达成" : "最终反馈";
    var empCanEdit = kind === "result" ? emp : !emp;
    function fieldBlock(field, label) {
      var path = listName + "." + index + "." + field;
      var ro = !empCanEdit;
      return '<div class="s-me-review-field">' +
        '<label class="s-me-ph">' + label + "</label>" +
        '<input data-path="' + path + '" value="' + escapeAttr(item[field] || "") + '"' +
        (ro ? ' readonly class="s-input-readonly"' : "") + ' placeholder="' + label + '">' +
        "</div>";
    }
    return fieldBlock(midKey, midLabel) + fieldBlock(finalKey, finalLabel);
  }

  function reviewFieldsReadonly(item, kind) {
    var midKey = kind === "result" ? "resultMid" : "feedbackMid";
    var finalKey = kind === "result" ? "resultFinal" : "feedbackFinal";
    var midLabel = kind === "result" ? "中期回顾" : "中期反馈";
    var finalLabel = kind === "result" ? "最终达成" : "最终反馈";
    function block(field, label) {
      var text = (item[field] || "").trim();
      return '<div class="s-me-review-field"><label class="s-me-ph">' + label + '</label><p class="s-ro-value">' +
        (text ? escapeText(text) : "—") + "</p></div>";
    }
    return block(midKey, midLabel) + block(finalKey, finalLabel);
  }

  function statusInlineHtml(row, modIndex, role) {
    if (modIndex < 0) return "";
    var mod = row.modules[modIndex];
    var leader = role === "leader";
    var buttons = ["todo", "doing", "done"].map(function (st) {
      var on = mod.status === st ? " on" : "";
      var dis = leader ? " disabled" : "";
      return '<button type="button" class="s-me-mod' + on + '" data-mod="' + modIndex + '" data-status="' + st + '"' + dis + ">" + statusText[st] + "</button>";
    }).join("");
    return '<div class="goal-seg s-me-mod-seg s-me-mod-seg--inline" aria-label="模块进度">' + buttons + "</div>";
  }

  function statusInlineReadonly(row, modIndex) {
    if (modIndex < 0) return "";
    var mod = row.modules[modIndex];
    var st = (mod && mod.status) || "todo";
    return '<span class="tag s-mod-status-tag">' + escapeText(statusText[st] || st) + "</span>";
  }

  function goalCardHtml(listName, index, item, row, role, layout, cardMode) {
    cardMode = cardMode || "readonly";
    var onMe = cardMode === "me";
    var tag = escapeText(item[layout.tagKey] || "—");
    var body = escapeText(item[layout.bodyKey] || "");
    var weight = escapeText(item.weight || "—");
    var modIdx = moduleIndexFor(row, listName, index);
    var toneIdx = (index + (layout.colorOffset || 0)) % 5;
    var tone = "s-me-goal-card--tone" + toneIdx;
    return '<article class="s-me-goal-card ' + tone + '">' +
      '<div class="s-me-goal-head">' +
      '<div class="s-me-goal-topline">' +
      '<span class="s-me-goal-tag">' + escapeText(layout.tagLabel) + " · " + tag + "</span>" +
      '<div class="s-me-goal-meta">' +
      '<span class="s-me-goal-weight">权重 ' + weight + "</span>" +
      (onMe ? statusInlineHtml(row, modIdx, role) : statusInlineReadonly(row, modIdx)) +
      "</div></div>" +
      '<p class="s-me-goal-body">' + body + "</p>" +
      "</div>" +
      '<div class="s-me-goal-review">' +
      '<div class="s-me-review-block"><h4>达成结果</h4><div class="s-me-review-fields">' +
      (onMe ? reviewInputs(listName, index, item, role, "result") : reviewFieldsReadonly(item, "result")) +
      "</div></div>" +
      '<div class="s-me-review-block"><h4>主管 / Leader 反馈</h4><div class="s-me-review-fields">' +
      (onMe ? reviewInputs(listName, index, item, role, "feedback") : reviewFieldsReadonly(item, "feedback")) +
      "</div></div>" +
      "</div></article>";
  }

  function sectionCardsMe(title, listName, layout, rows, row, role, cardMode) {
    var cards = (rows || []).map(function (item, index) {
      return goalCardHtml(listName, index, item, row, role, layout, cardMode);
    }).join("");
    if (!cards) {
      cards = '<p class="lead s-me-empty">暂无目标，请先在 <a href="submit-s.html">提报绩效 S</a> 填写一、二。</p>';
    }
    return '<div class="card s-me-section"><h2>' + title + '</h2><div class="s-me-goal-list">' + cards + "</div></div>";
  }

  function mePerfPeriodNavHtml(periodKeys, activeKey) {
    var btns = periodKeys.map(function (k) {
      return '<button type="button" data-me-period="' + escapeAttr(k) + '"' + (k === activeKey ? ' class="on"' : "") + ">" + escapeText(periodTabLabel(k)) + "</button>";
    }).join("");
    return '<div class="s-me-period-nav">' +
      '<span class="s-me-period-label">提报周期</span>' +
      '<div class="s-me-year-tabs s-me-period-tabs" role="tablist" aria-label="提报周期">' + btns + "</div>" +
      "</div>";
  }

  function asSimpleItem(raw, review) {
    review = review || {};
    if (raw && typeof raw === "object") {
      var text = raw.text || "";
      var same = !!(review.text && review.text === text);
      return {
        text: text,
        resultMid: raw.resultMid || "",
        resultFinal: raw.resultFinal || "",
        feedbackMid: raw.feedbackMid !== undefined ? raw.feedbackMid : (same ? (review.feedbackMid || "") : ""),
        feedbackFinal: raw.feedbackFinal !== undefined ? raw.feedbackFinal : (same ? (review.feedbackFinal || "") : ""),
      };
    }
    var plain = raw == null ? "" : String(raw);
    var matched = !!(review.text && review.text === plain);
    return {
      text: plain,
      resultMid: matched ? (review.resultMid || "") : "",
      resultFinal: matched ? (review.resultFinal || "") : "",
      feedbackMid: matched ? (review.feedbackMid || "") : "",
      feedbackFinal: matched ? (review.feedbackFinal || "") : "",
    };
  }

  function findReview(text, pools) {
    for (var p = 0; p < pools.length; p++) {
      var list = pools[p] || [];
      for (var i = 0; i < list.length; i++) {
        if (list[i].text && list[i].text === text) return list[i];
      }
    }
    return {};
  }

  function padAtLeastThree(list, pools) {
    var src = Array.isArray(list) ? list : [];
    var n = Math.max(3, src.length);
    var out = [];
    for (var i = 0; i < n; i++) {
      var raw = src[i];
      var text = raw && typeof raw === "object" ? (raw.text || "") : (raw == null ? "" : String(raw));
      out.push(asSimpleItem(raw, findReview(text, pools)));
    }
    return out;
  }

  function reviewsFrom(list, textKey) {
    return (list || []).map(function (x) {
      return {
        text: (x && x[textKey]) || "",
        resultMid: (x && x.resultMid) || "",
        resultFinal: (x && x.resultFinal) || "",
        feedbackMid: (x && x.feedbackMid) || "",
        feedbackFinal: (x && x.feedbackFinal) || "",
      };
    });
  }

  function hydrateSimpleS(row) {
    var okrItems = reviewsFrom(row.okr, "content");
    var projectItems = reviewsFrom(row.projects, "goal");
    var pools = [okrItems, projectItems];
    if (!row.bizResults || !row.bizResults.length) row.bizResults = okrItems;
    if (!row.challenges || !row.challenges.length) {
      var ch = projectItems.filter(function (x) { return x.text; });
      if (row.summary && row.summary.challenge) {
        ch.push({ text: row.summary.challenge, resultMid: "", resultFinal: "", feedbackMid: "", feedbackFinal: "" });
      }
      row.challenges = ch;
    }
    row.bizResults = padAtLeastThree(row.bizResults, pools);
    row.challenges = padAtLeastThree(row.challenges, pools);
  }

  function filledSimpleCount(list) {
    return (list || []).filter(function (item) {
      var text = item && typeof item === "object" ? item.text : item;
      return String(text || "").trim();
    }).length;
  }

  function validateSimpleS(row) {
    hydrateSimpleS(row);
    if (filledSimpleCount(row.bizResults) < 3) return "预期业绩结果至少填写 3 条。";
    if (filledSimpleCount(row.challenges) < 3) return "挑战至少填写 3 条。";
    return "";
  }

  function simpleField(key, index, item, sub, label, locked) {
    return '<div class="s-me-review-field"><label class="s-me-ph">' + label + "</label>" +
      '<input data-path="' + key + "." + index + "." + sub + '" value="' + escapeAttr(item[sub] || "") + '" placeholder="' + escapeAttr(label) + '"' +
      (locked ? ' disabled class="s-input-readonly"' : "") + "></div>";
  }

  function simpleLines(title, key, items, placeholder, locks) {
    locks = locks || {};
    var rows = items.map(function (item, i) {
      return '<article class="s-simple-item s-simple-tone' + (i % 5) + '">' +
        '<label class="s-simple-line"><span>' + (i + 1) + "</span>" +
        '<input data-path="' + key + "." + i + '.text" value="' + escapeAttr(item.text || "") + '" placeholder="' + escapeAttr(placeholder) + '"' +
        (locks.text ? ' disabled class="s-input-readonly"' : "") + " /></label>" +
        '<div class="s-simple-pair">' +
        '<div class="s-simple-col">' +
        '<p class="s-simple-role">员工</p>' +
        simpleField(key, i, item, "resultMid", "中期回顾", !!locks.mid) +
        simpleField(key, i, item, "resultFinal", "最终结果", !!locks.final) +
        "</div>" +
        '<div class="s-simple-col s-simple-col-leader">' +
        '<p class="s-simple-role">主管 / Leader 反馈</p>' +
        simpleField(key, i, item, "feedbackMid", "中期反馈", !!locks.feedback) +
        simpleField(key, i, item, "feedbackFinal", "最终反馈", !!locks.feedback) +
        "</div></div></article>";
    }).join("");
    return '<div class="card s-me-section"><h2>' + escapeText(title) + "</h2>" + rows + "</div>";
  }

  function mePerfContentHtml(row, locks) {
    hydrateSimpleS(row);
    return simpleLines("业务结果", "bizResults", row.bizResults, "一条预期业务结果", locks) +
      simpleLines("挑战", "challenges", row.challenges, "一条挑战", locks);
  }

  function submitTextBlock(step, title, hint, key, items, placeholder) {
    var filled = filledSimpleCount(items);
    var rows = (items || []).map(function (item, i) {
      var text = item && typeof item === "object" ? (item.text || "") : (item || "");
      var del = items.length > 3
        ? '<button type="button" class="s-form-del" data-remove="' + key + '" data-index="' + i + '">删除</button>'
        : '<span class="s-form-del-slot"></span>';
      return '<li class="s-form-row"><span>' + (i + 1) + "</span>" +
        '<input data-path="' + key + "." + i + '.text" value="' + escapeAttr(text) + '" placeholder="' + escapeAttr(placeholder) + '" />' +
        del + "</li>";
    }).join("");
    return '<section class="s-form-block">' +
      '<header class="s-form-block-head">' +
      '<span class="s-form-step">' + escapeText(step) + "</span>" +
      "<div><h2>" + escapeText(title) + "</h2><p>" + escapeText(hint) + "</p></div>" +
      '<b class="s-form-count' + (filled >= 3 ? " is-ok" : "") + '">已填 ' + filled + " / 至少 3</b>" +
      "</header>" +
      '<ol class="s-form-rows">' + rows + "</ol>" +
      '<div class="s-form-foot"><button type="button" class="chip" data-add="' + key + '">加一条</button></div>' +
      "</section>";
  }

  function submitPlanBody(row) {
    hydrateSimpleS(row);
    return infoProfileCardHtml(row, { hideWeight: true }) +
      '<div class="s-form-stack">' +
      submitTextBlock("一", "预期业绩结果", "只写文字，不设权重。至少 3 条，可以继续新增。", "bizResults", row.bizResults, "写一条预期业绩结果") +
      submitTextBlock("二", "挑战", "只写文字，不设权重。至少 3 条，可以继续新增。", "challenges", row.challenges, "写一条挑战") +
      "</div>";
  }

  function editPlanHtml(row) {
    return submitPlanBody(row);
  }

  function editBarHtml(backHref) {
    return (
      '<div class="s-submit-actions s-edit-page-actions">' +
      '<a class="chip" href="' + escapeAttr(backHref) + '">取消，返回个人中心</a>' +
      '<button type="button" class="btn" id="s-finish-edit">完成编辑</button>' +
      "</div>"
    );
  }

  function mePerfContentReadonlyHtml(row, role) {
    syncModulesFromPlan(row);
    return sectionCardsMe("一、业绩/OKR目标", "okr", { tagKey: "dim", bodyKey: "content", tagLabel: "维度", colorOffset: 0 }, row.okr, row, role, "readonly") +
      sectionCardsMe("二、项目目标", "projects", { tagKey: "theme", bodyKey: "goal", tagLabel: "项目", colorOffset: 2 }, row.projects, row, role, "readonly");
  }

  function mePerfHelpHtml(role) {
    var text = role === "leader"
      ? "点「编辑」在新页面修改一、二与 BDA 目标。下方随时填写中期/最终反馈；模块进度由员工更新。"
      : "点「编辑」在新页面修改一、二与 BDA 目标。下方随时填写中期回顾 与最终达成；切换「主管」可查看反馈。";
    return '<span class="s-me-help">' +
      '<button type="button" class="s-me-help-btn" aria-label="填写说明" aria-describedby="s-me-help-tip">?</button>' +
      '<span class="s-me-help-tip" id="s-me-help-tip" role="tooltip">' + escapeText(text) + "</span>" +
      "</span>";
  }

  function mePerfBlockHtml(row, key, role, periodKeys) {
    var submitted = row.submittedAt
      ? '<p class="lead s-me-submitted-hint">已于 ' + escapeText(formatSubmittedAt(row.submittedAt)) + " 保存。业务结果和挑战在提报窗口内修改；中期回顾、最终结果按窗口填写。</p>"
      : '<p class="lead s-me-submitted-hint">业务结果和挑战在提报窗口内填写。中期回顾、最终结果按窗口开放。</p>';
    return '<div class="card s-me-perf-intro">' +
      '<div class="s-me-head">' +
      '<h2 class="s-me-title">绩效 S · ' + labelOf(key) + "</h2>" +
      "</div>" +
      mePerfPeriodNavHtml(periodKeys, key) +
      submitted +
      windowHintHtml(key, "s-leader-inbox.html") +
      "</div>" +
      mePerfContentHtml(row, reviewLocks(key));
  }

  function getPath(row, path) {
    if (!row || !path) return "";
    var parts = path.split(".");
    var node = row;
    for (var i = 0; i < parts.length; i++) {
      if (node == null) return "";
      node = node[parts[i]];
    }
    return node == null ? "" : String(node);
  }

  function snapshotRowForEdit(row) {
    var bda = ensureBdaRow(row);
    return JSON.parse(JSON.stringify({
      okr: row.okr || [],
      projects: row.projects || [],
      modules: row.modules || [],
      bda: { principle: bda.principle, action: bda.action, result: bda.result },
    }));
  }

  function goalFieldMeta(listName, index, field, item) {
    item = item || {};
    var fieldLabels = {
      dim: "目标维度",
      content: "目标内容",
      weight: "权重占比",
      theme: "项目主题",
      goal: "项目目标",
    };
    var section = listName === "okr" ? "业绩/OKR" : "项目";
    var tag = listName === "okr" ? (item.dim || "目标 " + (index + 1)) : (item.theme || "项目 " + (index + 1));
    return section + " · " + tag + " · " + (fieldLabels[field] || field);
  }

  function goalRowSummary(listName, item) {
    item = item || {};
    return [item.dim || item.theme, item.content || item.goal, item.weight].filter(Boolean).join(" / ") || "（空）";
  }

  function collectEditLogEntries(periodKey, row, baseline, role, actor) {
    if (!row || !baseline) return [];
    actor = actor || (row.info && row.info.name) || "当前用户";
    var entries = [];
    var now = new Date().toISOString();
    var structByList = {
      okr: ["dim", "content", "weight"],
      projects: ["theme", "goal", "weight"],
    };
    ["okr", "projects"].forEach(function (listName) {
      var beforeList = baseline[listName] || [];
      var afterList = row[listName] || [];
      var maxLen = Math.max(beforeList.length, afterList.length);
      var section = listName === "okr" ? "业绩/OKR" : "项目";
      for (var index = 0; index < maxLen; index++) {
        if (index >= beforeList.length) {
          entries.push({
            at: now,
            periodKey: periodKey,
            role: role,
            actor: actor,
            field: listName + "." + index,
            label: section + " · 新增目标",
            before: "—",
            after: goalRowSummary(listName, afterList[index]),
          });
          continue;
        }
        if (index >= afterList.length) {
          entries.push({
            at: now,
            periodKey: periodKey,
            role: role,
            actor: actor,
            field: listName + "." + index,
            label: section + " · 删除目标",
            before: goalRowSummary(listName, beforeList[index]),
            after: "—",
          });
          continue;
        }
        structByList[listName].forEach(function (field) {
          var path = listName + "." + index + "." + field;
          var before = getPath(baseline, path);
          var after = getPath(row, path);
          if (before === after) return;
          entries.push({
            at: now,
            periodKey: periodKey,
            role: role,
            actor: actor,
            field: path,
            label: goalFieldMeta(listName, index, field, afterList[index]),
            before: before,
            after: after,
          });
        });
      }
    });
    var bdaFields = ["principle", "action", "result"];
    var bdaLabels = { principle: "BDA 原则", action: "BDA 目标行为", result: "BDA 预期达成" };
    bdaFields.forEach(function (field) {
      var before = getPath(baseline, "bda." + field);
      var after = getPath(row, "bda." + field);
      if (before === after) return;
      entries.push({
        at: now,
        periodKey: periodKey,
        role: role,
        actor: actor,
        field: "bda." + field,
        label: "BDA · " + (bdaLabels[field] || field),
        before: before,
        after: after,
      });
    });
    return entries;
  }

  function appendEditLogs(periodKey, row, baseline, role) {
    if (!row) return;
    if (!Array.isArray(row.editLog)) row.editLog = [];
    var entries = collectEditLogEntries(periodKey, row, baseline, role);
    entries.forEach(function (entry) {
      row.editLog.unshift(entry);
    });
    if (row.editLog.length > 80) row.editLog.length = 80;
  }

  function editLogEntryHtml(log, opts) {
    opts = opts || {};
    var when = opts.pending
      ? '<span class="s-edit-log-pending-tag">待保存</span>'
      : '<time datetime="' + escapeAttr(log.at) + '">' + escapeText(formatSubmittedAt(log.at) || log.at) + "</time>";
    var roleLabel = log.role === "leader" ? "主管视角" : "员工视角";
    return (
      '<li class="s-edit-log-item' + (opts.pending ? " s-edit-log-item--pending" : "") + '">' +
      when +
      '<span class="s-edit-log-who">' + escapeText(log.actor || "") + " · " + roleLabel + "</span>" +
      '<p class="s-edit-log-label">' + escapeText(log.label || log.field) + "</p>" +
      '<p class="s-edit-log-diff"><span>原：</span>' + escapeText(log.before || "—") + "</p>" +
      '<p class="s-edit-log-diff s-edit-log-diff--new"><span>新：</span>' + escapeText(log.after || "—") + "</p>" +
      "</li>"
    );
  }

  function editLogEntryListHtml(logs, opts) {
    if (!logs.length) {
      return '<p class="lead s-edit-log-empty">' + (opts && opts.emptyText ? opts.emptyText : "暂无记录。") + "</p>";
    }
    return '<ol class="s-edit-log-list">' + logs.map(function (log) {
      return editLogEntryHtml(log, opts);
    }).join("") + "</ol>";
  }

  function editLogSidebarHtml(row, baseline, periodKey) {
    var pending = collectEditLogEntries(periodKey, row, baseline, "employee");
    var history = ((row && row.editLog) || []).filter(function (log) {
      return !periodKey || log.periodKey === periodKey;
    });
    return (
      '<div class="card s-edit-log-aside-card">' +
      '<h2 class="s-edit-log-aside-title">编辑日志</h2>' +
      '<p class="lead s-edit-log-aside-lead">右侧实时展示本次改动；点「完成编辑」后写入历史记录。</p>' +
      '<section class="s-edit-log-section">' +
      '<h3>本次改动 <span class="s-edit-log-count">' + pending.length + "</span></h3>" +
      editLogEntryListHtml(pending, { pending: true, emptyText: "尚未修改内容。" }) +
      "</section>" +
      '<section class="s-edit-log-section s-edit-log-section--history">' +
      '<h3>历史记录 <span class="s-edit-log-count">' + history.length + "</span></h3>" +
      editLogEntryListHtml(history.slice(0, 15), { emptyText: "暂无历史修改。" }) +
      "</section></div>"
    );
  }

  function editLogPanelHtml(row) {
    var logs = (row && row.editLog) || [];
    if (!logs.length) {
      return '<details class="s-edit-log"><summary>修改记录 <span class="s-edit-log-count">0</span></summary><p class="lead s-edit-log-empty">暂无修改记录。</p></details>';
    }
    return (
      '<details class="s-edit-log">' +
      '<summary>修改记录 <span class="s-edit-log-count">' + logs.length + "</span></summary>" +
      editLogEntryListHtml(logs.slice(0, 12)) +
      "</details>"
    );
  }

  function sectionTable(title, listName, heads, keys, rows, addLabel, opts) {
    opts = opts || {};
    var head = heads.map(function (h) { return "<th>" + h + "</th>"; }).join("") + (opts.deletable ? "<th></th>" : "");
    var body = (rows || []).map(function (item, index) {
      var cells = keys.map(function (k) {
        return '<td><input data-path="' + listName + "." + index + "." + k + '" value="' + escapeAttr(item[k]) + '"></td>';
      }).join("");
      if (opts.deletable) {
        cells += '<td><button type="button" class="chip s-row-del" data-remove="' + listName + '" data-index="' + index + '">删除</button></td>';
      }
      return "<tr>" + cells + "</tr>";
    }).join("");
    return '<div class="card s-me-goal-edit-table"><h2>' + title + '</h2><div class="s-scroll"><table class="s-table"><tr>' + head + "</tr>" + body +
      '</table></div><button type="button" class="chip" data-add="' + listName + '">' + addLabel + "</button></div>";
  }

  function pathEditableOnMe(path, goalEditMode) {
    if (!path) return false;
    if (/\.(resultMid|resultFinal|feedbackMid|feedbackFinal)$/.test(path)) return true;
    if (/^okr\.\d+\.(dim|content|weight)$/.test(path)) return goalEditMode;
    if (/^projects\.\d+\.(theme|goal|weight)$/.test(path)) return goalEditMode;
    if (/^(bizResults|challenges)\.\d+\.(text|resultMid|resultFinal|feedbackMid|feedbackFinal)$/.test(path)) return true;
    return false;
  }

  function ensureBdaRow(row) {
    if (!row.bda) row.bda = { principle: "", action: "", result: "", checked: [] };
    if (!Array.isArray(row.bda.checked)) row.bda.checked = [];
    return row.bda;
  }

  function bdaReportForPeriod(periodKey) {
    if (global.BdaReport && typeof global.BdaReport.forPeriod === "function") {
      return global.BdaReport.forPeriod(periodKey);
    }
    return null;
  }

  function bdaReportHasContent(report) {
    if (!report) return false;
    var g = report.leadershipGoal || {};
    if ((g.principle || "").trim() || (g.action || "").trim() || (g.expectedResult || "").trim()) return true;
    if (report.selfTop3 && report.selfTop3.length) return true;
    if (report.cases && report.cases.length) return true;
    return false;
  }

  function syncBdaSubmission(periodKey, row) {
    if (!global.BdaReport || typeof global.BdaReport.saveLeadershipGoal !== "function") return;
    var bda = ensureBdaRow(row);
    global.BdaReport.saveLeadershipGoal(periodKey, {
      principle: bda.principle,
      action: bda.action,
      expectedResult: bda.result,
    });
  }

  function bdaCaseCardHtml(item) {
    var title = item.dimension ? escapeText(item.dimension) : "BDA 案例";
    var meta = [item.submitTime, item.status].filter(Boolean).map(escapeText).join(" · ");
    var link = item.href
      ? '<p class="lead s-bda-case-link"><a href="' + escapeAttr(item.href) + '">查看案例详情</a></p>'
      : "";
    return (
      '<article class="s-bda-case-card">' +
      '<div class="s-bda-case-head"><b>' + title + "</b>" +
      (meta ? '<span class="s-bda-case-meta">' + meta + "</span>" : "") +
      "</div>" +
      '<dl class="s-bda-readonly s-bda-readonly--case">' +
      "<div><dt>挑战</dt><dd>" + escapeText(item.challenge || "—") + "</dd></div>" +
      "<div><dt>行为</dt><dd>" + escapeText(item.behavior || "—") + "</dd></div>" +
      "<div><dt>结果</dt><dd>" + escapeText(item.result || "—") + "</dd></div>" +
      "</dl>" +
      link +
      "</article>"
    );
  }

  function bdaBlockSubmit(row) {
    var bda = ensureBdaRow(row);
    return '<div class="card s-bda-card"><h2>三、BDA 领导力提升目标</h2>' +
      '<p class="lead s-bda-intro">设定本半年 BDA 目标：原则、目标行为、预期达成结果均为必填。BDA 自评 TOP3 在 BDA 提报流程中完成，不在此勾选。提交后同步目标字段至 BDA 提报结果。</p>' +
      '<div class="s-bda-fields">' +
      field("需提升的 BDA 领导力原则", bda.principle, "bda.principle") +
      area("提升 BDA 的目标行为", bda.action, "bda.action") +
      area("预期达成结果", bda.result, "bda.result") +
      "</div></div>";
  }

  function bdaBlockReadOnly(periodKey) {
    var report = bdaReportForPeriod(periodKey);
    if (!bdaReportHasContent(report)) {
      return (
        '<div class="card s-bda-card s-bda-card--readonly"><h2>三、BDA 提报</h2>' +
        '<p class="lead">本周期（' + escapeText(labelOf(periodKey) || periodKey || "—") + "）暂无 BDA 提报记录。</p>" +
        '<p class="lead"><a href="submit-bda.html">去提报 BDA</a> · <a href="submit-s.html">提报绩效 S 设定领导力目标</a></p></div>'
      );
    }
    var goal = report.leadershipGoal || {};
    var goalBlock =
      (goal.principle || goal.action || goal.expectedResult)
        ? '<div class="s-bda-block"><h3 class="s-bda-subhead">领导力提升目标</h3>' +
          '<dl class="s-bda-readonly">' +
          "<div><dt>需提升的 BDA 领导力原则</dt><dd>" + escapeText(goal.principle || "—") + "</dd></div>" +
          "<div><dt>提升 BDA 的目标行为</dt><dd>" + escapeText(goal.action || "—") + "</dd></div>" +
          "<div><dt>预期达成结果</dt><dd>" + escapeText(goal.expectedResult || "—") + "</dd></div>" +
          "</dl></div>"
        : "";
    var top3 = (report.selfTop3 || [])
      .map(function (name) { return '<span class="chip">' + escapeText(name) + "</span>"; })
      .join("");
    var top3Block = top3
      ? '<div class="s-bda-block"><p class="s-bda-ro-label">BDA 自评 TOP3</p><div class="row s-bda-top3-chips">' + top3 + "</div></div>"
      : "";
    var cases = (report.cases || []).map(bdaCaseCardHtml).join("");
    var casesBlock = cases
      ? '<div class="s-bda-block"><h3 class="s-bda-subhead">本周期提报的 BDA 案例</h3><div class="s-bda-case-list">' + cases + "</div></div>"
      : "";
    return (
      '<div class="card s-bda-card s-bda-card--readonly"><h2>三、BDA 提报</h2>' +
      '<p class="lead s-bda-source">展示用户在 <b>' + escapeText(labelOf(periodKey) || periodKey) +
      "</b> 周期内提报的 BDA（只读）</p>" +
      goalBlock +
      top3Block +
      casesBlock +
      "</div>"
    );
  }

  function validateBdaGoals(bda) {
    bda = bda || {};
    if (!(bda.principle || "").trim()) return "请填写「需提升的 BDA 领导力原则」。";
    if (!(bda.action || "").trim()) return "请填写「提升 BDA 的目标行为」。";
    if (!(bda.result || "").trim()) return "请填写「预期达成结果」。";
    return "";
  }

  function moduleNameForOkr(item) {
    var content = (item.content || "").trim();
    var dim = (item.dim || "").trim();
    if (content && dim) return dim + " · " + content;
    return content || dim || "业绩/OKR 目标";
  }

  function moduleNameForProject(item) {
    var theme = (item.theme || "").trim();
    var goal = (item.goal || "").trim();
    if (theme && goal && theme !== goal) return theme + " · " + goal;
    return theme || goal || "项目目标";
  }

  /** 按一、二每条目标自动生成模块，保留同 sourceKey 的进度状态 */
  function syncModulesFromPlan(row) {
    if (!row) return;
    var prev = {};
    (row.modules || []).forEach(function (m) {
      if (m.sourceKey) prev[m.sourceKey] = m.status;
    });
    var modules = [];
    (row.okr || []).forEach(function (item, i) {
      var sourceKey = "okr|" + i;
      modules.push({
        sourceKey: sourceKey,
        source: "okr",
        name: moduleNameForOkr(item),
        status: prev[sourceKey] || "todo",
      });
    });
    (row.projects || []).forEach(function (item, i) {
      var sourceKey = "project|" + i;
      modules.push({
        sourceKey: sourceKey,
        source: "project",
        name: moduleNameForProject(item),
        status: prev[sourceKey] || "todo",
      });
    });
    row.modules = modules;
  }

  function evalSectionsHtml(row, periodKey, readOnly) {
    if (readOnly) {
      return bdaBlockReadOnly(periodKey) +
        '<div class="card s-detail-readonly"><h2>四、当半年度表现总结</h2>' +
          fieldReadonly("评价分数（满分 100）", row.summary.score) +
          areaReadonly("当半年度工作最大的挑战/困难点", row.summary.challenge) +
        "</div>" +
        '<div class="card s-detail-readonly"><h2>五、其他评估参考</h2>' +
          fieldReadonly("成长参与度等级与分值", row.growth.level) +
          row.growth.acts.map(function (act, i) {
            return fieldReadonly("参加的活动 " + (i + 1), act);
          }).join("") +
          fieldReadonly("跨部门 Peers 是否支持 S（10 / 7 / 3 / 0）", row.peers.support) +
          areaReadonly("跨部门 Peers 建议", row.peers.note) +
        "</div>";
    }
    return bdaBlockReadOnly(periodKey) +
      '<div class="card"><h2>四、当半年度表现总结</h2>' +
        field("评价分数（满分 100）", row.summary.score, "summary.score") +
        area("当半年度工作最大的挑战/困难点", row.summary.challenge, "summary.challenge") +
      "</div>" +
      '<div class="card"><h2>五、其他评估参考</h2><p class="lead">答辩时无需打印。成长参与度答辩前自行填写，Peers 评价由 BP 收集。终评阶段填写。</p>' +
        field("成长参与度等级与分值", row.growth.level, "growth.level") +
        row.growth.acts.map(function (act, i) {
          return field("参加的活动 " + (i + 1), act, "growth.acts." + i);
        }).join("") +
        '<p class="lead">0～60 低参与度，60～90 中参与度，90 以上高参与度。</p>' +
        field("跨部门 Peers 是否支持 S（10 / 7 / 3 / 0）", row.peers.support, "peers.support") +
        area("跨部门 Peers 建议", row.peers.note, "peers.note") +
      "</div>";
  }

  function detailGoalsIntroHtml() {
    return '<div class="card s-me-perf-intro s-detail-goals-intro">' +
      '<div class="s-me-head"><h2 class="s-me-title">一、二 目标与进展</h2></div>' +
      '<p class="lead s-detail-view-hint">本页仅查看。修改目标请至 <a href="me.html#s-me">个人中心 · 绩效 S</a> 点「编辑」；填写 review 亦在个人中心。</p></div>';
  }

  function planHtml(row, opts) {
    syncModulesFromPlan(row);
    var phase = typeof opts === "boolean" ? (opts ? "submit" : "detail") : ((opts && opts.phase) || "submit");
    if (phase === "submit") return submitPlanBody(row);
    var periodKey = opts && opts.periodKey ? opts.periodKey : "";
    var detailHead = infoProfileCardHtml(row) +
      detailGoalsIntroHtml() +
      mePerfContentReadonlyHtml(row, "employee");
    return detailHead + evalSectionsHtml(row, periodKey, true);
  }

  function setPath(row, path, value) {
    var parts = path.split(".");
    var node = row;
    for (var i = 0; i < parts.length - 1; i++) node = node[parts[i]];
    node[parts[parts.length - 1]] = value;
  }

  function bind(root, getRow, data, rerender, getGoalEditMode, getPeriod) {
    root.addEventListener("input", function (e) {
      var path = e.target.getAttribute("data-path");
      var row = getRow();
      if (!path || !row) return;
      if (getGoalEditMode && !pathEditableOnMe(path, !!getGoalEditMode())) return;
      var periodKey = getPeriod ? getPeriod() : "";
      if (periodKey && !pathAllowedByWindow(path, periodKey)) {
        e.target.value = getPath(row, path);
        return;
      }
      setPath(row, path, e.target.value);
      if (/^okr\.\d+\./.test(path) || /^projects\.\d+\./.test(path)) {
        var structural = !/\.(resultMid|resultFinal|feedbackMid|feedbackFinal|result|feedback)$/.test(path);
        if (structural) syncModulesFromPlan(row);
        save(data);
        if (structural) rerender();
        return;
      }
      save(data);
    });
    root.addEventListener("change", function (e) {
      var name = e.target.getAttribute("data-bda");
      var row = getRow();
      if (!name || !row) return;
      var checked = row.bda.checked;
      var index = checked.indexOf(name);
      if (e.target.checked) {
        if (checked.length >= 3) { e.target.checked = false; return; }
        checked.push(name);
      } else if (index >= 0) checked.splice(index, 1);
      save(data);
      var tip = e.target.closest(".card").querySelector("[data-top3]");
      if (tip) tip.textContent = "BDA 自评：勾选最符合的 TOP3，必填。当前 " + checked.length + " / 3。";
    });
    root.addEventListener("click", function (e) {
      var row = getRow();
      if (!row) return;
      var add = e.target.closest("[data-add]");
      if (add) {
        if (getGoalEditMode && !getGoalEditMode()) return;
        var listName = add.getAttribute("data-add");
        var list = row[listName];
        if (!list) return;
        var empty;
        if (listName === "bizResults" || listName === "challenges") {
          empty = { text: "", resultMid: "", resultFinal: "", feedbackMid: "", feedbackFinal: "" };
        } else {
          var template = list[0] || (listName === "okr" ? { dim: "", content: "", weight: "" } : { theme: "", goal: "", weight: "" });
          empty = {};
          Object.keys(template).forEach(function (k) { empty[k] = ""; });
          ensureGoalReviewFields(empty);
        }
        list.push(empty);
        syncModulesFromPlan(row);
        save(data);
        rerender();
        return;
      }
      var rem = e.target.closest("[data-remove]");
      if (rem) {
        if (getGoalEditMode && !getGoalEditMode()) return;
        var remList = rem.getAttribute("data-remove");
        var remIdx = Number(rem.getAttribute("data-index"));
        var remRows = row[remList];
        var minKeep = remList === "bizResults" || remList === "challenges" ? 3 : 1;
        if (!remRows || remRows.length <= minKeep) {
          window.alert(minKeep === 3 ? "至少保留 3 条。" : "至少保留一条目标。");
          return;
        }
        remRows.splice(remIdx, 1);
        syncModulesFromPlan(row);
        save(data);
        rerender();
        return;
      }
      var statusBtn = e.target.closest("[data-status]");
      if (statusBtn) {
        row.modules[Number(statusBtn.getAttribute("data-mod"))].status = statusBtn.getAttribute("data-status");
        save(data);
        rerender();
      }
    });
  }

  function mountSubmit() {
    var data = load();
    var year = "2026";
    var half = "h2";
    var yearEl = document.getElementById("year");
    var halfEl = document.getElementById("half");
    var gate = document.getElementById("gate");
    var plan = document.getElementById("plan");
    function key() { return year + "|" + half; }
    function current() { return data[key()]; }
    var gateTitle = gate.querySelector("h2");
    var gateLead = gate.querySelector(".lead");
    var applyBtn = document.getElementById("apply");
    function render() {
      var phase = windowPhase(key());
      var open = phase.submit === "open";
      var win = windowOf(key());
      document.getElementById("period-label").textContent =
        year + " " + halfName(half) + " · 提报至 " + formatWindowAt(win.submitClose);
      halfEl.querySelectorAll("button").forEach(function (btn) {
        btn.classList.toggle("on", btn.getAttribute("data-half") === half);
      });
      var row = current();
      if (!open) {
        gate.hidden = false;
        gateTitle.textContent = phase.submit === "before" ? "提报尚未开始" : "提报已截止";
        gateLead.textContent = windowRangeText(key());
        applyBtn.hidden = true;
        if (row && row.applied) {
          plan.hidden = false;
          plan.innerHTML = planHtml(row, { phase: "submit" });
          plan.querySelectorAll("input, textarea, button").forEach(function (el) { el.disabled = true; });
        } else {
          plan.hidden = true;
          plan.innerHTML = "";
        }
        return;
      }
      applyBtn.hidden = false;
      gateTitle.textContent = "尚未申请";
      gateLead.textContent = "这个半年还没有自提 S。申请后直接填写，不经过上级审批。提报时间 " +
        formatWindowAt(win.submitOpen) + " 至 " + formatWindowAt(win.submitClose) + "。";
      if (!row || !row.applied) {
        gate.hidden = false;
        plan.hidden = true;
        plan.innerHTML = "";
        return;
      }
      gate.hidden = true;
      plan.hidden = false;
      plan.innerHTML = planHtml(row, { phase: "submit" }) + submitBarHtml(row);
    }
    yearEl.addEventListener("change", function (e) { year = e.target.value; render(); });
    halfEl.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-half]");
      if (!btn) return;
      half = btn.getAttribute("data-half");
      render();
    });
    document.getElementById("apply").addEventListener("click", function () {
      if (windowPhase(key()).submit !== "open") {
        window.alert(windowRangeText(key()));
        return;
      }
      data[key()] = blank();
      save(data);
      render();
    });
    bind(plan, current, data, render);
    plan.addEventListener("click", function (e) {
      if (e.target.id !== "s-submit-plan") return;
      var row = current();
      if (!row) return;
      if (windowPhase(key()).submit !== "open") {
        window.alert(windowRangeText(key()));
        render();
        return;
      }
      var simpleErr = validateSimpleS(row);
      if (simpleErr) {
        window.alert(simpleErr);
        return;
      }
      syncModulesFromPlan(row);
      row.submittedAt = new Date().toISOString();
      syncBdaSubmission(key(), row);
      save(data);
      render();
    });
    render();
  }

  function mountEdit(root) {
    var data = load();
    var periodKey = periodFromSearch() || latestKey(data);
    if (periodKey && (!data[periodKey] || !data[periodKey].applied)) periodKey = latestKey(data);
    var editBaseline = null;
    var backHref = "me.html#s-me" + (periodKey ? "?period=" + encodeURIComponent(periodKey) : "");

    function current() {
      return periodKey && data[periodKey] ? data[periodKey] : null;
    }
    function render() {
      var titleEl = document.getElementById("edit-s-title");
      if (!periodKey || !data[periodKey] || !data[periodKey].applied) {
        root.innerHTML =
          '<div class="card"><p class="lead">暂无已提报的绩效 S 可编辑。</p>' +
          '<p class="lead"><a href="submit-s.html">去提报</a> · <a href="me.html#s-me">返回个人中心</a></p></div>';
        if (titleEl) titleEl.textContent = "编辑绩效 S";
        return;
      }
      if (titleEl) titleEl.textContent = "编辑绩效 S · " + labelOf(periodKey);
      if (windowPhase(periodKey).submit !== "open") {
        root.innerHTML =
          '<div class="card"><h2>' + (windowPhase(periodKey).submit === "before" ? "提报尚未开始" : "提报已截止") + "</h2>" +
          '<p class="lead">' + escapeText(windowRangeText(periodKey)) + "</p>" +
          '<p class="lead"><a href="' + escapeAttr(backHref) + '">返回个人中心</a></p></div>';
        return;
      }
      var row = data[periodKey];
      if (!editBaseline) editBaseline = snapshotRowForEdit(row);
      root.innerHTML =
        '<div class="s-edit-layout">' +
        '<div class="s-edit-main">' + editPlanHtml(row) + editBarHtml(backHref) + "</div>" +
        '<aside class="s-edit-log-aside">' + editLogSidebarHtml(row, editBaseline, periodKey) + "</aside>" +
        "</div>";
    }
    bind(root, current, data, render);
    root.addEventListener("click", function (e) {
      if (e.target.id !== "s-finish-edit") return;
      var row = current();
      if (!row || !editBaseline) return;
      var editErr = validateSimpleS(row);
      if (editErr) {
        window.alert(editErr);
        return;
      }
      syncModulesFromPlan(row);
      appendEditLogs(periodKey, row, editBaseline, "employee");
      syncBdaSubmission(periodKey, row);
      save(data);
      if (typeof location !== "undefined") location.href = backHref;
    });
    render();
  }

  function mountMe(el) {
    var data = load();
    var viewRole = "employee";
    if (typeof location !== "undefined" && /(?:\?|&)leader=1(?:&|$)/.test(location.search)) {
      viewRole = "leader";
    }
    var perfKey = periodFromSearch() || latestKey(data);
    if (perfKey && (!data[perfKey] || !data[perfKey].applied)) perfKey = latestKey(data);

    function current() {
      return perfKey && data[perfKey] ? data[perfKey] : null;
    }
    function render() {
      var periodKeys = sortPeriodKeys(appliedKeys(data));
      if (!periodKeys.length) {
        el.innerHTML = '<div class="card"><h2>绩效 S</h2><p class="lead">还没有进行中的自提 S。</p><a class="btn" href="submit-s.html">去申请</a></div>';
        return;
      }
      if (!perfKey || periodKeys.indexOf(perfKey) < 0) perfKey = periodKeys[0];
      var row = data[perfKey];
      el.innerHTML = mePerfBlockHtml(row, perfKey, viewRole, periodKeys);
      save(data);
    }
    bind(el, current, data, render, function () { return false; }, function () { return perfKey; });
    el.addEventListener("click", function (e) {
      var periodBtn = e.target.closest("[data-me-period]");
      if (periodBtn) {
        perfKey = periodBtn.getAttribute("data-me-period");
        render();
        return;
      }
      var roleBtn = e.target.closest("[data-me-role]");
      if (roleBtn) {
        viewRole = roleBtn.getAttribute("data-me-role");
        render();
        return;
      }
      var btn = e.target.closest(".s-me-mod");
      if (!btn || btn.disabled) return;
      var row = current();
      if (!row) return;
      var index = Number(btn.getAttribute("data-mod"));
      var st = btn.getAttribute("data-status");
      if (row.modules[index]) {
        row.modules[index].status = st;
        save(data);
        render();
      }
    });
    render();
  }

  function mountDetail(el) {
    var data = load();
    var detailKey = periodFromSearch() || latestKey(data);
    if (detailKey && (!data[detailKey] || !data[detailKey].applied)) detailKey = latestKey(data);
    function render() {
      if (!detailKey) {
        el.innerHTML = '<p class="lead">还没有进行中的自提 S。</p><a class="btn" href="me.html">返回个人中心</a>';
        return;
      }
      el.innerHTML = '<p class="lead"><a href="me.html">返回个人中心</a></p>' +
        "<h1>绩效 S · " + labelOf(detailKey) + "</h1>" +
        '<p class="lead s-detail-page-hint">详情页 <b>仅查看</b>：含中期回顾、中期反馈、最终达成、最终反馈及三～五终评字段；不可编辑。</p>' +
        planHtml(data[detailKey], { phase: "detail", periodKey: detailKey });
    }
    render();
  }

  function growthMilestonesAll(period, score) {
    return [
      { iso: "2023-09-01", date: "2023年09月01日", text: "入职数字平台 · 软件产品序列" },
      { iso: "2024-06-30", date: "2024年06月30日", text: "停留 LV3.2（专业通道）" },
      { iso: "2025-03-15", date: "2025年03月15日", text: "获得荣誉「认知供给先锋」", sub: "2025年3月荣誉" },
      { iso: "2025-06-15", date: "2025年06月15日", text: "晋升 LV3.2 → LV4.1", sub: "2025年6月晋升" },
      { iso: "2025-11-20", date: "2025年11月20日", text: "绩效 S 评定 82 分（2025 下半年）" },
      { iso: "2026-06-15", date: "2026年06月15日", text: "晋升 LV4.1 → LV5.1", sub: "2026年6月晋升，未停留 LV4.2" },
      { iso: "2026-09-01", date: "2026年09月01日", text: "开启 " + period + " 自提绩效 S（当前 " + score + " 分）" },
      { iso: "2027-03-01", date: "2027年03月01日", text: "规划：LV6.1 窗口评估（价值点与模块达标前提）", planned: true },
    ];
  }

  function milestonesHtml(list) {
    return (list || []).map(function (m) {
      var cls = m.planned ? ' class="is-planned"' : "";
      return '<li' + cls + '><time datetime="' + m.iso + '">' + m.date + '</time><span>' + m.text + "</span></li>";
    }).join("");
  }

  function parsePromotionYears(milestones) {
    var years = {};
    (milestones || []).forEach(function (m) {
      var t = m.text || "";
      var hit = t.match(/晋升\s+LV[\d.]+\s*→\s*(LV[\d.]+)/);
      if (hit && hit[1] && m.iso) years[hit[1]] = m.iso.slice(0, 4);
    });
    return years;
  }

  function growthLvPathNodes(snap) {
    var current = (snap && snap.lv) || "LV5.1";
    var stayed = [];
    ((snap && snap.milestonesAll) || []).forEach(function (m) {
      if (m.planned) return;
      var hit = String(m.text || "").match(/晋升\s+(LV[\d.]+)\s*→\s*(LV[\d.]+)/);
      if (!hit) return;
      if (!stayed.length) stayed.push(hit[1]);
      if (stayed[stayed.length - 1] !== hit[2]) stayed.push(hit[2]);
    });
    if (!stayed.length) stayed = [current];
    if (stayed.indexOf(current) < 0) stayed.push(current);
    var years = parsePromotionYears(snap && snap.milestonesAll);
    return stayed.map(function (lv) {
      var node = { lv: lv, state: lv === current ? "now" : "done" };
      if (lv === current) node.badge = "当前";
      if (years[lv]) node.promoYear = years[lv];
      return node;
    });
  }

  function lvLinkHtml(afterState) {
    var cls = "lv-link";
    if (afterState === "done") cls += " done";
    if (afterState === "now") cls += " next";
    return '<span class="' + cls + '"></span>';
  }

  function lvNodeHtml(node) {
    var cls = "lv-node " + node.state;
    var inner = escapeText(node.lv);
    if (node.badge) inner += "<small>" + escapeText(node.badge) + "</small>";
    if (node.promoYear) {
      inner += '<small class="lv-promo-year">' + escapeText(node.promoYear) + "年晋升</small>";
    }
    return '<span class="' + cls + '">' + inner + "</span>";
  }

  function renderGrowthLvPathHtml(snap) {
    var nodes = growthLvPathNodes(snap);
    var parts = [];
    nodes.forEach(function (node, i) {
      parts.push(lvNodeHtml(node));
      if (i < nodes.length - 1) parts.push(lvLinkHtml(node.state));
    });
    return parts.join("");
  }

  function fillGrowthLvPath(el, snap) {
    if (!el || !snap) return;
    el.innerHTML = renderGrowthLvPathHtml(snap);
    el.setAttribute(
      "aria-label",
      "晋升路径，仅展示停留过的层级，当前 " + snap.lv
    );
  }

  function recentFourQuarterGrades() {
    var Mock = global.QuarterlyPerfMock;
    if (!Mock || !Mock.mineRows || !Mock.gradeLabel) return "A · A · A+ · A";
    var rows = Mock.mineRows().filter(function (r) { return r.approveStatus === "FINISHED"; });
    rows.sort(function (a, b) { return (b.season || 0) - (a.season || 0); });
    return rows.slice(0, 4).map(function (r) { return Mock.gradeLabel(r.bpAchievementEvaluation); }).join(" · ") || "—";
  }

  function profileSnapshot() {
    var data = load();
    var key = latestKey(data);
    var row = key ? data[key] : null;
    var lv = row && row.info && row.info.lv ? row.info.lv : "LV5.1";
    var isMentor = !!(row && row.info && row.info.isMentor);
    var score = row && row.summary && row.summary.score ? row.summary.score : "—";
    var period = key ? labelOf(key) : "暂无周期";
    var milestonesAll = growthMilestonesAll(period, score);
    var four = recentFourQuarterGrades();
    return {
      lv: lv,
      isMentor: isMentor,
      currentTitle: "近四期绩效 " + four,
      currentNote: "2026 年参考分数线 · 仅在新发绩效后刷新；门槛明细不在此展开。",
      nextGoalLv: "LV6.1",
      nextTitle: "下一目标 LV6.1",
      nextNote: "当前绩效 S " + score + " 分（" + period + "）· 达标后进入评审窗口。",
      milestones: milestonesAll.slice(-4),
      milestonesAll: milestonesAll,
      vpStory: []
    };
  }

  function engagementSeed() {
    return {
      "2026|h2": {
        views: 86,
        likes: 12,
        dislikes: 0,
        favoriteCount: 3,
        comments: [
          { author: "陈工", text: "目标拆解清晰，期待首页对齐上线。", at: "2026-10-20T09:00:00.000Z" },
        ],
      },
      "2025|h2": {
        views: 142,
        likes: 24,
        dislikes: 1,
        favoriteCount: 5,
        comments: [
          { author: "赵工", text: "CBDA 改版案例能否挂链接？", at: "2026-01-16T11:00:00.000Z" },
          { author: "吴冰娜", text: "已补在案例库，谢谢关注。", at: "2026-01-17T15:30:00.000Z" },
        ],
      },
      "2025|h1": { views: 97, likes: 8, dislikes: 0, favoriteCount: 1, comments: [] },
    };
  }

  function loadEngagement() {
    try {
      var raw = localStorage.getItem(ENG_KEY);
      if (raw) {
        var saved = JSON.parse(raw);
        var seed = engagementSeed();
        var changed = false;
        Object.keys(seed).forEach(function (k) {
          if (!saved[k]) {
            saved[k] = seed[k];
            changed = true;
          } else {
            if (saved[k].views == null) { saved[k].views = seed[k].views; changed = true; }
            if (saved[k].likes == null && seed[k].likes != null) { saved[k].likes = seed[k].likes; changed = true; }
            if (saved[k].dislikes == null && seed[k].dislikes != null) { saved[k].dislikes = seed[k].dislikes; changed = true; }
            if (saved[k].liked === undefined) { saved[k].liked = false; changed = true; }
            if (saved[k].disliked === undefined) { saved[k].disliked = false; changed = true; }
            if (saved[k].favorited === undefined) { saved[k].favorited = false; changed = true; }
            if (saved[k].favoriteCount == null && seed[k].favoriteCount != null) {
              saved[k].favoriteCount = seed[k].favoriteCount;
              changed = true;
            }
            if (!saved[k].comments) { saved[k].comments = seed[k].comments || []; changed = true; }
          }
        });
        if (changed) saveEngagement(saved);
        return saved;
      }
    } catch (e) {}
    var data = engagementSeed();
    saveEngagement(data);
    return data;
  }

  function saveEngagement(data) {
    localStorage.setItem(ENG_KEY, JSON.stringify(data));
  }

  function feedEngagementForKey(all, key) {
    var row = all[key];
    if (!row) {
      row = {
        views: 12,
        likes: 0,
        dislikes: 0,
        favoriteCount: 0,
        liked: false,
        disliked: false,
        favorited: false,
        comments: [],
      };
      all[key] = row;
      saveEngagement(all);
    }
    if (!row.comments) row.comments = [];
    if (row.views == null) row.views = 0;
    if (row.likes == null) row.likes = 0;
    if (row.dislikes == null) row.dislikes = 0;
    if (row.liked === undefined) row.liked = false;
    if (row.disliked === undefined) row.disliked = false;
    if (row.favorited === undefined) row.favorited = false;
    if (row.favoriteCount == null) row.favoriteCount = 0;
    return row;
  }

  function simpleTexts(list) {
    return (list || []).map(function (item) {
      if (item && typeof item === "object") return String(item.text || "").trim();
      return String(item || "").trim();
    }).filter(Boolean);
  }

  function hasFeedContent(row) {
    if (!row || !row.listed) return false;
    hydrateSimpleS(row);
    return simpleTexts(row.bizResults).length > 0 || simpleTexts(row.challenges).length > 0;
  }

  function feedTimeRank(row, key) {
    if (row.submittedAt) {
      try {
        var t = new Date(row.submittedAt).getTime();
        if (!isNaN(t)) return t;
      } catch (e) {}
    }
    var parts = key.split("|");
    return Number(parts[0] || 0) * 100 + (parts[1] === "h2" ? 2 : 1);
  }

  function feedGoalChipsHtml(row) {
    hydrateSimpleS(row);
    var items = [];
    simpleTexts(row.bizResults).forEach(function (text) {
      items.push({ kind: "预期业绩结果", text: text });
    });
    simpleTexts(row.challenges).forEach(function (text) {
      items.push({ kind: "挑战", text: text });
    });
    if (!items.length) return "";
    return '<ul class="s-perf-feed-goals">' + items.map(function (it) {
      return '<li><span class="s-perf-feed-goal-kind">' + escapeText(it.kind) + "</span>" +
        escapeText(it.text) +
        "</li>";
    }).join("") + "</ul>";
  }

  function feedCardHtml(key, row, engAll) {
    var FI = global.FeedInteraction;
    var info = row.info || {};
    var eng = feedEngagementForKey(engAll, key);
    var views = Number(eng.views) || 0;
    var commentCount = (eng.comments || []).length;
    var timeRank = feedTimeRank(row, key);
    var score = Number(row.summary && row.summary.score) || 75;
    var status = '<span class="s-perf-feed-status is-done">已上榜</span>';
    var when = row.submittedAt
      ? formatSubmittedAt(row.submittedAt)
      : labelOf(key) + " · 全员可见";
    var detailHref = "detail-s-perf.html?period=" + encodeURIComponent(key);
    var roleText = String(info.role || "");
    var pos = roleText.indexOf("产品") >= 0 ? "产品经理" : "结构工程师";
    var statusKey = "listed";
    var periodRank = periodSortRank(key);
    var likes = Number(eng.likes) || 0;
    var summaryMeta = when;
    var footBlock = FI ? FI.footHtml(key, eng) : "";
    var viewStat = FI ? FI.viewStatHtml(views) : "";
    return '<article class="card pcard s-perf-feed-card feed-interact-card" data-panel="sperf" data-feed-key="' + escapeAttr(key) + '" data-time="' + timeRank + '" data-period-rank="' + periodRank + '" data-score="' + score + '" data-view="' + views + '" data-like="' + likes + '" data-comment="' + commentCount + '" data-status="' + statusKey + '" data-pos="' + escapeAttr(pos) + '">' +
      '<span class="s-perf-feed-badge">绩效 S</span>' + status +
      '<div class="author">' +
      '<span class="avatar">' + escapeText(infoInitial(info.name)) + "</span>" +
      "<div><b>" + escapeText(info.name || "—") + "</b><span>" + feedAuthorMetaHtml(info) + "</span></div>" +
      '<span class="pill-cat cat-perf">提报</span></div>' +
      '<h3><a class="s-perf-feed-title feed-view-bump" href="' + detailHref + '">绩效 S · ' + escapeText(labelOf(key)) + "</a></h3>" +
      feedGoalChipsHtml(row) +
      '<p class="lead s-perf-feed-summary">' + escapeText(summaryMeta) + "</p>" +
      '<div class="feed-card-tag-row s-perf-feed-tag-row">' +
      '<a class="s-perf-view-link feed-view-bump" href="' + detailHref + '" data-feed-key="' + escapeAttr(key) + '">查看达成</a>' +
      viewStat +
      "</div>" +
      footBlock +
      "</article>";
  }

  function bumpFeedView(engAll, key) {
    var eng = feedEngagementForKey(engAll, key);
    eng.views = (Number(eng.views) || 0) + 1;
    saveEngagement(engAll);
    return eng;
  }

  var sFeedEngStore = null;

  function mountFeed(container) {
    if (!container) return;
    var FI = global.FeedInteraction;
    function commentAuthorName() {
      try {
        var perf = load();
        var k = latestKey(perf);
        if (k && perf[k] && perf[k].info && perf[k].info.name) return perf[k].info.name;
      } catch (e) {}
      return "同事";
    }
    function render() {
      var data = load();
      var engAll = loadEngagement();
      var keys = sortPeriodKeys(appliedKeys(data)).filter(function (k) { return hasFeedContent(data[k]); });
      if (!keys.length) {
        container.innerHTML = "";
        return;
      }
      container.innerHTML = keys.map(function (k) { return feedCardHtml(k, data[k], engAll); }).join("");
      if (FI && sFeedEngStore) {
        container.querySelectorAll(".s-perf-feed-card").forEach(function (card) {
          var fk = card.getAttribute("data-feed-key");
          if (fk) FI.syncCardUi(card, sFeedEngStore.forKey(sFeedEngStore.load(), fk));
        });
      }
    }
    loadEngagement();
    if (FI && !sFeedEngStore) {
      sFeedEngStore = FI.mount(container, {
        storageKey: ENG_KEY,
        seed: engagementSeed(),
        cardSelector: ".s-perf-feed-card.feed-interact-card",
        getCommentAuthor: commentAuthorName,
      });
    }
    render();
    window.addEventListener("storage", function (ev) {
      if (ev.key === KEY || ev.key === ENG_KEY) render();
    });
  }

  function mountPublicDetail(el) {
    if (!el) return;
    var data = load();
    var detailKey = periodFromSearch() || latestKey(data);
    if (detailKey && (!data[detailKey] || !data[detailKey].applied)) detailKey = latestKey(data);
    function render() {
      if (!detailKey || !data[detailKey]) {
        el.innerHTML = '<p class="lead">暂无该周期的绩效 S 提报。</p><a class="btn" href="home.html?tab=sperf">返回信息流</a>';
        return;
      }
      var row = data[detailKey];
      syncModulesFromPlan(row);
      var engAll = loadEngagement();
      bumpFeedView(engAll, detailKey);
      if (global.FeedInteraction && !sFeedEngStore) {
        sFeedEngStore = global.FeedInteraction.createStore(ENG_KEY, engagementSeed());
      }
      el.innerHTML =
        '<p class="lead s-perf-public-nav"><a href="home.html?tab=sperf">← 返回信息流</a></p>' +
        '<div class="card s-perf-public-head">' +
        '<h1>绩效 S · ' + escapeText(labelOf(detailKey)) + '</h1>' +
        '<p class="lead">全员可见。内容与个人中心一致：业务结果、挑战，每条含中期回顾、最终结果，以及主管 / Leader 反馈。不展示职级。</p>' +
        "</div>" +
        infoProfileCardHtml(row, { publicView: true, hideWeight: true }) +
        '<div class="s-perf-public-body">' + mePerfContentHtml(row) + "</div>";
      el.querySelectorAll("input[data-path], textarea[data-path]").forEach(function (inp) {
        inp.readOnly = true;
        inp.classList.add("s-input-readonly");
      });
      el.querySelectorAll(".s-me-mod").forEach(function (btn) { btn.disabled = true; });
    }
    render();
  }

  function mountGrowthPath(el) {
    if (!el) return;
    var snap = profileSnapshot();
    el.innerHTML =
      '<p class="lead growth-back"><a href="me.html">← 返回个人中心</a></p>' +
      '<div class="card growth-path-page">' +
      '<h1 class="growth-path-heading">成长路径</h1>' +
      '<p class="lead">完整晋升节点、当期绩效与荣誉记录（静态模拟）。</p>' +
      '<h3 class="me-growth-title">路径概览</h3>' +
      '<div class="lv-path me-lv-path growth-lv-path" id="growth-lv-path" aria-label="晋升路径"></div>' +
      '<div class="me-perf-pair">' +
      '<div class="me-perf-box me-perf-now"><span class="me-perf-label">当前绩效</span><b>' + snap.currentTitle + "</b><p class=\"lead\">" + snap.currentNote + "</p></div>" +
      '<div class="me-perf-box me-perf-next"><span class="me-perf-label">预计进入</span><b>' + snap.nextTitle + "</b><p class=\"lead\">" + snap.nextNote + "</p></div>" +
      "</div>" +
      '<h3 class="me-growth-title">荣誉与绩效记录 · 全部</h3>' +
      '<ul class="me-milestones me-milestones--full">' + milestonesHtml(snap.milestonesAll) + "</ul>" +
      '<p class="lead growth-foot"><a href="submit-s-detail.html">本期绩效 S 详情</a></p>' +
      "</div>";
    fillGrowthLvPath(el.querySelector("#growth-lv-path"), snap);
  }

  global.SPerf = {
    mountSubmit: mountSubmit,
    mountEdit: mountEdit,
    mountMe: mountMe,
    mountDetail: mountDetail,
    mountFeed: mountFeed,
    mountPublicDetail: mountPublicDetail,
    mountGrowthPath: mountGrowthPath,
    profileSnapshot: profileSnapshot,
    fillGrowthLvPath: fillGrowthLvPath,
    loadRows: load,
    labelOf: labelOf,
    formatSubmittedAt: formatSubmittedAt,
    windows: {
      load: loadWindows,
      save: saveWindows,
      get: windowOf,
      phase: windowPhase,
      periods: windowPeriods,
      formatAt: formatWindowAt,
      rangeText: windowRangeText,
      hint: windowHintHtml,
    },
  };
})(window);
