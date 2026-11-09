(function (global) {
  var KEY = "cognition-medals-v1";

  /** 与后台「勋章管理 · 年度铭牌」一致的 7 类（静态模拟） */
  var CATALOG = [
    { id: "np2025-bda-screen", year: 2025, name: "BDA霸屏侠", emoji: "🦸", tone: "#fde68a", issued: 9 },
    { id: "np2025-quiz-assassin", year: 2025, name: "出题刺客", emoji: "🐝", tone: "#e9d5ff", issued: 7 },
    { id: "np2025-influence", year: 2025, name: "年度影响力专家", emoji: "🤖", tone: "#bfdbfe", issued: 8 },
    { id: "np2025-answer-king", year: 2025, name: "精准答题王", emoji: "👑", tone: "#fbcfe8", issued: 6 },
    { id: "np2025-bda-model", year: 2025, name: "BDA模范生", emoji: "🌐", tone: "#a7f3d0", issued: 10 },
    { id: "np2025-share", year: 2025, name: "分享达人", emoji: "🏆", tone: "#fed7aa", issued: 8 },
    { id: "np2025-contrib", year: 2025, name: "年度贡献专家", emoji: "🎓", tone: "#bbf7d0", issued: 10 },
  ];

  function blank() {
    return { earned: [], updatedAt: null };
  }

  function seed() {
    return {
      earned: [
        "np2025-share",
        "np2025-bda-model",
        "np2025-contrib",
        "np2025-influence",
      ],
      updatedAt: "2025-12-20T10:00:00.000Z",
    };
  }

  function loadUser() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var state = JSON.parse(raw);
        if (!state.earned) state.earned = [];
        return state;
      }
    } catch (e) { /* ignore */ }
    var seeded = seed();
    saveUser(seeded);
    return seeded;
  }

  function saveUser(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function earnedIds(state) {
    return (state && state.earned) ? state.earned.slice() : [];
  }

  function earnedCount(state) {
    return earnedIds(state).length;
  }

  function catalogById(id) {
    return CATALOG.filter(function (m) { return m.id === id; })[0] || null;
  }

  function totalIssued() {
    return CATALOG.reduce(function (n, m) { return n + (m.issued || 0); }, 0);
  }

  function tileHtml(m, lit) {
    var cls = "me-nameplate-tile" + (lit ? " lit" : " locked");
    return (
      '<li class="' + cls + '" title="' + m.year + " · " + m.name + (lit ? "（已获得）" : "（未获得）") + '">' +
      '<span class="me-nameplate-art" style="background:' + m.tone + '">' + m.emoji + "</span>" +
      '<span class="me-nameplate-label">' + m.year + " · " + m.name + "</span>" +
      "</li>"
    );
  }

  /** 个人中心第三卡：仅展示已点亮（已获得） */
  function meCardMarkup(state) {
    state = state || loadUser();
    var set = {};
    earnedIds(state).forEach(function (id) { set[id] = true; });
    var list = CATALOG.filter(function (m) { return set[m.id]; });
    if (!list.length) {
      return '<p class="me-medals-empty">暂无已获得勋章或铭牌。达成规则后由后台授予，将在此展示。</p>';
    }
    return '<ul class="me-nameplate-grid me-nameplate-grid--profile">' + list.map(function (m) { return tileHtml(m, true); }).join("") + "</ul>";
  }

  /** 勋章墙：7 类全部，已获得高亮 */
  function wallMarkup(state) {
    state = state || loadUser();
    var set = {};
    earnedIds(state).forEach(function (id) { set[id] = true; });
    return (
      '<p class="me-medals-wall-meta">勋章墙 · ' + CATALOG.length + " 类 · 已获得 " + earnedCount(state) + " 枚</p>" +
      '<ul class="me-nameplate-grid me-nameplate-grid--wall">' +
      CATALOG.map(function (m) { return tileHtml(m, !!set[m.id]); }).join("") +
      "</ul>"
    );
  }

  /** 后台勋章管理：统计 + 年度铭牌列表 */
  function adminMarkup() {
    var issued = totalIssued();
    var pending = 0;
    return (
      '<div class="medal-admin-stats">' +
      '<div class="medal-admin-stat"><span>勋章总数</span><b>' + CATALOG.length + "</b><small>含年度铭牌 " + CATALOG.length + " 类</small></div>" +
      '<div class="medal-admin-stat"><span>已获得勋章</span><b>' + issued + "</b><small>累计发放人次（模拟）</small></div>" +
      '<div class="medal-admin-stat"><span>待解锁勋章</span><b>' + pending + "</b><small>规则未达成</small></div>" +
      "</div>" +
      '<h2 class="medal-admin-section">年度铭牌 · ' + CATALOG.length + " 类</h2>" +
      '<ul class="medal-admin-grid">' +
      CATALOG.map(function (m) {
        return (
          '<li class="medal-admin-card">' +
          '<span class="me-nameplate-art medal-admin-art" style="background:' + m.tone + '">' + m.emoji + "</span>" +
          "<b>" + m.year + " · " + m.name + "</b>" +
          '<span class="medal-admin-meta">已发放 ' + m.issued + " 人次</span>" +
          '<span class="medal-admin-actions"><a href="#">编辑</a> · <a href="#">授予</a></span>' +
          "</li>"
        );
      }).join("") +
      "</ul>"
    );
  }

  global.CognitionMedals = {
    KEY: KEY,
    CATALOG: CATALOG,
    loadUser: loadUser,
    saveUser: saveUser,
    earnedCount: earnedCount,
    catalogById: catalogById,
    meCardMarkup: meCardMarkup,
    wallMarkup: wallMarkup,
    adminMarkup: adminMarkup,
    totalIssued: totalIssued,
  };
})(window);
