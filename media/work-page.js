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
