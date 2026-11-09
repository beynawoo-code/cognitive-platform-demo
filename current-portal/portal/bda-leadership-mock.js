(function (global) {
  /** Demo：BDA 领导力目标提报真源；绩效 S 详情第三节只读读取此处 */
  var KEY = "cognition-bda-leadership-v1";

  function seed() {
    return {
      "2026|h2": {
        principle: "B1用户至上-为用户创造惊喜",
        action: "从个人中心进入评估后，返回仍回到现网个人中心",
        result: "返回路径已接到现网个人中心",
        checked: ["长期主义：为未来构建能力", "逻辑明确：逻辑是最核心能力", "承诺在线：交付超预期结果"],
        submittedAt: "2026-08-01T10:00:00.000Z",
      },
    };
  }

  function load() {
    var data = {};
    try {
      var raw = global.localStorage && global.localStorage.getItem(KEY);
      if (raw) data = JSON.parse(raw) || {};
    } catch (e) {
      data = {};
    }
    var s = seed();
    Object.keys(s).forEach(function (k) {
      if (!data[k]) data[k] = s[k];
    });
    return data;
  }

  function persist(data) {
    if (!global.localStorage) return;
    global.localStorage.setItem(KEY, JSON.stringify(data));
  }

  function forPeriod(periodKey) {
    if (!periodKey) return null;
    var row = load()[periodKey];
    return row ? Object.assign({}, row) : null;
  }

  function savePeriod(periodKey, payload) {
    if (!periodKey || !payload) return;
    var data = load();
    data[periodKey] = Object.assign({}, payload, { updatedAt: new Date().toISOString() });
    persist(data);
  }

  global.BdaLeadership = {
    forPeriod: forPeriod,
    savePeriod: savePeriod,
    load: load,
  };
})(typeof window !== "undefined" ? window : global);
