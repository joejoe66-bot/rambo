(function () {
  "use strict";

  var main = document.getElementById("main");
  var bar = document.getElementById("progress-bar");
  var lightbox = document.getElementById("lightbox");
  var lbImg = lightbox.querySelector("img");
  var CJK = /[㐀-鿿豈-﫿　-〿＀-￯]/g;

  // ---------- helpers ----------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function isZh(s) {
    var m = s.match(CJK);
    return !!m && m.length / s.replace(/\s/g, "").length > 0.3;
  }
  function imgUrl(id, name, size) { return IMG_BASE + id + "/" + size + "/" + name; }
  function mediaUrl(token) { return MEDIA_BASE + token; }

  function subtitle(ch) {
    for (var i = 0; i < ch.blocks.length; i++) {
      var b = ch.blocks[i];
      if (b[0] === "h" || b[0] === "p") return b[1].replace(/\n/g, " ");
    }
    return "";
  }
  function mediaSummary(ch) {
    var a = 0, v = 0, p = 0;
    ch.blocks.forEach(function (b) {
      if (b[0] === "audio") a++;
      if (b[0] === "video") v++;
      if (b[0] === "img") p++;
    });
    var out = [];
    if (p) out.push("📷 " + p);
    if (a) out.push("🎧 " + a);
    if (v) out.push("🎬 " + v);
    return out.join("　");
  }

  // ---------- block rendering ----------
  function renderPhoto(b) {
    var thumb = imgUrl(b[1], b[2], "s1600");
    var alt = b[2].replace(/\.[a-z]+$/i, "").replace(/[+=_-]+/g, " ");
    return '<figure class="photo"><button type="button" data-full="' + esc(thumb) + '" aria-label="放大 ' + esc(alt) + '">' +
      '<img loading="lazy" decoding="async" src="' + esc(thumb) + '" alt="' + esc(alt) + '"' +
      ' onerror="this.onerror=null;this.src=\'' + esc(imgUrl(b[1], b[2], "s400")) + '\'">' +
      "</button></figure>";
  }
  // 本地影音檔名：ch03-english / ch03-cantonese / ch12-video
  var curCh = 0;
  function localName(b) {
    var kind = b[0] === "video" ? "video" : (b[2] === "旁述" ? "cantonese" : "english");
    var name = "ch" + (curCh < 10 ? "0" : "") + curCh + "-" + kind;
    return (typeof LOCAL_MEDIA !== "undefined" && LOCAL_MEDIA.indexOf(name) !== -1) ? name : null;
  }
  function renderAudio(b) {
    var name = localName(b);
    if (name) {
      return '<div class="audio local">' +
        '<div class="label">🎧 ' + esc(b[2]) + "</div>" +
        '<audio controls preload="none" src="assets/media/' + name + '.m4a"></audio></div>';
    }
    return '<div class="audio">' +
      '<iframe loading="lazy" allowfullscreen title="' + esc(b[2]) + '" src="' + esc(mediaUrl(b[1])) + '"></iframe>' +
      '<div class="label">' + esc(b[2]) + "</div></div>";
  }
  function renderVideo(b) {
    var name = localName(b);
    if (name) {
      return '<div class="video local"><video controls playsinline preload="metadata" poster="assets/media/' + name +
        '.jpg" src="assets/media/' + name + '.mp4"></video></div>';
    }
    return '<div class="video"><iframe loading="lazy" allowfullscreen title="Rambo video" src="' + esc(mediaUrl(b[1])) + '"></iframe></div>';
  }
  // 同一時間只播一段
  document.addEventListener("play", function (e) {
    document.querySelectorAll("audio, video").forEach(function (m) { if (m !== e.target) m.pause(); });
  }, true);

  function renderBlocks(blocks) {
    var html = "";
    var i = 0;
    while (i < blocks.length) {
      var b = blocks[i];
      var t = b[0];
      if (t === "img") {
        // consecutive images → gallery
        var group = [];
        while (i < blocks.length && blocks[i][0] === "img") group.push(blocks[i++]);
        html += group.length > 1
          ? '<div class="gallery">' + group.map(renderPhoto).join("") + "</div>"
          : renderPhoto(group[0]);
        continue;
      }
      if (t === "audio") {
        var aud = [];
        while (i < blocks.length && blocks[i][0] === "audio") aud.push(blocks[i++]);
        html += '<div class="audio-row">' + aud.map(renderAudio).join("") + "</div>";
        continue;
      }
      if (t === "li") {
        var items = [];
        while (i < blocks.length && blocks[i][0] === "li") items.push(blocks[i++]);
        html += "<ul>" + items.map(function (x) {
          return '<li class="' + (isZh(x[1]) ? "zh" : "en") + '">' + esc(x[1]) + "</li>";
        }).join("") + "</ul>";
        continue;
      }
      if (t === "h") html += '<h2 class="' + (isZh(b[1]) ? "zh" : "en") + '">' + esc(b[1]) + "</h2>";
      else if (t === "p") html += '<p class="' + (isZh(b[1]) ? "zh" : "en") + '">' + esc(b[1]) + "</p>";
      else if (t === "cap") html += '<p class="cap">' + esc(b[1]) + "</p>";
      else if (t === "video") html += renderVideo(b);
      i++;
    }
    return html;
  }

  // ---------- views ----------
  function tocHtml() {
    return '<section class="contents" id="contents">' +
      '<h2 class="section-title">目錄 <small>Contents</small></h2>' +
      '<ol class="toc">' + CHAPTERS.map(function (ch, idx) {
        return '<li><a href="#/' + (idx + 1) + '">' +
          '<span class="num">' + (idx + 1) + "</span>" +
          "<span><span class=\"t\">" + esc(ch.title) + "</span>" +
          '<span class="s">' + esc(subtitle(ch)) + "</span>" +
          (mediaSummary(ch) ? '<span class="icons">' + mediaSummary(ch) + "</span>" : "") +
          "</span></a></li>";
      }).join("") + "</ol></section>";
  }

  function homeView() {
    var c1 = CHAPTERS[0].blocks; // RAMBO / A DOG WITH CANCER / How he was revived… / 一隻患了…
    var c2 = CHAPTERS[1].blocks;
    var photo = c2.filter(function (b) { return b[0] === "img"; })[0];
    var photoCap = c2.filter(function (b) { return b[0] === "h"; });
    return '<section class="cover">' +
      '<div class="cover-text">' +
      '<p class="cover-kicker">' + esc(CHAPTERS[0].title) + "</p>" +
      "<h1>" + esc(c1[0][1]) + "</h1>" +
      '<p class="c-sub">' + esc(c1[1][1]) + "</p>" +
      '<p class="c-en">' + esc(c1[2][1]) + "</p>" +
      '<p class="c-zh">' + esc(c1[3][1]) + "</p>" +
      '<div class="cover-actions">' +
      '<a class="btn" href="#/2">開始閱讀 →</a>' +
      '<a class="btn btn-ghost" href="#/contents">目錄 Contents</a>' +
      "</div></div>" +
      '<figure class="cover-photo">' +
      '<img src="' + esc(imgUrl(photo[1], photo[2], "s1600")) + '" alt="Rambo & Rocky">' +
      "<figcaption>" + esc(photoCap[1] ? photoCap[1][1] : "") + "</figcaption>" +
      "</figure></section>" + tocHtml();
  }

  function chapterView(n) {
    var ch = CHAPTERS[n - 1];
    var prev = CHAPTERS[n - 2], next = CHAPTERS[n];
    var body;
    curCh = n;
    if (n === 1) {
      body = '<div class="cover-inline">' + renderBlocks(ch.blocks) + "</div>";
    } else {
      body = renderBlocks(ch.blocks);
    }
    return '<article class="chapter">' +
      '<p class="ch-kicker">' + esc(ch.title) + "</p>" + body + "</article>" +
      '<nav class="pager" aria-label="Chapters">' +
      (prev ? '<a class="prev" href="#/' + (n - 1) + '"><span class="dir">← 上一章</span><span class="nm">' + esc(prev.title) + "</span></a>" : "<span></span>") +
      (next ? '<a class="next" href="#/' + (n + 1) + '"><span class="dir">下一章 →</span><span class="nm">' + esc(next.title) + "</span></a>"
            : '<a class="next" href="#/contents"><span class="dir">返回 →</span><span class="nm">目錄 Contents</span></a>') +
      "</nav>";
  }

  // ---------- router ----------
  function route() {
    var h = location.hash.replace(/^#\/?/, "");
    var n = parseInt(h, 10);
    var title = "RAMBO";
    if (n >= 1 && n <= CHAPTERS.length) {
      main.innerHTML = chapterView(n);
      title = CHAPTERS[n - 1].title + " · RAMBO";
      bar.style.width = (n / CHAPTERS.length * 100) + "%";
      window.scrollTo(0, 0);
    } else {
      main.innerHTML = homeView();
      bar.style.width = "0";
      if (h === "contents") {
        var el = document.getElementById("contents");
        if (el) el.scrollIntoView();
      } else {
        window.scrollTo(0, 0);
      }
    }
    document.title = title;
  }
  window.addEventListener("hashchange", route);
  route();

  // ---------- keyboard: ← → between chapters ----------
  document.addEventListener("keydown", function (e) {
    if (!lightbox.hidden) { if (e.key === "Escape") closeLb(); return; }
    var n = parseInt(location.hash.replace(/^#\/?/, ""), 10);
    if (!(n >= 1)) return;
    if (e.key === "ArrowRight" && n < CHAPTERS.length) location.hash = "#/" + (n + 1);
    if (e.key === "ArrowLeft" && n > 1) location.hash = "#/" + (n - 1);
  });

  // ---------- lightbox ----------
  main.addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-full]");
    if (!btn) return;
    lbImg.src = btn.getAttribute("data-full");
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  });
  function closeLb() { lightbox.hidden = true; lbImg.src = ""; document.body.style.overflow = ""; }
  lightbox.addEventListener("click", closeLb);

  // ---------- old Blogger links → new chapter ----------
  // e.g. someone opens ?p=2009/08/rambo-chapter-3.html
  var q = new URLSearchParams(location.search).get("p");
  if (q) {
    CHAPTERS.forEach(function (ch, i) { if (q.indexOf(ch.slug) !== -1) location.hash = "#/" + (i + 1); });
  }
})();
