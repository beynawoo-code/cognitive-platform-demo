(function (global) {
  var ROUNDS = [
    {
      id: "r3",
      title: "第三轮",
      range: "2026-02-01 ~ 2026-05-01",
      vps: ["竞品分析", "需求价值分析", "系统框架规划"],
      mentors: ["陈工", "刘工", "赵工"],
      readCount: 9,
      summarySubmitted: true,
      summary: {
        submittedAt: "2026-03-28",
        body:
          "本轮重点补齐竞品分析与需求价值判读：完成 3 篇核心素材精读，并在系统框架规划上输出了分层草案。下一轮将继续深化框架评审要点。",
        feedback: [
          {
            mentor: "陈工",
            at: "2026-04-01",
            text: "总结结构清晰；建议补充竞品结论如何反哺排期的 1 个实例。",
          },
          {
            mentor: "赵工",
            at: "2026-04-02",
            text: "价值四象限运用到位，可再写清与业务方对齐的验收口径。",
          },
        ],
      },
      examScores: [
        { score: 78, at: "2026-02-18" },
        { score: 86, at: "2026-03-22" },
      ],
      examId: "lp-exam-r3",
      status: "进行中",
    },
    {
      id: "r2",
      title: "第二轮",
      range: "2025-08-01 ~ 2026-01-31",
      vps: ["年度项目规划", "用户痛点分析"],
      mentors: ["陈工", "赵工"],
      readCount: 11,
      summarySubmitted: true,
      summary: {
        submittedAt: "2026-01-20",
        body: "围绕年度项目规划与用户痛点，完成规划模板套用与 2 次访谈复盘，输出痛点清单 v2。",
        feedback: [
          { mentor: "陈工", at: "2026-01-22", text: "规划章节完整，风险预留栏位建议再量化。" },
          { mentor: "赵工", at: "2026-01-23", text: "痛点与价值点对齐良好，可保留为案例。" },
        ],
      },
      examScores: [
        { score: 88, at: "2025-10-05" },
        { score: 92, at: "2025-12-12" },
      ],
      examId: "lp-exam-r2",
      status: "已结束",
    },
    {
      id: "r1",
      title: "第一轮",
      range: "2025-02-01 ~ 2025-07-31",
      vps: ["竞品分析", "用户痛点分析", "年度项目规划"],
      mentors: ["陈工", "刘工"],
      readCount: 14,
      summarySubmitted: false,
      summary: null,
      examScores: [
        { score: 82, at: "2025-04-08" },
        { score: 88, at: "2025-06-20" },
        { score: 91, at: "2025-07-15" },
      ],
      examId: "lp-exam-r1",
      status: "已结束",
    },
  ];

  function rounds() {
    return ROUNDS.slice();
  }

  function roundById(id) {
    return ROUNDS.filter(function (r) { return r.id === id; })[0] || null;
  }

  function summaryUrlForRound(round, mode) {
    var m = mode || "view";
    return "learning-plan-summary.html?round=" + encodeURIComponent(round.id) + "&mode=" + encodeURIComponent(m);
  }

  function profUrlForRound(round) {
    var q = (round.vps || []).map(function (v) { return encodeURIComponent(v); }).join(",");
    return "home.html?tab=prof&vp=" + q;
  }

  function profUrlForVp(vp) {
    return "home.html?tab=prof&vp=" + encodeURIComponent(vp);
  }

  function examKey(round) {
    return round.examId || round.id || "round";
  }

  function examIntroUrlForRound(round) {
    var key = examKey(round);
    var title = (round.title || "学习计划") + " · 轮次考试";
    return (
      "exam-intro.html?round=" +
      encodeURIComponent(key) +
      "&title=" +
      encodeURIComponent(title)
    );
  }

  function examResultUrlForRound(round, score, attemptIndex) {
    var key = examKey(round);
    var q = "round=" + encodeURIComponent(key);
    if (score != null) q += "&score=" + encodeURIComponent(String(score));
    else if (round.examScore != null) q += "&score=" + encodeURIComponent(String(round.examScore));
    if (attemptIndex != null) q += "&attempt=" + encodeURIComponent(String(attemptIndex));
    return "exam-result.html?" + q;
  }

  function examAttemptsForRound(round) {
    if (round.examScores && round.examScores.length) {
      return round.examScores.map(function (e) {
        if (typeof e === "number") return { score: e };
        return { score: e.score, at: e.at };
      });
    }
    if (round.examScore != null) return [{ score: round.examScore }];
    return [];
  }

  function averageScore(attempts) {
    if (!attempts || !attempts.length) return null;
    var sum = 0;
    attempts.forEach(function (a) {
      sum += Number(a.score) || 0;
    });
    return sum / attempts.length;
  }

  global.LearningPlanRoundsMock = {
    rounds: rounds,
    profUrlForRound: profUrlForRound,
    profUrlForVp: profUrlForVp,
    examIntroUrlForRound: examIntroUrlForRound,
    examResultUrlForRound: examResultUrlForRound,
    examAttemptsForRound: examAttemptsForRound,
    averageScore: averageScore,
    roundById: roundById,
    summaryUrlForRound: summaryUrlForRound,
  };
})(typeof window !== "undefined" ? window : global);
