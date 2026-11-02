/*
 * 由 assets/content.js 產生網站的所有網頁：
 *   index.html          首頁 + 目錄
 *   chapter-1.html …    每章一頁（Google 可以逐章收錄）
 *   sitemap.xml         網站地圖（提交給 Google Search Console）
 *
 * 修改 assets/content.js 之後，執行：  node build.js
 */
"use strict";
var fs = require("fs");
var path = require("path");
var vm = require("vm");

var SITE = "https://joejoe66-bot.github.io/rambo/";
var VERSION = "3"; // 改動 css/js 時加一，避免瀏覽器用舊檔
var ROOT = __dirname;

// ---------- load content ----------
var ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, "assets/content.js"), "utf8") +
  "\nthis.CHAPTERS = CHAPTERS; this.IMG_BASE = IMG_BASE; this.MEDIA_BASE = MEDIA_BASE;" +
  "this.LOCAL_MEDIA = typeof LOCAL_MEDIA === 'undefined' ? [] : LOCAL_MEDIA;", ctx);
var CHAPTERS = ctx.CHAPTERS, IMG_BASE = ctx.IMG_BASE, MEDIA_BASE = ctx.MEDIA_BASE, LOCAL_MEDIA = ctx.LOCAL_MEDIA;

// Google Search Console 驗證碼（content="..." 裏面的那串字），未有就留空
var GOOGLE_VERIFY = "";
try { GOOGLE_VERIFY = fs.readFileSync(path.join(ROOT, "google-verification.txt"), "utf8").trim(); } catch (e) {}

// ---------- helpers ----------
var CJK = /[㐀-鿿豈-﫿　-〿＀-￯]/g;
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
function chapterFile(n) { return "chapter-" + n + ".html"; }
function oneLine(s) { return s.replace(/\s*\n\s*/g, " ").trim(); }

function subtitle(ch) {
  for (var i = 0; i < ch.blocks.length; i++) {
    var b = ch.blocks[i];
    if (b[0] === "h" || b[0] === "p") return oneLine(b[1]);
  }
  return "";
}
function description(ch) {
  var en = "", zh = "";
  ch.blocks.forEach(function (b) {
    if (b[0] !== "h" && b[0] !== "p" && b[0] !== "li") return;
    var t = oneLine(b[1]);
    if (isZh(t)) { if (zh.length < 70) zh += (zh ? " " : "") + t; }
    else if (en.length < 110) en += (en ? " " : "") + t;
  });
  var d = (en.length > 110 ? en.slice(0, 107) + "…" : en) + (zh ? " " + (zh.length > 70 ? zh.slice(0, 68) + "…" : zh) : "");
  return d || "RAMBO — A dog with cancer · 一隻患了末期血癌的狗";
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
function firstImage(ch) {
  var b = ch.blocks.filter(function (x) { return x[0] === "img"; })[0];
  return b ? imgUrl(b[1], b[2], "s1600") : null;
}

// ---------- block rendering ----------
function renderPhoto(b) {
  var full = imgUrl(b[1], b[2], "s1600");
  var alt = b[2].replace(/\.[a-z]+$/i, "").replace(/[+=_-]+/g, " ");
  return '<figure class="photo"><button type="button" data-full="' + esc(full) + '" aria-label="放大 ' + esc(alt) + '">' +
    '<img loading="lazy" decoding="async" src="' + esc(full) + '" alt="' + esc(alt) + '"' +
    ' onerror="this.onerror=null;this.src=\'' + esc(imgUrl(b[1], b[2], "s400")) + '\'">' +
    "</button></figure>";
}
function localName(n, b) {
  var kind = b[0] === "video" ? "video" : (b[2] === "旁述" ? "cantonese" : "english");
  var name = "ch" + (n < 10 ? "0" : "") + n + "-" + kind;
  return LOCAL_MEDIA.indexOf(name) !== -1 ? name : null;
}
function renderAudio(n, b) {
  var name = localName(n, b);
  if (name) {
    return '<div class="audio local"><div class="label">🎧 ' + esc(b[2]) + "</div>" +
      '<audio controls preload="none" src="assets/media/' + name + '.m4a"></audio></div>';
  }
  return '<div class="audio"><iframe loading="lazy" allowfullscreen title="' + esc(b[2]) + '" src="' + esc(MEDIA_BASE + b[1]) + '"></iframe>' +
    '<div class="label">' + esc(b[2]) + "</div></div>";
}
function renderVideo(n, b) {
  var name = localName(n, b);
  if (name) {
    return '<div class="video local"><video controls playsinline preload="metadata" poster="assets/media/' + name +
      '.jpg" src="assets/media/' + name + '.mp4"></video></div>';
  }
  return '<div class="video"><iframe loading="lazy" allowfullscreen title="Rambo video" src="' + esc(MEDIA_BASE + b[1]) + '"></iframe></div>';
}
function renderBlocks(n, blocks, firstHeadingTag) {
  var html = "", i = 0, usedH1 = !firstHeadingTag;
  while (i < blocks.length) {
    var b = blocks[i], t = b[0];
    if (t === "img") {
      var group = [];
      while (i < blocks.length && blocks[i][0] === "img") group.push(blocks[i++]);
      html += group.length > 1 ? '<div class="gallery">' + group.map(renderPhoto).join("") + "</div>" : renderPhoto(group[0]);
      continue;
    }
    if (t === "audio") {
      var aud = [];
      while (i < blocks.length && blocks[i][0] === "audio") aud.push(blocks[i++]);
      html += '<div class="audio-row">' + aud.map(function (x) { return renderAudio(n, x); }).join("") + "</div>";
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
    else if (t === "video") html += renderVideo(n, b);
    i++;
  }
  return html;
}

// ---------- page shell ----------
function page(opts) {
  var url = SITE + (opts.file === "index.html" ? "" : opts.file);
  return '<!doctype html>\n<html lang="zh-Hant">\n<head>\n' +
    '  <meta charset="utf-8">\n' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    "  <title>" + esc(opts.title) + "</title>\n" +
    '  <meta name="description" content="' + esc(opts.description) + '">\n' +
    '  <link rel="canonical" href="' + url + '">\n' +
    (GOOGLE_VERIFY ? '  <meta name="google-site-verification" content="' + esc(GOOGLE_VERIFY) + '">\n' : "") +
    '  <meta property="og:type" content="' + (opts.file === "index.html" ? "website" : "article") + '">\n' +
    '  <meta property="og:site_name" content="RAMBO">\n' +
    '  <meta property="og:title" content="' + esc(opts.ogTitle || opts.title) + '">\n' +
    '  <meta property="og:description" content="' + esc(opts.description) + '">\n' +
    '  <meta property="og:url" content="' + url + '">\n' +
    (opts.image ? '  <meta property="og:image" content="' + esc(opts.image) + '">\n' : "") +
    (opts.prev ? '  <link rel="prev" href="' + opts.prev + '">\n' : "") +
    (opts.next ? '  <link rel="next" href="' + opts.next + '">\n' : "") +
    "  <link rel=\"icon\" href=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%23d9772b'/%3E%3Ctext x='32' y='43' font-family='Georgia,serif' font-size='32' font-weight='700' text-anchor='middle' fill='%23fff'%3ER%3C/text%3E%3C/svg%3E\">\n" +
    '  <link rel="preconnect" href="https://fonts.googleapis.com">\n' +
    '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
    '  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Noto+Serif+TC:wght@400;600;700&display=swap" rel="stylesheet">\n' +
    '  <link rel="stylesheet" href="assets/style.css?v=' + VERSION + '">\n' +
    "</head>\n<body>\n" +
    '  <a class="skip" href="#main">Skip to content</a>\n\n' +
    '  <header class="topbar">\n' +
    '    <a class="brand" href="./" aria-label="RAMBO home">RAMBO</a>\n' +
    '    <nav class="topnav">\n      <a href="./#contents">目錄 Contents</a>\n    </nav>\n' +
    '    <div class="progress" aria-hidden="true"><span id="progress-bar" style="width:' + (opts.progress || 0) + '%"></span></div>\n' +
    "  </header>\n\n" +
    '  <main id="main" tabindex="-1">\n' + opts.body + "\n  </main>\n\n" +
    '  <footer class="site-footer">\n    <p>Posted by Rambo_Dog</p>\n  </footer>\n\n' +
    '  <div class="lightbox" id="lightbox" hidden>\n' +
    '    <button class="lb-close" type="button" aria-label="Close">×</button>\n    <img alt="">\n  </div>\n\n' +
    (opts.extraScript || "") +
    '  <script src="assets/app.js?v=' + VERSION + '"></script>\n' +
    "</body>\n</html>\n";
}

// ---------- views ----------
function tocHtml() {
  return '<section class="contents" id="contents">' +
    '<h2 class="section-title">目錄 <small>Contents</small></h2>' +
    '<ol class="toc">' + CHAPTERS.map(function (ch, idx) {
      var ms = mediaSummary(ch);
      return '<li><a href="' + chapterFile(idx + 1) + '">' +
        '<span class="num">' + (idx + 1) + "</span>" +
        '<span><span class="t">' + esc(ch.title) + "</span>" +
        '<span class="s">' + esc(subtitle(ch)) + "</span>" +
        (ms ? '<span class="icons">' + ms + "</span>" : "") +
        "</span></a></li>";
    }).join("") + "</ol></section>";
}

function homeBody() {
  var c1 = CHAPTERS[0].blocks, c2 = CHAPTERS[1].blocks;
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
    '<a class="btn" href="' + chapterFile(2) + '">開始閱讀 →</a>' +
    '<a class="btn btn-ghost" href="#contents">目錄 Contents</a>' +
    "</div></div>" +
    '<figure class="cover-photo">' +
    '<img src="' + esc(imgUrl(photo[1], photo[2], "s1600")) + '" alt="Rambo &amp; Rocky">' +
    "<figcaption>" + esc(photoCap[1] ? photoCap[1][1] : "") + "</figcaption>" +
    "</figure></section>" + tocHtml();
}

function chapterBody(n) {
  var ch = CHAPTERS[n - 1], prev = CHAPTERS[n - 2], next = CHAPTERS[n];
  var body = renderBlocks(n, ch.blocks);
  if (n === 1) body = '<div class="cover-inline">' + body + "</div>";
  return '<article class="chapter">' +
    '<h1 class="ch-kicker">' + esc(ch.title) + "</h1>" + body + "</article>" +
    '<nav class="pager" aria-label="Chapters">' +
    (prev ? '<a class="prev" rel="prev" href="' + chapterFile(n - 1) + '"><span class="dir">← 上一章</span><span class="nm">' + esc(prev.title) + "</span></a>" : "<span></span>") +
    (next ? '<a class="next" rel="next" href="' + chapterFile(n + 1) + '"><span class="dir">下一章 →</span><span class="nm">' + esc(next.title) + "</span></a>"
          : '<a class="next" href="./#contents"><span class="dir">返回 →</span><span class="nm">目錄 Contents</span></a>') +
    "</nav>";
}

// ---------- write files ----------
function write(file, text) { fs.writeFileSync(path.join(ROOT, file), text); }

// old links: #/3 or ?p=2009/08/rambo-chapter-3.html → chapter-3.html
var redirectMap = {};
CHAPTERS.forEach(function (ch, i) { redirectMap[ch.slug] = i + 1; });
var homeScript = "  <script>(function(){var m=" + JSON.stringify(redirectMap) + ";" +
  "var h=location.hash.match(/^#\\/(\\d+)$/);if(h){location.replace('chapter-'+h[1]+'.html');return;}" +
  "if(location.hash==='#/contents'||location.hash==='#/'){history.replaceState(null,'',location.hash==='#/'?'./':'#contents');}" +
  "var p=new URLSearchParams(location.search).get('p');if(p){for(var k in m){if(p.indexOf(k)!==-1){location.replace('chapter-'+m[k]+'.html');return;}}}" +
  "})();</script>\n";

write("index.html", page({
  file: "index.html",
  title: "RAMBO — A Dog With Cancer · 一隻患了末期血癌的狗",
  ogTitle: "RAMBO",
  description: "RAMBO — A DOG WITH CANCER. How he was revived from a terminal cancer through a MIRACLE. 一隻患了末期血癌的狗 – 死後復生、及顯現了奇蹟",
  image: firstImage(CHAPTERS[1]),
  body: homeBody(),
  extraScript: homeScript
}));

CHAPTERS.forEach(function (ch, i) {
  var n = i + 1;
  write(chapterFile(n), page({
    file: chapterFile(n),
    title: ch.title + " · RAMBO — A Dog With Cancer 一隻患了末期血癌的狗",
    ogTitle: ch.title + " · RAMBO",
    description: description(ch),
    image: firstImage(ch) || firstImage(CHAPTERS[1]),
    prev: n > 1 ? chapterFile(n - 1) : null,
    next: n < CHAPTERS.length ? chapterFile(n + 1) : null,
    progress: Math.round(n / CHAPTERS.length * 1000) / 10,
    body: chapterBody(n)
  }));
});

var today = new Date().toISOString().slice(0, 10);
write("sitemap.xml", '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  ["", ].concat(CHAPTERS.map(function (c, i) { return chapterFile(i + 1); })).map(function (f) {
    return "  <url><loc>" + SITE + f + "</loc><lastmod>" + today + "</lastmod></url>";
  }).join("\n") + "\n</urlset>\n");

console.log("Built index.html + " + CHAPTERS.length + " chapter pages, sitemap.xml" +
  (GOOGLE_VERIFY ? " (with Google verification)" : ""));
