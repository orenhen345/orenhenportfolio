(function() {
  var muteBtn = document.getElementById('workMute');
  var muteFrameImg = document.getElementById('workMuteFrame');
  var videoFrame = document.getElementById('workVideoFrame');
  if (!muteBtn || !muteFrameImg || !videoFrame) return;

  // Same icon system as the home page (media/home.js): a 22-frame bounce plays
  // once on load to draw the eye, a matching black-icon animation continues
  // seamlessly if clicked mid-bounce, and after that it's just two static
  // icons swapping per mute state. Paths are relative to /pages/, hence "../".
  var MUTE_FRAME_COUNT = 22;
  var MUTE_FRAME_FPS = 24;
  var muteFrameTimer = null;
  var muteFrameIndex = 0;
  var hollowLoopActive = false;
  var MUTE_ICON_HOLLOW_STATIC = '../media/icons/Speaker-2--Streamline-Core-Remix.png';
  var MUTE_ICON_BLACK = '../media/icons/Speaker-2--Streamline-Plump.png';

  function hollowFramePath(i) {
    return '../media/icons/icon animation/icon_' + String(i).padStart(5, '0') + '.png';
  }

  function blackFramePath(i) {
    return '../media/icons/black icon animation/Speaker-2--Streamline-Plump_' + String(i).padStart(5, '0') + '.png';
  }

  function startMuteFrameLoop() {
    if (muteFrameTimer || !muteFrameImg) return;
    hollowLoopActive = true;
    muteFrameImg.classList.add('work-mute-frame--anim');
    muteFrameTimer = window.setInterval(function() {
      muteFrameIndex = (muteFrameIndex + 1) % MUTE_FRAME_COUNT;
      muteFrameImg.src = hollowFramePath(muteFrameIndex);
    }, 1000 / MUTE_FRAME_FPS);
  }

  function stopMuteFrameLoop() {
    hollowLoopActive = false;
    if (muteFrameImg) muteFrameImg.classList.remove('work-mute-frame--anim');
    if (muteFrameTimer) {
      window.clearInterval(muteFrameTimer);
      muteFrameTimer = null;
    }
  }

  function finishIntoBlackTail() {
    hollowLoopActive = false;
    if (muteFrameTimer) {
      window.clearInterval(muteFrameTimer);
      muteFrameTimer = null;
    }
    if (!muteFrameImg) return;

    function settleOnStaticBlack() {
      muteFrameImg.src = MUTE_ICON_BLACK;
      muteFrameImg.classList.remove('work-mute-frame--anim');
      muteFrameImg.classList.add('work-mute-frame--black-static');
    }

    muteFrameImg.src = blackFramePath(muteFrameIndex);
    if (muteFrameIndex >= MUTE_FRAME_COUNT - 1) {
      settleOnStaticBlack();
      return;
    }
    muteFrameTimer = window.setInterval(function() {
      muteFrameIndex++;
      if (muteFrameIndex >= MUTE_FRAME_COUNT - 1) {
        window.clearInterval(muteFrameTimer);
        muteFrameTimer = null;
        settleOnStaticBlack();
      } else {
        muteFrameImg.src = blackFramePath(muteFrameIndex);
      }
    }, 1000 / MUTE_FRAME_FPS);
  }

  // --- YouTube IFrame Player API: controls the existing embed (autoplay=1&mute=1
  // already in its src), no reload. iframe needs enablejsapi=1 in its src for this to work. ---
  var ytPlayer = null;
  var isMuted = true;

  function loadYouTubeApiAndAttach() {
    function attach() {
      ytPlayer = new window.YT.Player('workVideoFrame', {
        events: {
          onReady: function() {
            if (isMuted) { ytPlayer.mute(); } else { ytPlayer.unMute(); }
          }
        }
      });
    }
    if (window.YT && window.YT.Player) {
      attach();
      return;
    }
    var prevReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function() {
      if (prevReady) prevReady();
      attach();
    };
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      var tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }
  }

  loadYouTubeApiAndAttach();

  muteBtn.addEventListener('click', function() {
    isMuted = !isMuted;
    muteBtn.setAttribute('aria-label', isMuted ? 'Unmute video' : 'Mute video');
    if (ytPlayer) {
      if (isMuted) { ytPlayer.mute(); } else { ytPlayer.unMute(); }
    }

    if (!isMuted && hollowLoopActive) {
      finishIntoBlackTail();
    } else {
      stopMuteFrameLoop();
      muteFrameImg.src = isMuted ? MUTE_ICON_HOLLOW_STATIC : MUTE_ICON_BLACK;
      muteFrameImg.classList.toggle('work-mute-frame--black-static', !isMuted);
    }
  });

  startMuteFrameLoop();
})();
