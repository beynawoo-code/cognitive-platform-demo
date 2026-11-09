/**
 * 专业 Tab 假数据 — 参考线上一屏（软件产品经理 / 系统框架规划专题，2026-10 截图）。
 * 字段仍兼容 digitize JpcCognitionAppVo + 新仓 mapProf 扩展。
 */
(function (global) {
  var PAGE_LIST = [
    {
      id: 92001,
      title: "如何规避项目需求超出系统框架",
      content:
        "<p>BP 项目里，目标定义阶段就要把销量、价格、成本口径对齐，否则需求会在迭代中不断「长出来」。</p><p>做法是：先锁定系统边界与模块清单，再允许在边界内做需求细化；超出边界的，必须回到 BP 评审而不是直接进迭代。</p>",
      author: "王兴卓",
      avatar: "",
      likeCount: 1,
      viewCount: 78,
      score: 85,
      timeRange: "2 天前",
      positionName: "资深软件产品经理",
      source: "用户提报",
      sourceTag: { id: 1, name: "用户提报" },
      sectorTags: [],
      materialCategory: 4,
      materialCategoryName: "认知",
      valuePoints: [{ id: 204, name: "系统框架规划" }],
      interaction: {
        viewCount: 78,
        likeCount: 1,
        dislikeCount: 0,
        commentCount: 0,
        favoriteCount: 0,
        isLike: 0,
        isDislike: 0,
        isCollect: 0,
      },
      _demo: {
        positionFilter: "软件产品经理",
        deptLine: "（DP）数字平台-资深软件产品经理",
        sortTime: 4,
      },
    },
    {
      id: 91988,
      title: "BP 全预算2.0是如何做系统框架规划",
      content:
        "<p>全预算 2.0 把「目标—能力—系统模块」三层结构写进模板，BP 评审时先看模块是否覆盖目标，再看需求是否落在模块内。</p><p>案例重点：如何用一页架构图约束后续 PRD 范围。</p>",
      author: "王兴卓",
      avatar: "",
      likeCount: 3,
      viewCount: 112,
      score: 82,
      timeRange: "3 天前",
      positionName: "资深软件产品经理",
      materialCategory: 3,
      materialCategoryName: "案例",
      valuePoints: [{ id: 204, name: "系统框架规划" }],
      interaction: {
        viewCount: 112,
        likeCount: 3,
        dislikeCount: 0,
        commentCount: 1,
        favoriteCount: 0,
        isLike: 0,
        isDislike: 0,
        isCollect: 0,
      },
      _demo: {
        positionFilter: "软件产品经理",
        deptLine: "（DP）数字平台-资深软件产品经理",
        sortTime: 3,
      },
    },
    {
      id: 91970,
      title: "如何体系化建立系统框架",
      content:
        "<p>从业务域拆分开始，先定一级域与核心对象，再往下拆服务边界与数据归属。</p><p>体系化不是一张大图，而是「域—模块—接口」三层都能被 BP 和迭代引用。</p>",
      author: "王兴卓",
      avatar: "",
      likeCount: 5,
      viewCount: 156,
      score: 80,
      timeRange: "5 天前",
      positionName: "资深软件产品经理",
      materialCategory: 2,
      materialCategoryName: "体系",
      valuePoints: [{ id: 204, name: "系统框架规划" }],
      interaction: {
        viewCount: 156,
        likeCount: 5,
        dislikeCount: 0,
        commentCount: 2,
        favoriteCount: 1,
        isLike: 0,
        isDislike: 0,
        isCollect: 0,
      },
      _demo: {
        positionFilter: "软件产品经理",
        deptLine: "（DP）数字平台-资深软件产品经理",
        sortTime: 2,
      },
    },
    {
      id: 91940,
      title: "需求价值分析怎么支撑框架裁剪",
      content:
        "<p>每个需求带价值假设与验证方式；框架裁剪时，优先保留能验证 BP 目标的关键路径需求。</p>",
      author: "罗振琨",
      avatar: "",
      likeCount: 8,
      viewCount: 203,
      score: 78,
      timeRange: "1 周前",
      positionName: "软件产品经理",
      materialCategory: 1,
      materialCategoryName: "理论",
      valuePoints: [{ id: 203, name: "需求挖掘" }],
      interaction: {
        viewCount: 203,
        likeCount: 8,
        dislikeCount: 0,
        commentCount: 3,
        favoriteCount: 2,
        isLike: 0,
        isDislike: 0,
        isCollect: 0,
      },
      _demo: {
        positionFilter: "软件产品经理",
        deptLine: "（DP）数字平台-软件产品经理",
        sortTime: 1,
      },
    },
  ];

  var HOT_TITLES = [
    "当我们在做VOC时，怎么拆目标",
    "当我接了一个新项目时，该先问什么",
    "当我们在做VOC时，怎么对齐客户",
    "当我们在做VOC时，怎么复盘",
    "当我们在做VOC时，怎么沉淀",
    "硬件产品需求常用的分析方法",
    "如何用流程优化降低人工成本",
    "如何做出一份合格的DFMEA",
    "开柜产品Costdown的常见路径",
    "作为一个DQE，怎么系统地看问题",
  ];

  var VALUE_POINT_OPTIONS = [
    { id: 201, name: "年度项目规划" },
    { id: 202, name: "用户痛点分析" },
    { id: 203, name: "需求挖掘" },
    { id: 204, name: "系统框架规划" },
  ];

  var VALUE_POINT_CHIPS = ["年度项目规划", "需求挖掘", "用户痛点分析"];

  var POSITION_OPTIONS = [{ id: 51, positionName: "软件产品经理" }];

  var DEFAULT_POSITION = "软件产品经理";

  var TAB_FEED_COUNT = 32;

  var RANKING = {
    authors: [
      { name: "罗振琨", dept: "（DP）数字平台", count: 16, avatar: "罗" },
      { name: "谢佳元", dept: "（DP）数字平台", count: 11, avatar: "谢" },
      { name: "汤仲隆", dept: "（DP）数字平台", count: 9, avatar: "汤" },
      { name: "王兴卓", dept: "（DP）数字平台", count: 8, avatar: "王" },
      { name: "崔佳元", dept: "（DP）数字平台", count: 7, avatar: "崔" },
    ],
    learners: [
      { name: "王言滚", dept: "（ABU）数字商业", count: 828, avatar: "王" },
      { name: "刘先辉", dept: "（ABU）数字商业", count: 749, avatar: "刘" },
      { name: "李立光", dept: "（ABU）数字商业", count: 473, avatar: "李" },
      { name: "张春秀", dept: "（ABU）家电事业群", count: 320, avatar: "张" },
      { name: "林敏", dept: "（ABU）家电事业群", count: 285, avatar: "林" },
    ],
  };

  global.ProfFeedMock = {
    page: function () {
      return {
        list: PAGE_LIST.slice(),
        total: PAGE_LIST.length,
        pageNum: 1,
        pageSize: 10,
        pages: 1,
        hasNextPage: false,
      };
    },
    hotTitles: function () {
      return HOT_TITLES.slice();
    },
    valuePointOptions: function () {
      return VALUE_POINT_OPTIONS.slice();
    },
    valuePointChips: function () {
      return VALUE_POINT_CHIPS.slice();
    },
    positionOptions: function () {
      return POSITION_OPTIONS.slice();
    },
    defaultPosition: function () {
      return DEFAULT_POSITION;
    },
    tabFeedCount: function () {
      return TAB_FEED_COUNT;
    },
    ranking: function () {
      return {
        authors: RANKING.authors.slice(),
        learners: RANKING.learners.slice(),
      };
    },
  };
})(typeof window !== "undefined" ? window : this);
