(function () {
  var fixed = document.querySelector(".work-video-fixed");
  if (!fixed) return;

  var frame = fixed.querySelector(".work-video-frame");
  if (!frame) return;

  var readyMarked = false;

  function markReady() {
    if (readyMarked) return;
    readyMarked = true;
    fixed.classList.add("video-ready");
  }

  frame.addEventListener("load", markReady, { once: true });
  window.setTimeout(markReady, 3500);

  if (window.Vimeo) {
    try {
      var player = new window.Vimeo.Player(frame);
      player.ready().then(markReady).catch(function () {});
    } catch (_) {}
  }

})();

// --- Tap the hero video to expand it to fullscreen (mobile only — desktop's
// .work-video-fixed already covers the full viewport by default); swipe down
// or tap again to shrink it back to its place at the top of the page.
(function () {
  var container = document.querySelector(".work-video-fixed");
  var trigger = document.querySelector(".work-video-expand-trigger");
  if (!container || !trigger) return;

  var EXPANDED = "is-expanded";
  function isMobile() {
    return window.matchMedia("(max-width: 900px)").matches;
  }

  function collapse() {
    container.classList.remove(EXPANDED);
  }

  trigger.addEventListener("click", function () {
    if (!isMobile()) return;
    container.classList.toggle(EXPANDED);
  });

  var touchStartY = null;
  container.addEventListener(
    "touchstart",
    function (e) {
      if (!container.classList.contains(EXPANDED)) return;
      touchStartY = e.touches[0].clientY;
    },
    { passive: true }
  );

  container.addEventListener(
    "touchmove",
    function (e) {
      if (touchStartY === null) return;
      var dy = e.touches[0].clientY - touchStartY;
      if (dy > 70) {
        collapse();
        touchStartY = null;
      }
    },
    { passive: true }
  );

  container.addEventListener("touchend", function () {
    touchStartY = null;
  });

  window.addEventListener("resize", function () {
    if (!isMobile()) collapse();
  });
})();

// --- Marquee icons: deterministic (not random)
// Runs on pages that have the blue marquee strip.
(function () {
  var marqueeInner = document.querySelector(".hero-footer-bar-marquee-inner");
  if (!marqueeInner) return;

  var iconFiles = [
    "../my_web/icons/adobe-photoshop-2.svg",
    "../my_web/icons/logo-blender.svg",
    "../my_web/icons/adobe-illustrator-cc-3.svg",
    "../my_web/icons/edge-animate-app-cc.svg",
    "../my_web/icons/figma-icon.svg",
    "../my_web/icons/after-effects-1.svg",
    "../my_web/icons/adobe-44195.svg",
    "../my_web/icons/maya-2017.svg"
  ];

  function makeIconSpan(iconPath) {
    var s = document.createElement("span");
    s.className = "marquee-icon";
    s.setAttribute("aria-hidden", "true");
    s.style.backgroundImage = "url('" + iconPath + "')";
    return s;
  }

  // Remove previously inserted marquee icons (if any)
  var existingIcons = marqueeInner.querySelectorAll(".marquee-icon");
  for (var ei = 0; ei < existingIcons.length; ei++) existingIcons[ei].remove();

  var items = marqueeInner.querySelectorAll(".marquee-item");
  for (var i = 0; i < items.length; i++) {
    var iconPath = iconFiles[i % iconFiles.length];
    // Insert after each word label.
    var next = items[i].nextSibling;
    items[i].parentNode.insertBefore(makeIconSpan(iconPath), next);
  }
})();
