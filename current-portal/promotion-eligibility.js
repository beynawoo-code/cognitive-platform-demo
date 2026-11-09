(function (global) {
  var SCORE = { S: 2, A: 1.5, "B+": 1, B: 0.5 };
  var GRADE_RANK = { B: 1, "B+": 2, A: 3, S: 4 };

  var WINDOW = {
    id: "2026-Spring",
    label: "2026 春",
    cutoff: "2026-03-31",
    cycles: ["2025-H2", "2025-H1", "2024-H2", "2024-H1"],
    cycleLabels: {
      "2025-H2": "2025 下半年 · 2026-01 出档",
      "2025-H1": "2025 上半年 · 2025-07 出档",
      "2024-H2": "2024 下半年 · 2025-01 出档",
      "2024-H1": "2024 上半年 · 2024-07 出档",
    },
  };

  /** 目标层级晋升绩效线（演示：节选 L4～L7，与计算表量级一致） */
  var LEVEL_LINES = {
    L4: { red: { avg: 1.05, total: 4.2 }, yellow: { avg: 0.95, total: 3.8 } },
    L5: { red: { avg: 1.125, total: 4.5 }, yellow: { avg: 1.025, total: 4.1 } },
    L6: { red: { avg: 1.175, total: 4.7 }, yellow: { avg: 1.075, total: 4.3 } },
    L7: { red: { avg: 1.225, total: 4.9 }, yellow: { avg: 1.125, total: 4.5 } },
  };

  var THRESHOLD = {
    L4: { minTenure: 1, minYearsSincePromotion: 1, minGradYears: { 博士: 3, 硕士: 4, 本科: 5, 大专: 7 } },
    L5: { minTenure: 2, minYearsSincePromotion: 1, minGradYears: { 博士: 4, 硕士: 5, 本科: 6, 大专: 8 } },
    L6: { minTenure: 2, minYearsSincePromotion: 2, minGradYears: { 博士: 5, 硕士: 6, 本科: 7, 大专: 10 } },
    L7: { minTenure: 3, minYearsSincePromotion: 2, minGradYears: { 博士: 7, 硕士: 8, 本科: 9, 大专: 12 } },
  };

  var EMPLOYEES = [
    {
      id: "e1",
      name: "吴冰娜",
      dept: "（DP）数字平台",
      education: "本科",
      gradYear: 2016,
      hireDate: "2018-07-01",
      lastPromotionDate: "2024-06-15",
      currentLevel: "LV5.1",
      targetLevel: "LV6.1",
      grades: { "2025-H2": "A", "2025-H1": "A", "2024-H2": "S", "2024-H1": "A" },
      promotionOverlay: null,
    },
    {
      id: "e2",
      name: "张晨",
      dept: "供应链",
      education: "硕士",
      gradYear: 2017,
      hireDate: "2019-03-01",
      lastPromotionDate: "2025-04-01",
      currentLevel: "L6",
      targetLevel: "L7",
      grades: { "2025-H2": "A", "2025-H1": "S", "2024-H2": "A", "2024-H1": "A" },
      promotionOverlay: null,
    },
    {
      id: "e3",
      name: "王磊",
      dept: "制造",
      education: "本科",
      gradYear: 2015,
      hireDate: "2017-06-01",
      lastPromotionDate: "2023-05-01",
      currentLevel: "L5",
      targetLevel: "L6",
      grades: { "2025-H2": "B+", "2025-H1": "B+", "2024-H2": "A", "2024-H1": "B+" },
      promotionOverlay: null,
    },
    {
      id: "e4",
      name: "赵敏",
      dept: "研发",
      education: "本科",
      gradYear: 2020,
      hireDate: "2022-08-01",
      lastPromotionDate: null,
      currentLevel: "L4",
      targetLevel: "L5",
      grades: { "2025-H2": "A", "2025-H1": "B+" },
      promotionOverlay: null,
    },
    {
      id: "e5",
      name: "李大伟",
      dept: "（DP）数字平台",
      education: "硕士",
      gradYear: 2014,
      hireDate: "2016-01-10",
      lastPromotionDate: "2025-04-20",
      currentLevel: "L6",
      targetLevel: "L7",
      grades: { "2025-H2": "B", "2025-H1": "B+", "2024-H2": "B", "2024-H1": "A" },
      promotionOverlay: {
        windowLabel: "2025 春",
        cycleIds: ["2024-H1", "2024-H2", "2025-H1", "2025-H2"],
        note: "2025 春已晋升；四期计分归置为 A，原档不变",
      },
    },
    {
      id: "e6",
      name: "陈静",
      dept: "财务",
      education: "本科",
      gradYear: 2012,
      hireDate: "2014-09-01",
      lastPromotionDate: "2024-01-10",
      currentLevel: "L6",
      targetLevel: "L7",
      grades: { "2025-H2": "B", "2025-H1": "A", "2024-H2": "A", "2024-H1": "A" },
      promotionOverlay: null,
    },
  ];

  function yearsBetween(fromIso, toIso) {
    var a = new Date(fromIso);
    var b = new Date(toIso);
    return (b - a) / (365.25 * 24 * 3600 * 1000);
  }

  function scoreOf(letter) {
    return SCORE[letter] != null ? SCORE[letter] : null;
  }

  function meetsMinB(letter) {
    return letter && GRADE_RANK[letter] >= GRADE_RANK.B;
  }

  function checkThreshold(emp, targetLevel, cutoff) {
    var rule = THRESHOLD[targetLevel];
    if (!rule) return { ok: true, items: [] };
    var items = [];
    var tenure = yearsBetween(emp.hireDate, cutoff);
    items.push({
      key: "tenure",
      label: "司龄 ≥ " + rule.minTenure + " 年",
      ok: tenure >= rule.minTenure,
      detail: "当前约 " + tenure.toFixed(1) + " 年",
    });
    if (emp.lastPromotionDate) {
      var sincePromo = yearsBetween(emp.lastPromotionDate, cutoff);
      items.push({
        key: "promo",
        label: "距上次晋升 ≥ " + rule.minYearsSincePromotion + " 年",
        ok: sincePromo >= rule.minYearsSincePromotion,
        detail: "当前约 " + sincePromo.toFixed(1) + " 年",
      });
    } else {
      items.push({ key: "promo", label: "距上次晋升", ok: true, detail: "无历史晋升记录（演示通过）" });
    }
    var gradYears = new Date(cutoff).getFullYear() - emp.gradYear;
    var needGrad = rule.minGradYears[emp.education] || 99;
    items.push({
      key: "edu",
      label: emp.education + " 毕业 ≥ " + needGrad + " 年",
      ok: gradYears >= needGrad,
      detail: "当前 " + gradYears + " 年",
    });
    var ok = items.every(function (i) { return i.ok; });
    return { ok: ok, items: items };
  }

  function isNormalized(emp, cycleId) {
    if (!emp.promotionOverlay || !emp.promotionOverlay.cycleIds) return false;
    return emp.promotionOverlay.cycleIds.indexOf(cycleId) >= 0;
  }

  function buildSlots(emp, cycles) {
    return cycles.map(function (cid) {
      var display = emp.grades[cid] || null;
      var missing = !display;
      var normalized = isNormalized(emp, cid);
      var effectiveLetter = normalized ? "A" : display;
      var effectiveScore = effectiveLetter ? scoreOf(effectiveLetter) : null;
      return {
        cycleId: cid,
        cycleLabel: WINDOW.cycleLabels[cid] || cid,
        display: display,
        missing: missing,
        normalized: normalized,
        effectiveLetter: effectiveLetter,
        effectiveScore: effectiveScore,
        minBOk: display ? meetsMinB(display) : false,
      };
    });
  }

  function lineStatus(avg, total, lines) {
    if (avg >= lines.red.avg && total >= lines.red.total) return "ELIGIBLE_RED";
    if (avg >= lines.yellow.avg && total >= lines.yellow.total) return "ELIGIBLE_YELLOW";
    var near =
      (lines.yellow.avg - avg <= 0.08 && lines.yellow.avg - avg > 0) ||
      (lines.yellow.total - total <= 0.3 && lines.yellow.total - total > 0);
    if (near) return "NEAR_MISS";
    return "BELOW_YELLOW";
  }

  var STATUS_LABEL = {
    ELIGIBLE_RED: "达红线（主动）",
    ELIGIBLE_YELLOW: "达黄线",
    NEAR_MISS: "近达标",
    BELOW_YELLOW: "未达黄线",
    FAIL_MIN_GRADE: "单期低于 B",
    BLOCKED_THRESHOLD: "门槛未满足",
    INSUFFICIENT_CYCLES: "四期不足",
  };

  var STATUS_CLASS = {
    ELIGIBLE_RED: "promo-ok-red",
    ELIGIBLE_YELLOW: "promo-ok-yellow",
    NEAR_MISS: "promo-warn",
    BELOW_YELLOW: "promo-bad",
    FAIL_MIN_GRADE: "promo-bad",
    BLOCKED_THRESHOLD: "promo-muted",
    INSUFFICIENT_CYCLES: "promo-muted",
  };

  /** LV5.1 / L5 → 规则表主档 L5 */
  function ruleLevel(level) {
    var s = String(level || "").trim();
    var m = s.match(/^LV(\d+)/i) || s.match(/^L(\d+)/i);
    return m ? "L" + m[1] : level;
  }

  function compute(emp) {
    var target = emp.targetLevel || emp.currentLevel;
    var ruleKey = ruleLevel(target);
    var lines = LEVEL_LINES[ruleKey];
    var threshold = checkThreshold(emp, ruleKey, WINDOW.cutoff);
    var slots = buildSlots(emp, WINDOW.cycles);
    var filled = slots.filter(function (s) { return !s.missing; });
    if (filled.length < 4) {
      return {
        employee: emp,
        targetLevel: target,
        lines: lines,
        threshold: threshold,
        slots: slots,
        status: "INSUFFICIENT_CYCLES",
        statusLabel: STATUS_LABEL.INSUFFICIENT_CYCLES,
        statusClass: STATUS_CLASS.INSUFFICIENT_CYCLES,
        avg: null,
        total: null,
        gap: null,
      };
    }
    if (!threshold.ok) {
      return {
        employee: emp,
        targetLevel: target,
        lines: lines,
        threshold: threshold,
        slots: slots,
        status: "BLOCKED_THRESHOLD",
        statusLabel: STATUS_LABEL.BLOCKED_THRESHOLD,
        statusClass: STATUS_CLASS.BLOCKED_THRESHOLD,
        avg: null,
        total: null,
        gap: null,
      };
    }
    var failMin = slots.some(function (s) { return s.display && !s.minBOk; });
    if (failMin) {
      return {
        employee: emp,
        targetLevel: target,
        lines: lines,
        threshold: threshold,
        slots: slots,
        status: "FAIL_MIN_GRADE",
        statusLabel: STATUS_LABEL.FAIL_MIN_GRADE,
        statusClass: STATUS_CLASS.FAIL_MIN_GRADE,
        avg: null,
        total: null,
        gap: null,
      };
    }
    var scores = slots.map(function (s) { return s.effectiveScore; });
    var total = scores.reduce(function (a, b) { return a + b; }, 0);
    var avg = total / 4;
    var status = lines ? lineStatus(avg, total, lines) : "BELOW_YELLOW";
    var gap = lines
      ? {
        avgToYellow: Math.max(0, lines.yellow.avg - avg),
        totalToYellow: Math.max(0, lines.yellow.total - total),
        avgToRed: Math.max(0, lines.red.avg - avg),
        totalToRed: Math.max(0, lines.red.total - total),
      }
      : null;
    return {
      employee: emp,
      targetLevel: target,
      lines: lines,
      threshold: threshold,
      slots: slots,
      status: status,
      statusLabel: STATUS_LABEL[status] || status,
      statusClass: STATUS_CLASS[status] || "promo-muted",
      avg: avg,
      total: total,
      gap: gap,
    };
  }

  function allResults() {
    return EMPLOYEES.map(compute).sort(function (a, b) {
      var order = { ELIGIBLE_RED: 0, ELIGIBLE_YELLOW: 1, NEAR_MISS: 2, BELOW_YELLOW: 3, FAIL_MIN_GRADE: 4, BLOCKED_THRESHOLD: 5, INSUFFICIENT_CYCLES: 6 };
      var da = order[a.status] != null ? order[a.status] : 9;
      var db = order[b.status] != null ? order[b.status] : 9;
      if (da !== db) return da - db;
      return (b.avg || 0) - (a.avg || 0);
    });
  }

  function byEmployeeId(id) {
    var emp = EMPLOYEES.filter(function (e) { return e.id === id; })[0];
    return emp ? compute(emp) : null;
  }

  function escapeText(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;");
  }

  function gradeChip(slot) {
    if (slot.missing) return '<span class="promo-grade promo-grade--empty">—</span>';
    var norm = slot.normalized
      ? ' <span class="promo-norm" title="计分按 A，原档不变">归置</span>'
      : "";
    return '<span class="promo-grade promo-grade-' + escapeText(slot.display).replace("+", "p") + '">' +
      escapeText(slot.display) + "</span>" + norm;
  }

  global.PromotionDemo = {
    WINDOW: WINDOW,
    SCORE: SCORE,
    EMPLOYEES: EMPLOYEES,
    STATUS_LABEL: STATUS_LABEL,
    compute: compute,
    allResults: allResults,
    byEmployeeId: byEmployeeId,
    escapeText: escapeText,
    gradeChip: gradeChip,
    defaultEmployeeId: "e1",
  };
})(typeof window !== "undefined" ? window : global);
