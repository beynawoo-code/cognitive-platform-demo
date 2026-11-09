(function (global) {
  var KEY = "vpslp-demo-v3";
  var RULE_KEY = "vpslp-green-rule-global";
  var GREEN_RULE = { passScore: 80, minPassCount: 1, validMonths: 6 };
  var STAYED_LEVELS = [
    { code: "3.2", current: false },
    { code: "4.1", current: false },
    { code: "5.1", current: true },
  ];
  var ROLE = "软件产品经理";

  var POINTS = [
    { id: "vp01", name: "竞品分析", weight: 0.8, openness: "高" },
    { id: "vp02", name: "用户痛点分析", weight: 0.9, openness: "高" },
    { id: "vp03", name: "年度项目规划", weight: 1, openness: "高" },
    { id: "vp04", name: "系统框架规划", weight: 0.9, openness: "高" },
    { id: "vp05", name: "业务调研", weight: 0.9, openness: "中" },
    { id: "vp06", name: "输出系统优化清单", weight: 0.7, openness: "中" },
    { id: "vp07", name: "用户故事输出", weight: 0.8, openness: "低" },
    { id: "vp08", name: "业务流程梳理", weight: 0.8, openness: "低" },
    { id: "vp09", name: "需求价值分析", weight: 0.8, openness: "中" },
    { id: "vp10", name: "输出AI原型", weight: 0.6, openness: "中" },
    { id: "vp11", name: "用户需求评审", weight: 0.6, openness: "低" },
    { id: "vp12", name: "产品需求输出", weight: 0.7, openness: "中" },
    { id: "vp13", name: "项目评审与排期", weight: 0.6, openness: "低" },
    { id: "vp14", name: "进度风险跟进", weight: 0.7, openness: "中" },
    { id: "vp15", name: "需求变更管理", weight: 0.6, openness: "低" },
    { id: "vp16", name: "制定功能验收标准", weight: 0.6, openness: "中" },
    { id: "vp17", name: "风险识别与处理", weight: 0.7, openness: "中" },
    { id: "vp18", name: "线上验收跟进", weight: 0.5, openness: "低" },
    { id: "vp19", name: "用户使用培训", weight: 0.5, openness: "低" },
    { id: "vp20", name: "用户反馈处理", weight: 0.7, openness: "低" },
  ];

  var MENTORS = [
    { id: "chen", name: "陈工", active: true },
    { id: "liu", name: "刘工", active: true },
    { id: "zhao", name: "赵工", active: true },
    { id: "wang", name: "王工", active: false },
  ];

  var COVER = {
    vp01: ["chen", "liu"],
    vp03: ["chen", "zhao"],
    vp04: ["liu"],
    vp05: ["chen", "zhao"],
    vp09: ["liu", "zhao"],
    vp12: ["chen"],
    vp14: ["zhao"],
    vp17: ["liu"],
  };

  var MATERIALS = [
    { id: "m1", pointId: "vp01", mentorId: "chen", kind: "理论", title: "竞品拆解框架与信息源", body: "从信息源清单、维度表到结论页的三段式写法，附跨境品类样例。" },
    { id: "m2", pointId: "vp01", mentorId: "liu", kind: "案例", title: "跨境 SaaS 竞品对标复盘", body: "对标对象选取、定价与功能矩阵、复盘会纪要模板。" },
    { id: "m3", pointId: "vp03", mentorId: "chen", kind: "体系", title: "年度项目规划模板", body: "OKR 对齐、资源池、里程碑与风险预留栏位说明。" },
    { id: "m4", pointId: "vp03", mentorId: "zhao", kind: "认知", title: "规划评审常见追问", body: "评审会上关于优先级、依赖与 ROI 的高频问题清单。" },
    { id: "m5", pointId: "vp04", mentorId: "liu", kind: "理论", title: "系统框架分层原则", body: "门户、交易、供应链的分层边界与接口约定示例。" },
    { id: "m6", pointId: "vp05", mentorId: "chen", kind: "案例", title: "业务调研访谈提纲", body: "研工贸场景下的访谈对象、问题树与纪要结构。" },
    { id: "m7", pointId: "vp09", mentorId: "zhao", kind: "理论", title: "需求价值四象限", body: "价值/成本四象限判读与排期建议，含 2 个需求样例。" },
    { id: "m8", pointId: "vp12", mentorId: "chen", kind: "体系", title: "PRD 结构检查单", body: "背景、范围、验收、埋点与回滚等章节自检表。" },
    { id: "m9", pointId: "vp14", mentorId: "liu", kind: "案例", title: "进度风险升级样例", body: "黄/红风险升级邮件与站会话术示例。" },
    { id: "m10", pointId: "vp17", mentorId: "zhao", kind: "认知", title: "风险登记与闭环", body: "风险台账字段、责任人、验证关闭标准。" },
  ];

  function blank() {
    return {
      role: "pm",
      selection: [],
      rounds: [],
      mentors: {},
      interactions: {},
      exams: [],
      pointExams: {},
      greens: {},
      pointCycles: seedPointCycles(),
      rosterPointCycles: seedRosterCycles(),
      greenRule: { passScore: GREEN_RULE.passScore, minPassCount: GREEN_RULE.minPassCount, validMonths: GREEN_RULE.validMonths },
      sPerf: { results: ["", "", ""], challenges: ["", "", ""] },
    };
  }

  function normalizeRule(r) {
    r = r || {};
    var pass = Number(r.passScore);
    var count = Number(r.minPassCount);
    var months = Number(r.validMonths);
    return {
      passScore: pass >= 0 && pass <= 100 ? pass : GREEN_RULE.passScore,
      minPassCount: count >= 1 ? count : GREEN_RULE.minPassCount,
      validMonths: months >= 1 ? months : GREEN_RULE.validMonths,
    };
  }

  function loadGreenRule() {
    try {
      var raw = localStorage.getItem(RULE_KEY);
      if (raw) return normalizeRule(JSON.parse(raw));
    } catch (e) { /* 忽略损坏缓存 */ }
    return normalizeRule(GREEN_RULE);
  }

  function saveGreenRule(rule) {
    var next = normalizeRule(rule);
    localStorage.setItem(RULE_KEY, JSON.stringify(next));
    return next;
  }

  function ruleOf() {
    return loadGreenRule();
  }

  function addMonths(iso, months) {
    var d = new Date(iso);
    d.setMonth(d.getMonth() + months);
    return d.toISOString();
  }

  function materialsForPoint(pointId) {
    return MATERIALS.filter(function (m) { return m.pointId === pointId; });
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var state = JSON.parse(raw);
        if (state.scores) {
          delete state.scores;
        }
        if (!state.selection) state.selection = [];
        if (!state.rounds) state.rounds = [];
        if (!state.role) state.role = "pm";
        if (!state.pointExams) state.pointExams = {};
        if (!state.greens) state.greens = {};
        if (!state.greenRule) state.greenRule = { passScore: GREEN_RULE.passScore, minPassCount: GREEN_RULE.minPassCount, validMonths: GREEN_RULE.validMonths };
        if (!state.sPerf) state.sPerf = { results: ["", "", ""], challenges: ["", "", ""] };
        if (!state.pointCycles) state.pointCycles = seedPointCycles();
        if (!state.rosterPointCycles) state.rosterPointCycles = seedRosterCycles();
        state.rounds = state.rounds.map(function (r) {
          if (r.selected) return r;
          if (r.scores) {
            r.selected = Object.keys(r.scores).filter(function (id) {
              return r.scores[id] > 0 && pointName(id) !== id;
            });
            delete r.scores;
          }
          return r;
        });
        return state;
      }
    } catch (e) { /* 忽略损坏缓存 */ }
    var seeded = blank();
    save(seeded);
    return seeded;
  }

  function save(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function pointName(id) {
    var hit = POINTS.filter(function (p) { return p.id === id; })[0];
    return hit ? hit.name : id;
  }

  function mentorName(id) {
    var hit = MENTORS.filter(function (m) { return m.id === id; })[0];
    return hit ? hit.name : "";
  }

  function selectedMaterials() {
    return MATERIALS.slice();
  }

  function seedPointCycles() {
    return {
      "2026|h2": {
        vp01: { readIds: ["m1"], exams: [{ at: "2026-10-12T02:00:00.000Z", score: 86 }] },
        vp02: { readIds: [], exams: [{ at: "2026-10-18T02:00:00.000Z", score: 74 }] },
        vp03: { readIds: ["m3"], exams: [{ at: "2026-09-20T02:00:00.000Z", score: 91 }] },
        vp04: { readIds: [], exams: [] },
        vp05: { readIds: ["m6"], exams: [] },
      },
      "2026|h1": {
        vp01: { readIds: ["m1", "m2"], exams: [{ at: "2026-03-02T02:00:00.000Z", score: 78 }, { at: "2026-05-16T02:00:00.000Z", score: 88 }] },
        vp05: { readIds: ["m6"], exams: [{ at: "2026-04-08T02:00:00.000Z", score: 82 }] },
      },
      "2025|h2": {
        vp01: { readIds: ["m1", "m2"], exams: [{ at: "2025-11-02T02:00:00.000Z", score: 90 }] },
        vp03: { readIds: ["m3", "m4"], exams: [{ at: "2025-10-11T02:00:00.000Z", score: 85 }] },
      },
      "2025|h1": {
        vp04: { readIds: ["m5"], exams: [{ at: "2025-05-09T02:00:00.000Z", score: 81 }] },
      },
    };
  }

  function seedRosterCycles() {
    return {
      hemin: {
        "2026|h2": {
          vp01: { readIds: ["m1", "m2"], exams: [{ at: "2026-10-02T02:00:00.000Z", score: 92 }] },
          vp03: { readIds: ["m3"], exams: [{ at: "2026-09-15T02:00:00.000Z", score: 77 }] },
        },
        "2025|h2": {
          vp09: { readIds: ["m7"], exams: [{ at: "2025-11-08T02:00:00.000Z", score: 88 }] },
        },
      },
      linxiao: {
        "2026|h2": {
          vp05: { readIds: ["m6"], exams: [] },
        },
      },
    };
  }

  function cyclePeriods() {
    return ["2026|h2", "2026|h1", "2025|h2", "2025|h1"];
  }

  function cycleLabel(key) {
    var parts = String(key || "").split("|");
    return parts[0] + (parts[1] === "h1" ? " 上半年" : " 下半年");
  }

  function cycleRow(state, period, pointId) {
    var bag = state.pointCycles && state.pointCycles[period];
    var row = bag && bag[pointId];
    if (!row) return { readIds: [], exams: [] };
    return {
      readIds: Array.isArray(row.readIds) ? row.readIds.slice() : [],
      exams: Array.isArray(row.exams) ? row.exams.slice() : [],
    };
  }

  function cyclePoint(state, period, pointId) {
    var row = cycleRow(state, period, pointId);
    var materials = materialsForPoint(pointId);
    var rule = ruleOf();
    var passed = row.exams.filter(function (item) { return Number(item.score) >= rule.passScore; });
    var latest = row.exams.length ? row.exams[row.exams.length - 1] : null;
    return {
      materials: materials,
      readIds: row.readIds,
      readCount: materials.filter(function (item) { return row.readIds.indexOf(item.id) >= 0; }).length,
      exams: row.exams,
      latest: latest,
      lit: passed.length >= rule.minPassCount,
    };
  }

  function recordsFor(state, userId) {
    if (!userId || userId === "self") return state.pointCycles || {};
    var bag = state.rosterPointCycles && state.rosterPointCycles[userId];
    return bag || {};
  }

  function cyclePointFor(state, userId, period, pointId) {
    if (!userId || userId === "self") return cyclePoint(state, period, pointId);
    return cyclePoint({ pointCycles: recordsFor(state, userId) }, period, pointId);
  }

  function cycleSummary(state, userId, period) {
    var lit = 0;
    POINTS.forEach(function (point) {
      if (cyclePointFor(state, userId, period, point.id).lit) lit += 1;
    });
    return { lit: lit, total: POINTS.length };
  }

  function greenStatus(state, pointId) {
    var g = state.greens && state.greens[pointId];
    if (!g) return { status: "off", label: "未绿" };
    if (new Date(g.expiresAt).getTime() <= Date.now()) {
      return { status: "expired", label: "已过期", expiresAt: g.expiresAt };
    }
    return { status: "on", label: "已绿", expiresAt: g.expiresAt, score: g.score };
  }

  function refreshGreens(state) {
    var rule = ruleOf(state);
    if (!state.greens) state.greens = {};
    Object.keys(state.pointExams || {}).forEach(function (pointId) {
      var passed = (state.pointExams[pointId] || []).filter(function (x) {
        return Number(x.score) >= rule.passScore;
      });
      if (passed.length >= rule.minPassCount) {
        var last = passed[passed.length - 1];
        state.greens[pointId] = {
          litAt: last.at,
          expiresAt: addMonths(last.at, rule.validMonths),
          score: last.score,
        };
      } else {
        delete state.greens[pointId];
      }
    });
  }

  function currentCycleKey(date) {
    var d = date || new Date();
    return d.getFullYear() + "|" + (d.getMonth() < 6 ? "h1" : "h2");
  }

  function ensureCyclePoint(state, period, pointId) {
    if (!state.pointCycles) state.pointCycles = {};
    if (!state.pointCycles[period]) state.pointCycles[period] = {};
    if (!state.pointCycles[period][pointId]) state.pointCycles[period][pointId] = { readIds: [], exams: [] };
    var row = state.pointCycles[period][pointId];
    if (!Array.isArray(row.readIds)) row.readIds = [];
    if (!Array.isArray(row.exams)) row.exams = [];
    return row;
  }

  function recordPointExam(state, pointId, score) {
    if (!state.pointExams[pointId]) state.pointExams[pointId] = [];
    var entry = { at: new Date().toISOString(), score: score };
    state.pointExams[pointId].push(entry);
    ensureCyclePoint(state, currentCycleKey(), pointId).exams.push(entry);
    refreshGreens(state);
  }

  function markMaterialRead(state, materialId) {
    var material = materialById(materialId);
    if (!material) return;
    var row = ensureCyclePoint(state, currentCycleKey(), material.pointId);
    if (row.readIds.indexOf(materialId) < 0) row.readIds.push(materialId);
  }

  function materialById(id) {
    return MATERIALS.filter(function (m) { return m.id === id; })[0] || null;
  }

  function materialStatus(state, materialId) {
    var it = state.interactions && state.interactions[materialId];
    if (!it) return { label: "未学", ok: false };
    if (it.comments && it.comments.length) return { label: "已评论", ok: true };
    if (it.useful || it.fav) return { label: "已互动", ok: true };
    if (it.views) return { label: "已浏览", ok: true };
    return { label: "未学", ok: false };
  }

  function materialMetrics(state, materialId) {
    var it = state.interactions && state.interactions[materialId];
    var commentCount = it && it.comments ? it.comments.length : 0;
    var examDone = !!(it && it.examDone);
    return { commentCount: commentCount, examDone: examDone };
  }

  function touch(state, materialId) {
    if (!state.interactions[materialId]) {
      state.interactions[materialId] = { views: 0, useful: false, useless: false, fav: false, comments: [] };
    }
    return state.interactions[materialId];
  }

  function currentSelection(state) {
    if (state.selection && state.selection.length) return state.selection.slice();
    if (!state.rounds.length) return [];
    var last = state.rounds[state.rounds.length - 1];
    return (last.selected || []).slice();
  }

  function selectionCounts(state) {
    var counts = {};
    POINTS.forEach(function (p) { counts[p.id] = 0; });
    (state && state.rounds || []).forEach(function (r) {
      (r.selected || []).forEach(function (id) {
        if (counts[id] !== undefined) counts[id] += 1;
      });
    });
    return counts;
  }

  function selectionMapMarkup(input) {
    var counts = {};
    var current = {};
    POINTS.forEach(function (p) { counts[p.id] = 0; });

    if (Array.isArray(input)) {
      input.forEach(function (id) {
        current[id] = true;
        if (!counts[id]) counts[id] = 0;
      });
    } else if (input && typeof input === "object") {
      var st = input.state || (input.rounds ? input : null);
      if (st) {
        counts = selectionCounts(st);
      }
      if (input.draft && input.draft.length) {
        input.draft.forEach(function (id) { current[id] = true; });
      } else if (st) {
        currentSelection(st).forEach(function (id) { current[id] = true; });
      }
    }

    var byBand = { "高": [], "中": [], "低": [] };
    POINTS.forEach(function (p) { byBand[p.openness].push(p); });

    var html = [
      '<div class="vp-galaxy" role="img" aria-label="价值点点亮与选中次数">',
      '<div class="vp-galaxy-head">',
      "<span>价值点星图</span>",
      '<span class="vp-legend"><i class="dot lit"></i>已点亮 <i class="dot cur"></i>最新一轮 <b class="vp-legend-n">次数</b></span>',
      "</div>",
    ];

    ["高", "中", "低"].forEach(function (band) {
      html.push('<div class="vp-band-block"><div class="vp-band-label">开放' + band + '</div><div class="vp-tiles">');
      byBand[band].forEach(function (p) {
        var c = counts[p.id] || 0;
        var lit = c > 0;
        var cur = !!current[p.id];
        var cls = "vp-tile" + (lit ? " lit" : "") + (cur ? " current" : "");
        var tier = p.weight >= 0.85 ? "t-high" : p.weight >= 0.65 ? "t-mid" : "t-low";
        html.push(
          '<div class="' + cls + " " + tier + '" title="' + p.name + (lit ? " · 累计 " + c + " 次" : "") + (cur ? " · 最新一轮已选" : "") + '">' +
          '<span class="vp-tile-glow" aria-hidden="true"></span>' +
          (cur ? '<span class="vp-tile-round">本轮</span>' : "") +
          '<span class="vp-tile-name">' + p.name + "</span>" +
          (lit ? '<span class="vp-tile-count">' + c + "</span>" : '<span class="vp-tile-count empty">—</span>') +
          "</div>"
        );
      });
      html.push("</div></div>");
    });

    html.push("</div>");
    return html.join("");
  }

  function litMedalsMarkup(state) {
    var counts = selectionCounts(state);
    var lit = POINTS.filter(function (p) { return (counts[p.id] || 0) > 0; });
    if (!lit.length) {
      return '<p class="me-medals-empty">暂无点亮价值点。保存评估后，星图与勋章将同步更新。</p>';
    }
    var html = ['<ul class="me-medal-grid">'];
    lit.sort(function (a, b) { return (counts[b.id] || 0) - (counts[a.id] || 0); });
    lit.forEach(function (p) {
      var c = counts[p.id] || 0;
      html.push(
        '<li class="me-medal" title="' + p.name + " · 累计 " + c + ' 次">' +
        '<span class="me-medal-seal" aria-hidden="true"><i>' + p.name.charAt(0) + "</i></span>" +
        '<span class="me-medal-body">' +
        '<span class="me-medal-name">' + p.name + "</span>" +
        '<span class="me-medal-meta">开放' + p.openness + " · " + c + ' 次</span>' +
        "</span></li>"
      );
    });
    html.push("</ul>");
    return html.join("");
  }

  global.VpslpDemo = {
    ROLE: ROLE,
    POINTS: POINTS,
    MENTORS: MENTORS,
    COVER: COVER,
    MATERIALS: MATERIALS,
    load: load,
    save: save,
    pointName: pointName,
    mentorName: mentorName,
    GREEN_RULE: GREEN_RULE,
    STAYED_LEVELS: STAYED_LEVELS,
    ruleOf: ruleOf,
    loadGreenRule: loadGreenRule,
    saveGreenRule: saveGreenRule,
    selectedMaterials: selectedMaterials,
    materialsForPoint: materialsForPoint,
    greenStatus: greenStatus,
    refreshGreens: refreshGreens,
    recordPointExam: recordPointExam,
    markMaterialRead: markMaterialRead,
    cyclePeriods: cyclePeriods,
    cycleLabel: cycleLabel,
    cyclePoint: cyclePoint,
    cyclePointFor: cyclePointFor,
    cycleSummary: cycleSummary,
    materialById: materialById,
    materialStatus: materialStatus,
    materialMetrics: materialMetrics,
    touch: touch,
    currentSelection: currentSelection,
    selectionCounts: selectionCounts,
    selectionMapMarkup: selectionMapMarkup,
    litMedalsMarkup: litMedalsMarkup,
  };
})(window);
