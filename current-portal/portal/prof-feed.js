/**
 * 专业 feed 渲染：消费 ProfFeedMock（线上一屏截图口径）。
 */
(function (global) {
  var CAT_CLASS = { 1: "cat-1", 2: "cat-2", 3: "cat-3", 4: "cat-4" };
  var CAT_NAME = { 1: "理论", 2: "体系", 3: "案例", 4: "认知" };

  function stripHtml(html) {
    return String(html || "")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function mapProfListItem(raw) {
    var category = Number(raw.materialCategory) || 1;
    var interaction = raw.interaction || {};
    var contentHtml = raw.content || "";
    var demo = raw._demo || {};
    var valuePoints = (raw.valuePoints || []).map(function (v) {
      return { id: Number(v.id), name: v.name || "" };
    });
    return {
      id: raw.id,
      title: raw.title || "未命名素材",
      contentHtml: contentHtml,
      summary: stripHtml(contentHtml),
      categoryName: raw.materialCategoryName || CAT_NAME[category] || "",
      materialCategory: category,
      authorName: raw.author || "匿名",
      department: demo.deptLine || raw.positionName || "",
      time: raw.timeRange || "",
      valuePoints: valuePoints,
      viewCount: Number(interaction.viewCount ?? raw.viewCount ?? 0),
      likeCount: Number(interaction.likeCount ?? raw.likeCount ?? 0),
      dislikeCount: Number(interaction.dislikeCount ?? 0),
      favoriteCount: Number(interaction.favoriteCount ?? 0),
      commentCount: Number(interaction.commentCount ?? 0),
      positionFilter: demo.positionFilter || "",
      sortScore: Number(raw.score ?? demo.sortScore ?? 0),
      sortTime: Number(demo.sortTime ?? 0),
    };
  }

  function avatarChar(name) {
    var s = String(name || "").trim();
    return s ? s.charAt(0) : "?";
  }

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  }

  function valuePointTagsHtml(valuePoints) {
    return (valuePoints || [])
      .map(function (vp) {
        return '<span class="chip prof-vp-tag">' + escapeHtml(vp.name) + "</span>";
      })
      .join("");
  }

  function buildCard(item) {
    var article = document.createElement("article");
    article.className = "card pcard";
    article.setAttribute("data-panel", "prof");
    article.setAttribute("data-feed-key", "prof-" + item.id);
    article.setAttribute("data-cat", String(item.materialCategory));
    article.setAttribute("data-pos", item.positionFilter || "");
    article.setAttribute("data-vp", item.valuePoints[0] ? item.valuePoints[0].name : "");
    article.setAttribute("data-score", String(item.sortScore));
    article.setAttribute("data-time", String(item.sortTime));
    article.setAttribute("data-like", String(item.likeCount));
    article.setAttribute("data-comment", String(item.commentCount));
    article.setAttribute("data-view", String(item.viewCount));
    article.setAttribute("data-dislike", String(item.dislikeCount));
    article.setAttribute("data-favorite", String(item.favoriteCount));

    var metaLine = escapeHtml(item.department);
    if (item.time) metaLine += " · " + escapeHtml(item.time);
    var catCls = CAT_CLASS[item.materialCategory] || "cat-1";
    article.innerHTML =
      '<div class="author"><span class="avatar">' +
      escapeHtml(avatarChar(item.authorName)) +
      "</span><div><b>" +
      escapeHtml(item.authorName) +
      "</b><span>" +
      metaLine +
      "</span></div></div>" +
      "<h3>" +
      escapeHtml(item.title) +
      "</h3>" +
      '<div class="prof-excerpt-panel excerpt">' +
      '<p class="prof-excerpt-body">' +
      '<span class="prof-excerpt-text">' +
      escapeHtml(item.summary) +
      "</span>" +
      '<button type="button" class="prof-expand-link expand" aria-expanded="false">' +
      '<span class="prof-expand-dots">...</span><span class="prof-expand-label">展开全文</span>' +
      "</button></p></div>" +
      '<div class="prof-card-meta-row">' +
      '<div class="prof-card-tags">' +
      '<span class="pill-cat ' +
      catCls +
      ' prof-card-cat">' +
      escapeHtml(item.categoryName) +
      "</span>" +
      valuePointTagsHtml(item.valuePoints) +
      "</div></div>" +
      '<div class="meta-row" hidden aria-hidden="true"></div>';

    return article;
  }

  function fillSelect(select, options, valueKey, labelKey, allLabel) {
    if (!select) return;
    select.innerHTML = "";
    var optAll = document.createElement("option");
    optAll.value = "";
    optAll.textContent = allLabel || "全部";
    select.appendChild(optAll);
    options.forEach(function (row) {
      var opt = document.createElement("option");
      opt.value = String(row[valueKey] != null ? row[valueKey] : row.name);
      opt.textContent = row[labelKey] || row.name;
      select.appendChild(opt);
    });
  }

  function renderProfRailFilters() {
    if (!global.ProfFeedMock) return;
    var rail = document.querySelector('.rail[data-panel="prof"]');
    if (!rail) return;
    var posSel = rail.querySelector('select[data-key="pos"]');
    var vpSel = rail.querySelector("select.prof-vp-select");
    var chips = rail.querySelector(".prof-vp-chips");
    fillSelect(
      posSel,
      ProfFeedMock.positionOptions().map(function (p) {
        return { name: p.positionName || p.name };
      }),
      "name",
      "name",
      "全部"
    );
    if (posSel && ProfFeedMock.defaultPosition) {
      posSel.value = ProfFeedMock.defaultPosition();
    }
    fillSelect(
      vpSel,
      ProfFeedMock.valuePointOptions().map(function (p) {
        return { name: p.name };
      }),
      "name",
      "name",
      "全部"
    );
    if (chips) {
      var html = '<button type="button" data-value="" class="on">全部</button>';
      ProfFeedMock.valuePointChips().forEach(function (name) {
        html += '<button type="button" data-value="' + escapeHtml(name) + '">' + escapeHtml(name) + "</button>";
      });
      chips.innerHTML = html;
      chips.setAttribute("data-value", "");
    }
    document.querySelectorAll(".prof-nav-count").forEach(function (el) {
      el.textContent = String(ProfFeedMock.tabFeedCount());
    });
  }

  function renderProfHotList() {
    if (!global.ProfFeedMock) return;
    var list = document.querySelector(".prof-hot-list");
    if (!list) return;
    list.innerHTML = ProfFeedMock.hotTitles()
      .map(function (title, i) {
        return (
          '<li><a href="home.html?tab=prof"><span class="hn">' +
          (i + 1) +
          "</span><span>" +
          escapeHtml(title) +
          "</span></a></li>"
        );
      })
      .join("");
  }

  function rankRowHtml(row, i, unit) {
    var top = i < 3 ? "top" : "";
    var nCls = i === 0 ? " n1" : i === 1 ? " n2" : i === 2 ? " n3" : "";
    return (
      '<li class="' +
      top +
      '"><span class="n' +
      nCls +
      '">' +
      (i + 1) +
      '</span><span class="avatar">' +
      escapeHtml(row.avatar || avatarChar(row.name)) +
      "</span><div><b>" +
      escapeHtml(row.name) +
      "</b><span>" +
      escapeHtml(row.dept) +
      "</span></div><em>" +
      row.count +
      "<small>" +
      unit +
      "</small></em></li>"
    );
  }

  function renderProfRanking() {
    if (!global.ProfFeedMock) return;
    var rank = ProfFeedMock.ranking();
    var authors = document.querySelector(".prof-rank-authors ol");
    var learners = document.querySelector(".prof-rank-learners ol");
    if (authors) {
      authors.innerHTML = rank.authors.map(function (r, i) {
        return rankRowHtml(r, i, "提报");
      }).join("");
    }
    if (learners) {
      learners.innerHTML = rank.learners.map(function (r, i) {
        return rankRowHtml(r, i, "浏览");
      }).join("");
    }
  }

  function renderFeedBlock() {
    var mount = document.querySelector(".prof-feed-cards") || document.querySelector('.feed-block[data-panel="prof"]');
    if (!mount || !global.ProfFeedMock) return;
    mount.innerHTML = "";
    ProfFeedMock.page().list.forEach(function (raw) {
      mount.appendChild(buildCard(mapProfListItem(raw)));
    });
  }

  function mount() {
    renderProfRailFilters();
    renderProfHotList();
    renderProfRanking();
    renderFeedBlock();
  }

  global.ProfFeed = {
    mount: mount,
    mapProfListItem: mapProfListItem,
    buildCard: buildCard,
  };
})(typeof window !== "undefined" ? window : this);
