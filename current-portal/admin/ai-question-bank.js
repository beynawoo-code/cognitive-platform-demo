(function (global) {
  var KEY = "cognition-ai-question-v1";

  var batches = [
    {
      id: "sf-202608",
      valuePoint: "系统框架规划",
      material: "BP 全预算2.0是如何做系统框架规划",
      author: "吴冰娜",
      batchLabel: "2026-08-12 首批",
      questions: [
        {
          stem: "BP 评审时，系统框架应先核对什么？",
          options: ["模块是否覆盖目标", "界面配色是否统一", "迭代是否已经排满", "文案是否已经定稿"],
          answer: 0
        },
        {
          stem: "需求超出已锁定的系统边界时，应怎么处理？",
          options: ["直接放进当前迭代", "先改代码再补评审", "回到 BP 评审", "由开发自行取舍"],
          answer: 2
        },
        {
          stem: "全预算 2.0 用什么约束后续 PRD 的范围？",
          options: ["一页架构图", "周报篇幅", "会议签到表", "个人待办"],
          answer: 0
        },
        {
          stem: "目标定义阶段需要对齐哪些口径？",
          options: ["销量、价格、成本", "只对齐出勤", "只对齐界面稿", "只对齐用例条数"],
          answer: 0
        },
        {
          stem: "系统边界锁定之后，边界内允许做的是什么？",
          options: ["需求细化", "随意新增一级域", "跳过模块清单", "取消 BP 评审"],
          answer: 0
        }
      ]
    },
    {
      id: "sf-202610",
      valuePoint: "系统框架规划",
      material: "如何体系化建立系统框架",
      author: "吴冰娜",
      batchLabel: "2026-10-20 加题",
      questions: [
        {
          stem: "体系化建立系统框架，应从哪里开始拆？",
          options: ["业务域", "按钮颜色", "个人收藏", "考勤记录"],
          answer: 0
        },
        {
          stem: "能被 BP 和迭代共同引用的框架层次是什么？",
          options: ["域、模块、接口", "只有一张总图", "只有接口文档", "只有会议纪要"],
          answer: 0
        },
        {
          stem: "一级域定下来之后，下一步是什么？",
          options: ["定核心对象，再拆服务边界和数据归属", "直接写完全部页面", "先统计浏览量", "先冻结所有需求"],
          answer: 0
        }
      ]
    },
    {
      id: "ca-202609",
      valuePoint: "竞品分析",
      material: "竞品拆解记录",
      author: "陈工",
      batchLabel: "2026-09-01 首批",
      questions: [
        {
          stem: "拆竞品时，比较维度应先写清什么？",
          options: ["用户任务和关键路径", "只记录 Logo", "只记录成立年份", "只记录办公地址"],
          answer: 0
        },
        {
          stem: "竞品功能更多时，应凭什么决定做不做？",
          options: ["是否服务本价值点要解决的任务", "功能多就全部照做", "功能少就全部不做", "只看对方定价"],
          answer: 0
        },
        {
          stem: "拆解记录里的证据应落在哪里？",
          options: ["对应的界面、路径或用户原话", "只写「更好」", "只写个人印象", "只贴无关截图"],
          answer: 0
        },
        {
          stem: "竞品结论要能复用，记录里应包含什么？",
          options: ["差异、原因、可借鉴动作", "只有胜负", "只有截图数量", "只有访问日期"],
          answer: 0
        },
        {
          stem: "同事结论不一致时，应先核对什么？",
          options: ["是否比的是同一任务和同一路径", "谁先提交", "谁的职级更高", "谁写的字数更多"],
          answer: 0
        },
        {
          stem: "这次拆解生成的题目应挂在哪个价值点？",
          options: ["竞品分析", "与本次拆解无关的价值点", "每个价值点各抄一份", "不挂价值点"],
          answer: 0
        }
      ]
    }
  ];

  function readConfirmed() {
    try {
      var raw = JSON.parse(localStorage.getItem(KEY) || "[]");
      return Array.isArray(raw) ? raw.filter(function (id) { return typeof id === "string"; }) : [];
    } catch (err) {
      return [];
    }
  }

  function isConfirmed(id) {
    return readConfirmed().indexOf(id) >= 0;
  }

  function confirm(id) {
    var ids = readConfirmed();
    if (ids.indexOf(id) >= 0) return true;
    ids.push(id);
    localStorage.setItem(KEY, JSON.stringify(ids));
    return true;
  }

  function confirmedQuestions() {
    var rows = [];
    batches.forEach(function (batch) {
      if (!isConfirmed(batch.id)) return;
      batch.questions.forEach(function (question) {
        rows.push({
          stem: question.stem,
          source: "AI · " + batch.valuePoint + " · " + batch.material,
          status: "启用"
        });
      });
    });
    return rows;
  }

  global.AiQuestionBank = {
    batches: batches,
    isConfirmed: isConfirmed,
    confirm: confirm,
    confirmedQuestions: confirmedQuestions
  };
})(window);
