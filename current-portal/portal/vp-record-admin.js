(function (global) {
  function escapeText(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;");
  }
  function escapeAttr(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  }
  function queryParam(name) {
    var match = location.search.match(new RegExp("(?:\\?|&)" + name + "=([^&]+)"));
    if (!match) return "";
    try { return decodeURIComponent(match[1]); } catch (e) { return match[1]; }
  }
  function ready() {
    return global.VpslpDemo && global.SPerfAdmin && global.SPerfAdmin.directory;
  }
  function readText(row) {
    if (!row.materials.length) return "无素材";
    return "已读 " + row.readCount + "/" + row.materials.length;
  }
  function scoreText(row) {
    if (!row.exams.length) return "未考";
    return row.exams.map(function (item) { return item.score + " 分"; }).join("、");
  }

  function mountAdmin(root) {
    if (!root || !ready()) return;
    var periods = global.VpslpDemo.cyclePeriods();
    var fromUrl = queryParam("period");
    var state = {
      period: periods.indexOf(fromUrl) >= 0 ? fromUrl : "2026|h2",
      q: "",
    };
    function render() {
      var demo = global.VpslpDemo.load();
      var q = state.q.trim();
      var list = global.SPerfAdmin.directory().filter(function (person) {
        return !q || person.name.indexOf(q) >= 0;
      });
      var pills = periods.map(function (key) {
        return '<button type="button" class="chip' + (key === state.period ? " on" : "") + '" data-period="' + escapeAttr(key) + '">' +
          escapeText(global.VpslpDemo.cycleLabel(key)) + "</button>";
      }).join("");
      var rows = list.map(function (person) {
        var sum = global.VpslpDemo.cycleSummary(demo, person.id, state.period);
        return "<tr><td>" + escapeText(person.name) + "</td><td>" + escapeText(person.dept) + "</td><td>" + escapeText(person.role) +
          "</td><td>已点亮 " + sum.lit + "/" + sum.total + "</td><td><a class=\"chip\" href=\"vp-record-detail.html?period=" +
          encodeURIComponent(state.period) + "&id=" + encodeURIComponent(person.id) + "\">查看</a></td></tr>";
      }).join("");
      root.innerHTML =
        '<p class="route">HRBP · 价值点记录</p><h1>价值点记录</h1>' +
        '<p class="lead">按人和周期查看岗位价值点的阅读材料、考试分数和是否点亮。本页只读，审查留到后续。</p>' +
        '<div class="s-win-pills">' + pills + "</div>" +
        '<div class="s-admin-toolbar"><input data-q placeholder="搜索姓名" value="' + escapeAttr(state.q) + '">' +
        '<span class="lead">' + escapeText(global.VpslpDemo.cycleLabel(state.period)) + " · " + list.length + " 人</span></div>" +
        '<div class="card"><table><tr><th>姓名</th><th>部门</th><th>角色</th><th>本周期点亮</th><th></th></tr>' +
        (rows || '<tr><td colspan="5">没有匹配的人。</td></tr>') + "</table></div>";
    }
    root.addEventListener("click", function (e) {
      var periodBtn = e.target.closest("[data-period]");
      if (!periodBtn) return;
      state.period = periodBtn.getAttribute("data-period");
      render();
    });
    root.addEventListener("input", function (e) {
      if (!e.target.hasAttribute("data-q")) return;
      state.q = e.target.value;
      var caret = e.target.selectionStart;
      render();
      var again = root.querySelector("[data-q]");
      if (!again) return;
      again.focus();
      if (again.setSelectionRange) again.setSelectionRange(caret, caret);
    });
    render();
  }

  function mountDetail(root) {
    if (!root || !ready()) return;
    var periods = global.VpslpDemo.cyclePeriods();
    var fromUrl = queryParam("period");
    var period = periods.indexOf(fromUrl) >= 0 ? fromUrl : "2026|h2";
    var id = queryParam("id");
    var openId = "";
    var back = "vp-record.html?period=" + encodeURIComponent(period);
    var person = global.SPerfAdmin.directory().filter(function (item) { return item.id === id; })[0];
    function render() {
      if (!person) {
        root.innerHTML =
          '<p class="lead"><a href="' + escapeAttr(back) + '">← 返回价值点记录</a></p>' +
          '<div class="card"><p>未找到这个人。</p></div>';
        return;
      }
      var demo = global.VpslpDemo.load();
      var sum = global.VpslpDemo.cycleSummary(demo, person.id, period);
      var rows = global.VpslpDemo.POINTS.map(function (point) {
        var row = global.VpslpDemo.cyclePointFor(demo, person.id, period, point.id);
        var mats = row.materials.length
          ? row.materials.map(function (item) {
              var done = row.readIds.indexOf(item.id) >= 0;
              return "<li><b>" + escapeText(item.title) + "</b><span>" + (done ? "已读" : "未读") + "</span></li>";
            }).join("")
          : "<li><b>该价值点暂无阅读材料</b><span>未读</span></li>";
        var main = "<tr><td><button type=\"button\" class=\"chip\" data-point=\"" + escapeAttr(point.id) + "\">" + escapeText(point.name) +
          "</button></td><td>" + readText(row) + "</td><td>" + scoreText(row) + "</td><td>" + (row.lit ? "已点亮" : "未点亮") + "</td></tr>";
        if (openId !== point.id) return main;
        return main + '<tr class="vp-record-open"><td colspan="4"><ul class="vp-cycle-mats">' + mats + "</ul></td></tr>";
      }).join("");
      root.innerHTML =
        '<p class="route">HRBP · 价值点记录</p>' +
        '<p class="lead"><a href="' + escapeAttr(back) + '">← 返回价值点记录</a></p>' +
        "<h1>" + escapeText(person.name) + " · " + escapeText(global.VpslpDemo.cycleLabel(period)) + "</h1>" +
        '<p class="lead">' + escapeText(person.dept) + " · " + escapeText(person.role) + " · 已点亮 " + sum.lit + "/" + sum.total + "。只读。</p>" +
        '<div class="card"><table><tr><th>价值点</th><th>阅读材料</th><th>考试分数</th><th>是否点亮</th></tr>' + rows + "</table></div>";
    }
    root.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-point]");
      if (!btn) return;
      var next = btn.getAttribute("data-point");
      openId = openId === next ? "" : next;
      render();
    });
    render();
  }

  global.VpRecordAdmin = { mountAdmin: mountAdmin, mountDetail: mountDetail };
})(window);
