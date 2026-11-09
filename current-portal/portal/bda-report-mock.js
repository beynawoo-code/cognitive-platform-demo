(function (global) {
  /**
   * Demo：用户在各绩效 S 周期（2026|h2）内提报的 BDA 真源。
   * 含领导力目标、自评 TOP3、BDA 案例（挑战/行为/结果）。
   */
  var KEY = "cognition-bda-report-v1";

  function seed() {
    return {
      "2026|h2": {
        leadershipGoal: {
          principle: "B1用户至上-为用户创造惊喜",
          action: "从个人中心进入评估后，返回仍回到现网个人中心",
          expectedResult: "返回路径已接到现网个人中心",
        },
        selfTop3: [
          "长期主义：为未来构建能力",
          "逻辑明确：逻辑是最核心能力",
          "承诺在线：交付超预期结果",
        ],
        cases: [
          {
            id: "bda-2026h2-1",
            dimension: "A5承诺践行",
            challenge: "首页四栏与现网不一致，用户从评估返回路径断裂",
            behavior: "走查现网与个人中心 demo，补齐返回链路与文档",
            result: "提报、个人中心与评估返回已对齐现网结构",
            status: "已通过",
            submitTime: "2026-08-12",
            href: "detail-cbda.html",
          },
        ],
        submittedAt: "2026-08-12T10:00:00.000Z",
      },
      "2025|h2": {
        leadershipGoal: {
          principle: "崇尚技术：用技术创造价值",
          action: "绩效看板迁移方案输出可评审原型",
          expectedResult: "原型评审通过并进入开发排期",
        },
        selfTop3: ["围绕目标：目标是决策的中心", "积极行动：做工作的策划者", "持续审视：从实践提炼认知"],
        cases: [
          {
            id: "bda-2025h2-1",
            dimension: "D1视线目标",
            challenge: "绩效看板需求分散在多份文档",
            behavior: "收敛范围并输出单页原型",
            result: "完成需求梳理与原型评审",
            status: "已通过",
            submitTime: "2025-11-08",
            href: "detail-cbda.html",
          },
        ],
        submittedAt: "2025-11-08T14:00:00.000Z",
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
    if (!row) return null;
    return JSON.parse(JSON.stringify(row));
  }

  function saveLeadershipGoal(periodKey, payload) {
    if (!periodKey || !payload) return;
    var data = load();
    var prev = data[periodKey] || { cases: [], selfTop3: [] };
    prev.leadershipGoal = {
      principle: payload.principle || "",
      action: payload.action || "",
      expectedResult: payload.expectedResult || payload.result || "",
    };
    prev.updatedAt = new Date().toISOString();
    if (!prev.submittedAt) prev.submittedAt = prev.updatedAt;
    data[periodKey] = prev;
    persist(data);
  }

  global.BdaReport = {
    forPeriod: forPeriod,
    saveLeadershipGoal: saveLeadershipGoal,
    load: load,
  };
})(typeof window !== "undefined" ? window : global);
