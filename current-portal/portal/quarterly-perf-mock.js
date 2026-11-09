(function (global) {
  var CURRENT_EMPLOYEE_ID = "E-WBN";
  var CURRENT_NAME = "吴冰娜";

  function gradeLabel(v) {
    if (!v || v === "INVISIBLE") return "—";
    if (v === "A_PLUS") return "A+";
    return v;
  }

  function statusLabel(s) {
    var map = {
      FINISHED: "已完成",
      LEADER_APPROVING: "Leader审批中",
      BP_APPROVING: "BP处理中",
      WAIT_SUBMIT: "待提报",
    };
    return map[s] || s || "—";
  }

  var list = [
    { id: 101, employeeId: "E-WBN", departmentName: "产品", title: "软件产品组长", name: "吴冰娜", titleLevel: "LV5.1", showSeason: "2026Q1&Q2", season: 202602, submitTime: "2026-07-23", submitSource: "SELF", selfAchievementEvaluation: "A", leaderAchievementEvaluation: "A", lastAchievementEvaluations: "A+,A+,A", approveStatus: "FINISHED", bpAchievementEvaluation: "A", currentApproverId: "", currentApproverName: "" },
    { id: 102, employeeId: "E-WBN", departmentName: "产品", title: "软件产品组长", name: "吴冰娜", titleLevel: "LV5.1", showSeason: "2025Q4", season: 202504, submitTime: "2026-01-18", submitSource: "SELF", selfAchievementEvaluation: "A", leaderAchievementEvaluation: "A", lastAchievementEvaluations: "A+,A,A", approveStatus: "FINISHED", bpAchievementEvaluation: "A", currentApproverId: "", currentApproverName: "" },
    { id: 103, employeeId: "E-WBN", departmentName: "产品", title: "软件产品组长", name: "吴冰娜", titleLevel: "LV5.1", showSeason: "2025Q3", season: 202503, submitTime: "2025-10-12", submitSource: "LEADER", selfAchievementEvaluation: "A", leaderAchievementEvaluation: "A_PLUS", lastAchievementEvaluations: "A,A,A+", approveStatus: "FINISHED", bpAchievementEvaluation: "A+", currentApproverId: "", currentApproverName: "" },
    { id: 104, employeeId: "E-WBN", departmentName: "产品", title: "软件产品组长", name: "吴冰娜", titleLevel: "LV5.0", showSeason: "2025Q2", season: 202502, submitTime: "2025-07-08", submitSource: "SELF", selfAchievementEvaluation: "A", leaderAchievementEvaluation: "A", lastAchievementEvaluations: "A,A,B+", approveStatus: "FINISHED", bpAchievementEvaluation: "A", currentApproverId: "", currentApproverName: "" },
    { id: 105, employeeId: "E-WBN", departmentName: "产品", title: "软件产品经理", name: "吴冰娜", titleLevel: "LV4.2", showSeason: "2025Q1", season: 202501, submitTime: "2025-04-02", submitSource: "SELF", selfAchievementEvaluation: "A", leaderAchievementEvaluation: "A", lastAchievementEvaluations: "B+,A,A", approveStatus: "FINISHED", bpAchievementEvaluation: "A", currentApproverId: "", currentApproverName: "" },
    { id: 106, employeeId: "E-WBN", departmentName: "产品", title: "软件产品经理", name: "吴冰娜", titleLevel: "LV4.2", showSeason: "2024Q4", season: 202404, submitTime: "2025-01-15", submitSource: "SELF", selfAchievementEvaluation: "A", leaderAchievementEvaluation: "A", lastAchievementEvaluations: "A,B+,A", approveStatus: "FINISHED", bpAchievementEvaluation: "A", currentApproverId: "", currentApproverName: "" },
    { id: 107, employeeId: "E-WBN", departmentName: "产品", title: "软件产品经理", name: "吴冰娜", titleLevel: "LV4.1", showSeason: "2024Q3", season: 202403, submitTime: "2024-10-20", submitSource: "LEADER", selfAchievementEvaluation: "A", leaderAchievementEvaluation: "A", lastAchievementEvaluations: "B+,A,A", approveStatus: "FINISHED", bpAchievementEvaluation: "A", currentApproverId: "", currentApproverName: "" },
    { id: 108, employeeId: "E-WBN", departmentName: "产品", title: "软件产品经理", name: "吴冰娜", titleLevel: "LV4.1", showSeason: "2024Q2", season: 202402, submitTime: "2024-07-11", submitSource: "SELF", selfAchievementEvaluation: "B_PLUS", leaderAchievementEvaluation: "A", lastAchievementEvaluations: "B+,B+,A", approveStatus: "FINISHED", bpAchievementEvaluation: "A", currentApproverId: "", currentApproverName: "" },
    { id: 109, employeeId: "E-WBN", departmentName: "产品", title: "软件产品经理", name: "吴冰娜", titleLevel: "LV4.0", showSeason: "2024Q1", season: 202401, submitTime: "2024-04-05", submitSource: "SELF", selfAchievementEvaluation: "A", leaderAchievementEvaluation: "A", lastAchievementEvaluations: "A,A,B+", approveStatus: "FINISHED", bpAchievementEvaluation: "A", currentApproverId: "", currentApproverName: "" },
    { id: 110, employeeId: "E-WBN", departmentName: "产品", title: "软件产品经理", name: "吴冰娜", titleLevel: "LV3.2", showSeason: "2023Q4", season: 202304, submitTime: "2024-01-12", submitSource: "SELF", selfAchievementEvaluation: "A", leaderAchievementEvaluation: "A_PLUS", lastAchievementEvaluations: "A,A,A", approveStatus: "FINISHED", bpAchievementEvaluation: "A+", currentApproverId: "", currentApproverName: "" },
    { id: 111, employeeId: "E-WBN", departmentName: "产品", title: "软件产品经理", name: "吴冰娜", titleLevel: "LV3.1", showSeason: "2023Q3", season: 202303, submitTime: "2023-10-18", submitSource: "SELF", selfAchievementEvaluation: "S", leaderAchievementEvaluation: "S", lastAchievementEvaluations: "A,A+,S", approveStatus: "FINISHED", bpAchievementEvaluation: "S", currentApproverId: "", currentApproverName: "" },
    { id: 112, employeeId: "E-WBN", departmentName: "产品", title: "软件产品经理", name: "吴冰娜", titleLevel: "LV3.0", showSeason: "2022Q4", season: 202204, submitTime: "2023-01-20", submitSource: "SELF", selfAchievementEvaluation: "A", leaderAchievementEvaluation: "A", lastAchievementEvaluations: "A,B+,A", approveStatus: "FINISHED", bpAchievementEvaluation: "A", currentApproverId: "", currentApproverName: "" },
    { id: 113, employeeId: "E-WBN", departmentName: "产品", title: "软件产品经理", name: "吴冰娜", titleLevel: "LV2.2", showSeason: "2021Q3", season: 202103, submitTime: "2021-10-22", submitSource: "SELF", selfAchievementEvaluation: "A", leaderAchievementEvaluation: "A", lastAchievementEvaluations: "B+,A,A", approveStatus: "FINISHED", bpAchievementEvaluation: "A", currentApproverId: "", currentApproverName: "" },
    { id: 201, employeeId: "E-ZM", departmentName: "产品", title: "软件产品经理", name: "赵敏", titleLevel: "LV4.0", showSeason: "2026Q1&Q2", season: 202602, submitTime: "2026-07-20", submitSource: "SELF", selfAchievementEvaluation: "A", leaderAchievementEvaluation: "A", lastAchievementEvaluations: "A,A,A", approveStatus: "LEADER_APPROVING", bpAchievementEvaluation: "INVISIBLE", currentApproverId: "E-WBN", currentApproverName: "吴冰娜", approveFlag: true },
    { id: 202, employeeId: "E-LG", departmentName: "硬件", title: "结构工程师", name: "刘工", titleLevel: "LV3.2", showSeason: "2026Q1&Q2", season: 202602, submitTime: "2026-07-21", submitSource: "SELF", selfAchievementEvaluation: "A", leaderAchievementEvaluation: "INVISIBLE", lastAchievementEvaluations: "A,B+,A", approveStatus: "LEADER_APPROVING", bpAchievementEvaluation: "INVISIBLE", currentApproverId: "E-WBN", currentApproverName: "吴冰娜", approveFlag: true },
    { id: 203, employeeId: "E-CH", departmentName: "产品", title: "产品专员", name: "陈航", titleLevel: "LV2.1", showSeason: "2025Q4", season: 202504, submitTime: "2026-01-10", submitSource: "LEADER", selfAchievementEvaluation: "A", leaderAchievementEvaluation: "A_PLUS", lastAchievementEvaluations: "A,A,A", approveStatus: "BP_APPROVING", bpAchievementEvaluation: "INVISIBLE", currentApproverId: "E-WBN", currentApproverName: "吴冰娜", approveFlag: true },
    { id: 204, employeeId: "E-ZM", departmentName: "产品", title: "软件产品经理", name: "赵敏", titleLevel: "LV4.0", showSeason: "2025Q4", season: 202504, submitTime: "2026-01-16", submitSource: "SELF", selfAchievementEvaluation: "A", leaderAchievementEvaluation: "A", lastAchievementEvaluations: "A,A,B+", approveStatus: "FINISHED", bpAchievementEvaluation: "A", currentApproverId: "", currentApproverName: "" },
    { id: 205, employeeId: "E-LG", departmentName: "硬件", title: "结构工程师", name: "刘工", titleLevel: "LV3.2", showSeason: "2025Q4", season: 202504, submitTime: "2026-01-14", submitSource: "SELF", selfAchievementEvaluation: "B_PLUS", leaderAchievementEvaluation: "A", lastAchievementEvaluations: "B+,A,A", approveStatus: "FINISHED", bpAchievementEvaluation: "A", currentApproverId: "", currentApproverName: "" },
  ];

  var notInList = [
    { department: "工厂", title: "QC", name: "测试甲", mobile: "138****0001", showSeason: "2026Q1&Q2" },
    { department: "工厂", title: "QC", name: "测试乙", mobile: "138****0002", showSeason: "2026Q1&Q2" },
  ];

  var details = {
    101: {
      desc: "2026Q1&Q2",
      workRole: "GENERAL",
      projects: [{ projectName: "认知平台三期", projectCode: "RZ-001", projectLevel: "A", schedulingTime: "2026-03", projectRuntimeStatus: "RUNNING", workContent: "门户对齐与绩效 S", weightRate: 60 }],
      bda: [{ submitEmployeeName: "吴冰娜", employeeName: "吴冰娜", submitTime: "2026-06", employeeValue: "A5", challenge: "首页四栏与现网不一致", behavior: "走查并输出差异清单", result: "完成 demo 对齐", approveStatus: "已通过" }],
      study: [{ courseName: "产品规划方法论", mentorName: "导师A", completeStatus: "已完成", score: 92 }],
    },
    201: {
      desc: "2026Q1&Q2",
      workRole: "LEADER",
      projects: [{ projectName: "供应链看板", projectCode: "SC-88", projectLevel: "B", schedulingTime: "2026-02", projectRuntimeStatus: "RUNNING", workContent: "需求与迭代", weightRate: 70 }],
      bda: [],
      study: [{ courseName: "通用力·沟通", mentorName: "—", completeStatus: "进行中", score: "—" }],
    },
  };

  function getList() {
    return list.slice();
  }

  function getById(id) {
    var n = Number(id);
    var row = list.filter(function (r) { return r.id === n; })[0];
    if (!row) return null;
    var detail = details[n] || {
      desc: row.showSeason,
      workRole: "GENERAL",
      projects: [{ projectName: "（Demo）季度项目", projectCode: "P-DEMO", projectLevel: "B", schedulingTime: "—", projectRuntimeStatus: "RUNNING", workContent: "主要工作摘要", weightRate: 100 }],
      bda: [],
      study: [{ courseName: "（Demo）培训课程", mentorName: "—", completeStatus: "已完成", score: 85 }],
    };
    return Object.assign({}, row, detail);
  }

  function mineRows() {
    return list.filter(function (r) { return r.employeeId === CURRENT_EMPLOYEE_ID; });
  }

  function approveRows() {
    return list.filter(function (r) {
      return r.currentApproverId === CURRENT_EMPLOYEE_ID && r.approveStatus !== "FINISHED";
    });
  }

  global.QuarterlyPerfMock = {
    CURRENT_EMPLOYEE_ID: CURRENT_EMPLOYEE_ID,
    CURRENT_NAME: CURRENT_NAME,
    getList: getList,
    getById: getById,
    mineRows: mineRows,
    approveRows: approveRows,
    notInList: notInList,
    gradeLabel: gradeLabel,
    statusLabel: statusLabel,
    sourceLabel: function (s) { return s === "SELF" ? "本人" : "Leader"; },
  };
})(typeof window !== "undefined" ? window : this);
