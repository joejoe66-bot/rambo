/*
 * 網頁已由 build.js 預先產生，這裏只負責：
 * 放大相片、← → 鍵翻章、同一時間只播一段影音
 */
(function () {
  "use strict";

  var main = document.getElementById("main");
  var lightbox = document.getElementById("lightbox");
  var lbImg = lightbox.querySelector("img");

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

  // ---------- keyboard: ← → between chapters ----------
  document.addEventListener("keydown", function (e) {
    if (!lightbox.hidden) { if (e.key === "Escape") closeLb(); return; }
    if (e.target.closest && e.target.closest("audio, video, input, textarea")) return;
    var a = null;
    if (e.key === "ArrowRight") a = document.querySelector('.pager a[rel="next"]');
    if (e.key === "ArrowLeft") a = document.querySelector('.pager a[rel="prev"]');
    if (a) location.href = a.href;
  });

  // ---------- only one audio/video plays at a time ----------
  document.addEventListener("play", function (e) {
    document.querySelectorAll("audio, video").forEach(function (m) { if (m !== e.target) m.pause(); });
  }, true);
})();
