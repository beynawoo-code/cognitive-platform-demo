(function () {
  var tabs = [
    ["prof", "专业", "home.html?tab=prof"],
    ["sperf", "绩效", "home.html?tab=sperf"],
    ["cbda", "CBDA案例", "home.html?tab=cbda"],
    ["course", "课程", "home.html?tab=course"],
    ["pub", "官方发布", "home.html?tab=pub"],
  ];
  var admin = [
    ["运营", [
      ["cognition", "提报内容管理", "cognition-manage.html"],
      ["publish", "发布内容管理", "publish-manage.html"],
      ["exam-manage", "考试管理", "exam-manage.html"],
      ["course", "课程管理", "course-manage.html"],
      ["theme", "考试主题管理", "exam-theme.html"],
      ["question", "试题管理", "question-manage.html"],
      ["topic", "话题管理", "topic-manage.html"],
      ["bda", "BDA管理", "bda-manage.html"],
      ["activity", "活动管理", "activity-manage.html"],
    ]],
    ["用户", [
      ["user", "用户管理", "user-manage.html"],
      ["stat", "提报统计", "statistical-report.html"],
      ["target", "目标管理", "target-manage.html"],
      ["promotion", "晋升分析台", "promotion-analysis.html"],
      ["performance", "季度绩效管理", "performance-manage.html"],
      ["s-perf", "绩效 S 管理", "s-perf-manage.html"],
    ]],
    ["成长", [["medal", "勋章管理", "medal-manage.html"]]],
    ["素材", [["material", "素材管理", "material-manage.html"]]],
    ["角色价值", [
      ["value", "价值点管理", "value-manage.html"],
      ["vp-record", "价值点记录", "vp-record.html"],
      ["green-rule", "点绿规则", "green-rule.html"],
    ]],
    ["考试", [["ai", "AI试题生成", "ai-question.html"]]],
    ["积分", [
      ["product", "商品管理", "product-manage.html"],
      ["redeem", "兑换订单", "redeem-order.html"],
      ["points", "积分明细", "points-details.html"],
    ]],
  ];

  function cls(on) { return on ? ' class="on"' : ""; }

  function portal() {
    var tab = document.body.dataset.tab || "";
    var active = document.body.dataset.active || "";
    var tabHtml = tabs.map(function (t) {
      return '<a href="' + t[2] + '"' + cls(tab === t[0]) + ">" + t[1] + "</a>";
    }).join("");
    return (
      '<header class="top">' +
        '<div class="brand-row">' +
          '<a class="brand" href="home.html"><span class="mark">认</span><span><b>认知平台</b><small>Cognition Platform</small></span></a>' +
          '<nav class="pill" aria-label="内容板块">' + tabHtml + "</nav>" +
        "</div>" +
        '<div class="search">搜索专业、案例、课程</div>' +
        '<div class="tools">' +
          '<details class="drop"><summary class="cta">提报</summary><div class="menu">' +
            '<a href="submit-bda.html">提报 BDA</a><a href="submit-material.html">提报素材</a><a href="submit-s.html">提报绩效 S</a><a href="update-s-mid.html">中期回顾</a><a href="update-s-final.html">最终结果</a><a href="s-leader-inbox.html">绩效 S 接收</a></div></details>' +
          '<a class="icon' + (active === "exam" ? " on" : "") + '" href="exam-home.html" aria-label="考试中心">考<i>考</i></a>' +
          '<a class="icon' + (active === "mall" ? " on" : "") + '" href="mall-home.html" aria-label="积分商城">积<i class="hot">积</i></a>' +
          '<a class="icon' + (active === "inbox" ? " on" : "") + '" href="inbox.html" aria-label="通知中心">讯<i class="bell">2</i></a>' +
          '<a class="user" href="me.html"><span class="avatar">吴</span>吴冰娜</a>' +
        "</div>" +
      "</header>"
    );
  }

  function side() {
    var active = document.body.dataset.active || "";
    var groups = admin.map(function (g) {
      var links = g[1].map(function (it) {
        return '<a href="' + it[2] + '"' + cls(active === it[0]) + ">" + it[1] + "</a>";
      }).join("");
      return '<div class="g">' + g[0] + "</div>" + links;
    }).join("");
    return '<aside class="side"><a class="brand" href="../index.html"><span class="mark">认</span><span><b>认知后台</b><small>Admin</small></span></a>' + groups +
      '<div class="g">子页代表</div>' +
      '<a href="jpc-detail.html"' + cls(active === "jpc") + ">JPC详情</a>" +
      '<a href="share-detail.html"' + cls(active === "share") + ">分享详情</a>" +
      '<a href="publish-create.html"' + cls(active === "publish-create") + ">新建发布</a>" +
      '<a href="exam-edit.html"' + cls(active === "exam-edit") + ">考试编辑</a></aside>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var slot = document.getElementById("chrome");
    if (!slot) return;
    slot.innerHTML = document.body.dataset.shell === "admin" ? side() : portal();
  });
})();
