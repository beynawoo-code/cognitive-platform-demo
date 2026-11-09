(function (global) {
  var CARD_SEL = ".feed-interact-card";

  function escapeText(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  }

  function escapeAttr(s) {
    return escapeText(s).replace(/'/g, "&#39;");
  }

  function formatCommentAt(iso) {
    if (!iso) return "";
    try {
      var d = new Date(iso);
      if (isNaN(d.getTime())) return "";
      return (d.getMonth() + 1) + "月" + d.getDate() + "日";
    } catch (e) {
      return "";
    }
  }

  function feedIcon(name) {
    var s = ' class="feed-ib-ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
    if (name === "eye") {
      return "<svg" + s + "><path d=\"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg>";
    }
    if (name === "message") {
      return "<svg" + s + "><path d=\"M7.9 20A9 9 0 1 0 4 16.1L2 22Z\"/></svg>";
    }
    if (name === "thumb-up") {
      return "<svg" + s + "><path d=\"M7 10v12\"/><path d=\"M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z\"/></svg>";
    }
    if (name === "thumb-down") {
      return "<svg" + s + "><path d=\"M17 14V2\"/><path d=\"M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z\"/></svg>";
    }
    if (name === "bookmark") {
      return "<svg" + s + "><path d=\"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z\"/></svg>";
    }
    return "";
  }

  function emptyEng() {
    return {
      views: 0,
      likes: 0,
      dislikes: 0,
      favoriteCount: 0,
      liked: false,
      disliked: false,
      favorited: false,
      comments: [],
    };
  }

  function engFromCard(card) {
    return {
      views: Number(card.getAttribute("data-view")) || 0,
      likes: Number(card.getAttribute("data-like")) || 0,
      dislikes: Number(card.getAttribute("data-dislike")) || 0,
      favoriteCount: Number(card.getAttribute("data-favorite")) || 0,
      seedCommentCount: Number(card.getAttribute("data-comment")) || 0,
      comments: [],
      liked: false,
      disliked: false,
      favorited: false,
    };
  }

  function commentCountOf(eng) {
    var n = (eng.comments || []).length;
    if (n) return n;
    return Number(eng.seedCommentCount) || 0;
  }

  function createStore(storageKey, extraSeed) {
    function load() {
      var seed = extraSeed || {};
      try {
        var raw = localStorage.getItem(storageKey);
        if (raw) {
          var saved = JSON.parse(raw);
          var changed = false;
          Object.keys(seed).forEach(function (k) {
            if (!saved[k]) {
              saved[k] = seed[k];
              changed = true;
            }
          });
          if (changed) save(saved);
          return saved;
        }
      } catch (e) {}
      if (Object.keys(seed).length) {
        save(seed);
        return seed;
      }
      return {};
    }

    function save(data) {
      localStorage.setItem(storageKey, JSON.stringify(data));
    }

    function forKey(all, key, cardFallback) {
      if (!all[key]) {
        all[key] = cardFallback ? Object.assign(emptyEng(), cardFallback) : emptyEng();
        save(all);
      }
      var row = all[key];
      if (!row.comments) row.comments = [];
      if (row.views == null) row.views = 0;
      if (row.likes == null) row.likes = 0;
      if (row.dislikes == null) row.dislikes = 0;
      if (row.favoriteCount == null) row.favoriteCount = 0;
      if (row.liked === undefined) row.liked = false;
      if (row.disliked === undefined) row.disliked = false;
      if (row.favorited === undefined) row.favorited = false;
      return row;
    }

    return { load: load, save: save, forKey: forKey };
  }

  function interactionBarHtml(eng) {
    var likes = Number(eng.likes) || 0;
    var dislikes = Number(eng.dislikes) || 0;
    var favs = Number(eng.favoriteCount) || 0;
    var commentCount = commentCountOf(eng);
    var likeCls = eng.liked ? " on-like" : "";
    var dislikeCls = eng.disliked ? " on-dislike" : "";
    var favCls = eng.favorited ? " on-fav" : "";
    return '<div class="feed-interaction-bar" role="group" aria-label="互动">' +
      '<button type="button" class="feed-ib-btn feed-act-like' + likeCls + '" aria-label="有用 ' + likes + '" aria-pressed="' + (eng.liked ? "true" : "false") + '">' +
      feedIcon("thumb-up") + '<span class="feed-like-count">' + likes + "</span></button>" +
      '<button type="button" class="feed-ib-btn feed-act-dislike' + dislikeCls + '" aria-label="一般 ' + dislikes + '" aria-pressed="' + (eng.disliked ? "true" : "false") + '">' +
      feedIcon("thumb-down") + '<span class="feed-dislike-count">' + dislikes + "</span></button>" +
      '<button type="button" class="feed-ib-btn feed-act-fav' + favCls + '" aria-label="收藏 ' + favs + '" aria-pressed="' + (eng.favorited ? "true" : "false") + '">' +
      feedIcon("bookmark") + '<span class="feed-fav-count">' + favs + "</span></button>" +
      '<button type="button" class="feed-ib-btn feed-act-comment" aria-label="评论 ' + commentCount + '">' +
      feedIcon("message") + '<span class="feed-comment-count">' + commentCount + "</span></button>" +
      "</div>";
  }

  function viewStatHtml(views) {
    return '<span class="feed-stat-inline feed-stat-view">' + feedIcon("eye") +
      '<span class="feed-view-count tabular">' + views + "</span><span>浏览</span></span>";
  }

  function commentsBlockHtml(key, eng) {
    var list = (eng.comments || []).map(function (c) {
      return '<li class="feed-comment-item">' +
        '<span class="feed-comment-author">' + escapeText(c.author || "同事") + "</span>" +
        '<span class="feed-comment-time">' + escapeText(formatCommentAt(c.at)) + "</span>" +
        '<p class="feed-comment-text">' + escapeText(c.text || "") + "</p></li>";
    }).join("");
    if (!list) list = '<li class="feed-comment-empty">暂无评论，来说第一条吧。</li>';
    return '<div class="feed-comments-wrap" hidden>' +
      '<ul class="feed-comment-list">' + list + "</ul>" +
      '<div class="feed-comment-form">' +
      '<input type="text" class="feed-comment-input" data-feed-key="' + escapeAttr(key) + '" placeholder="写下你的评论…" maxlength="200">' +
      '<button type="button" class="chip feed-comment-submit" data-feed-key="' + escapeAttr(key) + '">发送</button>' +
      "</div></div>";
  }

  function footHtml(key, eng) {
    return '<div class="feed-card-foot">' +
      '<button type="button" class="feed-comment-teaser">' + feedIcon("message") +
      '<span class="feed-comment-teaser-label">补充你的经验…</span></button>' +
      interactionBarHtml(eng) +
      "</div>" + commentsBlockHtml(key, eng);
  }

  function syncCardUi(card, eng) {
    var views = Number(eng.views) || 0;
    var commentCount = commentCountOf(eng);
    var likes = Number(eng.likes) || 0;
    var dislikes = Number(eng.dislikes) || 0;
    var favs = Number(eng.favoriteCount) || 0;
    var viewEl = card.querySelector(".feed-view-count");
    var commentEl = card.querySelector(".feed-comment-count");
    var likeCountEl = card.querySelector(".feed-like-count");
    var dislikeCountEl = card.querySelector(".feed-dislike-count");
    var favCountEl = card.querySelector(".feed-fav-count");
    var likeBtn = card.querySelector(".feed-act-like");
    var dislikeBtn = card.querySelector(".feed-act-dislike");
    var favBtn = card.querySelector(".feed-act-fav");
    if (viewEl) viewEl.textContent = String(views);
    if (commentEl) commentEl.textContent = String(commentCount);
    if (likeCountEl) likeCountEl.textContent = String(likes);
    if (dislikeCountEl) dislikeCountEl.textContent = String(dislikes);
    if (favCountEl) favCountEl.textContent = String(favs);
    if (likeBtn) {
      likeBtn.classList.toggle("on-like", !!eng.liked);
      likeBtn.setAttribute("aria-pressed", eng.liked ? "true" : "false");
      likeBtn.setAttribute("aria-label", "有用 " + likes);
    }
    if (dislikeBtn) {
      dislikeBtn.classList.toggle("on-dislike", !!eng.disliked);
      dislikeBtn.setAttribute("aria-pressed", eng.disliked ? "true" : "false");
      dislikeBtn.setAttribute("aria-label", "一般 " + dislikes);
    }
    if (favBtn) {
      favBtn.classList.toggle("on-fav", !!eng.favorited);
      favBtn.setAttribute("aria-pressed", eng.favorited ? "true" : "false");
      favBtn.setAttribute("aria-label", "收藏 " + favs);
    }
    if (card.hasAttribute("data-view")) card.setAttribute("data-view", String(views));
    if (card.hasAttribute("data-like")) card.setAttribute("data-like", String(likes));
    if (card.hasAttribute("data-comment")) card.setAttribute("data-comment", String(commentCount));
  }

  function setCommentsOpen(card, open) {
    var wrap = card.querySelector(".feed-comments-wrap");
    if (wrap) wrap.hidden = !open;
    var teaser = card.querySelector(".feed-comment-teaser");
    if (teaser) teaser.classList.toggle("is-open", open);
    var label = card.querySelector(".feed-comment-teaser-label");
    if (label) label.textContent = open ? "收起评论" : "补充你的经验…";
  }

  function toggleComments(card) {
    var wrap = card.querySelector(".feed-comments-wrap");
    if (!wrap) return;
    setCommentsOpen(card, wrap.hidden);
  }

  function toggleReaction(store, key, kind) {
    var all = store.load();
    var eng = store.forKey(all, key);
    if (kind === "like") {
      if (eng.liked) {
        eng.likes = Math.max(0, (Number(eng.likes) || 0) - 1);
        eng.liked = false;
      } else {
        if (eng.disliked) {
          eng.dislikes = Math.max(0, (Number(eng.dislikes) || 0) - 1);
          eng.disliked = false;
        }
        eng.likes = (Number(eng.likes) || 0) + 1;
        eng.liked = true;
      }
    } else if (kind === "dislike") {
      if (eng.disliked) {
        eng.dislikes = Math.max(0, (Number(eng.dislikes) || 0) - 1);
        eng.disliked = false;
      } else {
        if (eng.liked) {
          eng.likes = Math.max(0, (Number(eng.likes) || 0) - 1);
          eng.liked = false;
        }
        eng.dislikes = (Number(eng.dislikes) || 0) + 1;
        eng.disliked = true;
      }
    } else if (kind === "fav") {
      if (eng.favorited) {
        eng.favoriteCount = Math.max(0, (Number(eng.favoriteCount) || 0) - 1);
        eng.favorited = false;
      } else {
        eng.favoriteCount = (Number(eng.favoriteCount) || 0) + 1;
        eng.favorited = true;
      }
    }
    store.save(all);
    return eng;
  }

  function bumpView(store, key) {
    var all = store.load();
    var eng = store.forKey(all, key);
    eng.views = (Number(eng.views) || 0) + 1;
    store.save(all);
    return eng;
  }

  function addComment(store, key, text, author) {
    var all = store.load();
    var eng = store.forKey(all, key);
    eng.comments = eng.comments || [];
    eng.comments.push({
      author: author || "同事",
      text: String(text || "").trim(),
      at: new Date().toISOString(),
    });
    eng.seedCommentCount = 0;
    store.save(all);
    return eng;
  }

  function upgradeLegacyMetaRow(card) {
    if (card.querySelector(".feed-card-foot")) return;
    var meta = card.querySelector(".meta-row");
    var profMeta = card.querySelector(".prof-card-meta-row");
    if (!meta && !profMeta) return;
    var key = card.getAttribute("data-feed-key");
    if (!key) {
      key = "prof-" + (card.getAttribute("data-cat") || card.querySelector("h3").textContent.slice(0, 8));
      card.setAttribute("data-feed-key", key);
    }
    card.classList.add("feed-interact-card");
    var eng = engFromCard(card);
    if (profMeta) {
      profMeta.classList.add("feed-card-tag-row");
      if (!profMeta.querySelector(".feed-stat-view")) {
        profMeta.insertAdjacentHTML("beforeend", viewStatHtml(eng.views));
      }
      profMeta.insertAdjacentHTML("afterend", footHtml(key, eng));
      if (meta) meta.remove();
      return;
    }
    var expand = meta.querySelector(".expand");
    if (card.querySelector(".prof-excerpt-panel .expand")) expand = null;
    var tagRow = document.createElement("div");
    tagRow.className = "feed-card-tag-row";
    if (expand) tagRow.appendChild(expand);
    tagRow.insertAdjacentHTML("beforeend", viewStatHtml(eng.views));
    meta.parentNode.insertBefore(tagRow, meta);
    meta.insertAdjacentHTML("afterend", footHtml(key, eng));
    meta.remove();
  }

  function refreshComments(card, store, key) {
    var all = store.load();
    var eng = store.forKey(all, key);
    var wrap = card.querySelector(".feed-comments-wrap");
    var wasOpen = wrap && !wrap.hidden;
    if (wrap) wrap.outerHTML = commentsBlockHtml(key, eng);
    wrap = card.querySelector(".feed-comments-wrap");
    if (wrap && wasOpen) wrap.hidden = false;
    syncCardUi(card, eng);
  }

  function mount(container, options) {
    if (!container) return null;
    options = options || {};
    var cardSelector = options.cardSelector || CARD_SEL;
    var storageKey = options.storageKey || "cognition-feed-eng-v1";
    var store = createStore(storageKey, options.seed || {});
    var getAuthor = options.getCommentAuthor || function () { return "同事"; };

    if (options.upgradeLegacy) {
      container.querySelectorAll('.pcard[data-panel="prof"]').forEach(upgradeLegacyMetaRow);
    }

    container.querySelectorAll(cardSelector).forEach(function (card) {
      var key = card.getAttribute("data-feed-key");
      if (!key) return;
      var all = store.load();
      if (!all[key]) {
        store.forKey(all, key, engFromCard(card));
      }
      syncCardUi(card, store.forKey(store.load(), key));
    });

    if (container.__feedInteractionBound) return store;
    container.__feedInteractionBound = true;

    container.addEventListener("click", function (e) {
      var cardRoot = e.target.closest(cardSelector);
      if (!cardRoot || !container.contains(cardRoot)) return;

      var viewBump = e.target.closest(".feed-view-bump");
      if (viewBump) {
        var vk = cardRoot.getAttribute("data-feed-key");
        if (vk) syncCardUi(cardRoot, bumpView(store, vk));
        return;
      }

      var likeBtn = e.target.closest(".feed-act-like");
      if (likeBtn && cardRoot.contains(likeBtn)) {
        e.preventDefault();
        var keyL = cardRoot.getAttribute("data-feed-key");
        if (keyL) syncCardUi(cardRoot, toggleReaction(store, keyL, "like"));
        return;
      }
      var dislikeBtn = e.target.closest(".feed-act-dislike");
      if (dislikeBtn && cardRoot.contains(dislikeBtn)) {
        e.preventDefault();
        var keyD = cardRoot.getAttribute("data-feed-key");
        if (keyD) syncCardUi(cardRoot, toggleReaction(store, keyD, "dislike"));
        return;
      }
      var favBtn = e.target.closest(".feed-act-fav");
      if (favBtn && cardRoot.contains(favBtn)) {
        e.preventDefault();
        var keyF = cardRoot.getAttribute("data-feed-key");
        if (keyF) syncCardUi(cardRoot, toggleReaction(store, keyF, "fav"));
        return;
      }
      var teaser = e.target.closest(".feed-comment-teaser");
      if (teaser && cardRoot.contains(teaser)) {
        e.preventDefault();
        toggleComments(cardRoot);
        return;
      }
      var commentBtn = e.target.closest(".feed-act-comment");
      if (commentBtn && cardRoot.contains(commentBtn)) {
        e.preventDefault();
        toggleComments(cardRoot);
        return;
      }
      var submit = e.target.closest(".feed-comment-submit");
      if (submit && cardRoot.contains(submit)) {
        e.preventDefault();
        var keyS = submit.getAttribute("data-feed-key") || cardRoot.getAttribute("data-feed-key");
        if (!keyS) return;
        var input = cardRoot.querySelector(".feed-comment-input");
        var text = input && input.value ? input.value.trim() : "";
        if (!text) return;
        addComment(store, keyS, text, getAuthor());
        if (input) input.value = "";
        refreshComments(cardRoot, store, keyS);
        setCommentsOpen(cardRoot, true);
      }
    });

    return store;
  }

  global.FeedInteraction = {
    mount: mount,
    feedIcon: feedIcon,
    interactionBarHtml: interactionBarHtml,
    viewStatHtml: viewStatHtml,
    footHtml: footHtml,
    commentsBlockHtml: commentsBlockHtml,
    syncCardUi: syncCardUi,
    setCommentsOpen: setCommentsOpen,
    toggleComments: toggleComments,
    toggleReaction: toggleReaction,
    bumpView: bumpView,
    addComment: addComment,
    createStore: createStore,
    upgradeLegacyMetaRow: upgradeLegacyMetaRow,
  };
})(typeof window !== "undefined" ? window : this);
