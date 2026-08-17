(function() {
  var heroVid = document.querySelector('.hero-video');
  var muteBtn = document.getElementById('heroMute');
  var muteFrameImg = document.getElementById('heroMuteFrame');

  // Hand-animated mute-icon loop (22 PNG frames, 24fps) — plays once on load to
  // draw the eye to the button. After the first click it's done for good; from
  // then on the button just swaps between two static icons per mute state.
  //
  // If the click lands mid-bounce, we don't cut it off — there's a matching
  // 22-frame black-icon animation, and we ride the same motion into it from
  // whatever frame we're already on, play it out once, then settle static.
  var MUTE_FRAME_COUNT = 22;
  var MUTE_FRAME_FPS = 24;
  var muteFrameTimer = null;
  var muteFrameIndex = 0;
  var hollowLoopActive = false;
  var MUTE_ICON_HOLLOW_STATIC = 'media/icons/Speaker-2--Streamline-Core-Remix.png';
  var MUTE_ICON_BLACK = 'media/icons/Speaker-2--Streamline-Plump.png';

  function hollowFramePath(i) {
    return 'media/icons/icon animation/icon_' + String(i).padStart(5, '0') + '.png';
  }

  function blackFramePath(i) {
    return 'media/icons/black icon animation/Speaker-2--Streamline-Plump_' + String(i).padStart(5, '0') + '.png';
  }

  // Swapping img.src every ~41ms (24fps) is fine on localhost but over a real
  // network each swap aborts the previous frame's still-in-flight request —
  // the animation looks broken/stuck even though it lands on the right icon
  // at the end. Preloading every frame once means later src swaps just hit
  // the browser cache instead of the network.
  for (var _pf = 0; _pf < MUTE_FRAME_COUNT; _pf++) {
    new Image().src = hollowFramePath(_pf);
    new Image().src = blackFramePath(_pf);
  }

  function startMuteFrameLoop() {
    if (muteFrameTimer || !muteFrameImg) return;
    hollowLoopActive = true;
    muteFrameImg.classList.add('hero-mute-frame--anim');
    muteFrameTimer = window.setInterval(function() {
      muteFrameIndex = (muteFrameIndex + 1) % MUTE_FRAME_COUNT;
      muteFrameImg.src = hollowFramePath(muteFrameIndex);
    }, 1000 / MUTE_FRAME_FPS);
  }

  function stopMuteFrameLoop() {
    hollowLoopActive = false;
    if (muteFrameImg) muteFrameImg.classList.remove('hero-mute-frame--anim');
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
      // Land on the exact same static file the instant-swap path uses (not the
      // animation's own last frame — that's a different, bigger transparent
      // canvas and never quite lines up pixel-for-pixel with the static icon).
      muteFrameImg.src = MUTE_ICON_BLACK;
      muteFrameImg.classList.remove('hero-mute-frame--anim');
      muteFrameImg.classList.add('hero-mute-frame--black-static');
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

  if (heroVid && muteBtn) {
    /* Scroll-linked volume: linear 0–100% as .hero-frame-svg top moves from viewport top to bottom.
       iOS/Safari ignore video.volume — use Web Audio GainNode when needed. */
    var heroFrameSvg = document.querySelector('.hero-frame-svg');
    var scrollVolRaf = null;
    var scrollVolDebugHud = null;
    var scrollVolMode = null; /* null | 'volume' | 'gain' */
    var scrollGainCtx = null;
    var scrollGainNode = null;
    try {
      var _u = new URLSearchParams(window.location.search);
      if (_u.get('scrollVolDebug') === '1') {
        scrollVolDebugHud = document.createElement('div');
        scrollVolDebugHud.id = 'scrollVolDebugHud';
        scrollVolDebugHud.setAttribute('aria-hidden', 'true');
        scrollVolDebugHud.style.cssText = 'position:fixed;left:8px;bottom:8px;z-index:10060;padding:6px 10px;font:12px/1.2 system-ui,sans-serif;background:rgba(15,28,38,.85);color:#e8f0ff;border-radius:6px;pointer-events:none;';
        document.body.appendChild(scrollVolDebugHud);
      }
    } catch (_) {}

    function prefersScrollGainPath() {
      try {
        var ua = navigator.userAgent || '';
        if (/iPhone|iPad|iPod/i.test(ua)) return true;
        if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) return true;
      } catch (_) {}
      return false;
    }

    function testVolumePropertyWorks() {
      try {
        var saved = heroVid.volume;
        heroVid.volume = 0.314159;
        var ok = Math.abs(heroVid.volume - 0.314159) < 0.02;
        heroVid.volume = saved;
        return ok;
      } catch (_) {
        return false;
      }
    }

    function tryCreateScrollGainGraph() {
      if (scrollGainNode) return true;
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      try {
        scrollGainCtx = new AC();
        var src = scrollGainCtx.createMediaElementSource(heroVid);
        scrollGainNode = scrollGainCtx.createGain();
        src.connect(scrollGainNode);
        scrollGainNode.connect(scrollGainCtx.destination);
        scrollGainNode.gain.value = 1;
        heroVid.volume = 1;
        return true;
      } catch (_) {
        scrollGainCtx = null;
        scrollGainNode = null;
        return false;
      }
    }

    function ensureScrollVolumePath() {
      if (scrollVolMode !== null) return;
      if (prefersScrollGainPath()) {
        if (tryCreateScrollGainGraph()) {
          scrollVolMode = 'gain';
          return;
        }
      }
      if (testVolumePropertyWorks()) {
        scrollVolMode = 'volume';
        return;
      }
      if (tryCreateScrollGainGraph()) {
        scrollVolMode = 'gain';
        return;
      }
      scrollVolMode = 'volume';
    }

    function resumeScrollAudioIfNeeded() {
      try {
        if (scrollGainCtx && scrollGainCtx.state === 'suspended') {
          scrollGainCtx.resume().catch(function() {});
        }
      } catch (_) {}
    }

    function applyHeroScrollVolume() {
      if (!heroFrameSvg) return;
      var rect = heroFrameSvg.getBoundingClientRect();
      var vh = window.innerHeight || 1;
      var factor = Math.max(0, Math.min(1, rect.top / vh));
      if (scrollVolDebugHud) {
        var modeLabel = scrollVolMode === 'gain' ? 'gain' : scrollVolMode === 'volume' ? 'vol' : '…';
        scrollVolDebugHud.textContent = 'Scroll: ' + Math.round(factor * 100) + '% [' + modeLabel + ']';
      }
      if (heroVid.muted) {
        if (scrollGainNode) scrollGainNode.gain.value = 0;
        return;
      }
      ensureScrollVolumePath();
      resumeScrollAudioIfNeeded();
      if (scrollVolMode === 'gain' && scrollGainNode) {
        scrollGainNode.gain.value = factor;
        heroVid.volume = 1;
      } else {
        heroVid.volume = factor;
      }
    }

    function scheduleHeroScrollVolume() {
      if (scrollVolRaf != null) return;
      scrollVolRaf = window.requestAnimationFrame(function() {
        scrollVolRaf = null;
        applyHeroScrollVolume();
      });
    }

    window.addEventListener('scroll', scheduleHeroScrollVolume, { passive: true });
    window.addEventListener('resize', scheduleHeroScrollVolume, { passive: true });
    applyHeroScrollVolume();

    muteBtn.addEventListener('click', function() {
      heroVid.muted = !heroVid.muted;
      muteBtn.setAttribute('aria-label', heroVid.muted ? 'Unmute video' : 'Mute video');

      if (!heroVid.muted && hollowLoopActive) {
        finishIntoBlackTail();
      } else {
        stopMuteFrameLoop();
        if (muteFrameImg) {
          muteFrameImg.src = heroVid.muted ? MUTE_ICON_HOLLOW_STATIC : MUTE_ICON_BLACK;
          muteFrameImg.classList.toggle('hero-mute-frame--black-static', !heroVid.muted);
        }
      }

      if (!heroVid.muted) {
        ensureScrollVolumePath();
        resumeScrollAudioIfNeeded();
      }
      applyHeroScrollVolume();
    });

    heroVid.play().catch(function() {});
    applyHeroScrollVolume();
    startMuteFrameLoop();
  }

  var welcomeFonts = [
    "Welcome-Bernhc",
    "Welcome-Showg",
    "Welcome-Broadw",
    "Welcome-Bauhs93",
    "Welcome-Segmdl2",
    "Welcome-Coopbl",
    "Welcome-Latinwd"
  ];
  var letters = document.querySelectorAll('.hero-welcome-title .welcome-letter');
  if (letters.length && welcomeFonts.length) {
    var timeIndex = 0;
    var n = welcomeFonts.length;
    setInterval(function() {
      for (var i = 0; i < letters.length; i++) {
        var fontIndex = ((timeIndex - i) % n + n) % n;
        letters[i].style.fontFamily = '"' + welcomeFonts[fontIndex] + '", sans-serif';
      }
      timeIndex++;
    }, 1000);
  }

  var welcomeSection = document.querySelector('.hero-welcome');
  if (welcomeSection && 'IntersectionObserver' in window) {
    var welcomeAnimated = false;
    var welcomeObserver = null;
    function markWelcomeInView() {
      if (welcomeAnimated) return;
      welcomeSection.classList.add('welcome-in-view');
      welcomeAnimated = true;
      if (welcomeObserver) welcomeObserver.disconnect();
    }
    welcomeObserver = new IntersectionObserver(function(entries) {
      var ent = entries[0];
      if (ent.isIntersecting) markWelcomeInView();
    }, { root: null, rootMargin: '0px', threshold: 0 });
    welcomeObserver.observe(welcomeSection);
    function fallbackWelcomeIfVisible() {
      if (welcomeAnimated) return;
      var r = welcomeSection.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) markWelcomeInView();
    }
    window.addEventListener('scroll', fallbackWelcomeIfVisible, { passive: true });
    window.addEventListener('resize', fallbackWelcomeIfVisible);
    window.requestAnimationFrame(fallbackWelcomeIfVisible);
    setTimeout(fallbackWelcomeIfVisible, 0);
  } else if (welcomeSection) {
    welcomeSection.classList.add('welcome-in-view');
  }

  // --- Marquee: insert random local icons along the blue strip ---
  try {
    var marqueeInner = document.querySelector('.hero-footer-bar-marquee-inner');
    if (marqueeInner) {
      var iconFiles = [
        'my_web/icons/adobe-photoshop-2.svg',
        'my_web/icons/logo-blender.svg',
        'my_web/icons/adobe-illustrator-cc-3.svg',
        'my_web/icons/edge-animate-app-cc.svg',
        'my_web/icons/figma-icon.svg',
        'my_web/icons/after-effects-1.svg',
        'my_web/icons/adobe-44195.svg',
        'my_web/icons/maya-2017.svg'
      ];

      function makeIconSpan(iconPath) {
        var s = document.createElement('span');
        s.className = 'marquee-icon';
        s.setAttribute('aria-hidden', 'true');
        s.style.backgroundImage = "url('" + iconPath + "')";
        return s;
      }

      // Remove previously inserted marquee icons (if any)
      var existingIcons = marqueeInner.querySelectorAll('.marquee-icon');
      for (var ei = 0; ei < existingIcons.length; ei++) {
        existingIcons[ei].remove();
      }

      var items = Array.prototype.slice.call(marqueeInner.querySelectorAll('.marquee-item'));
      // Deterministic: put an icon after every word, fixed order.
      for (var i = 0; i < items.length; i++) {
        var iconPath = iconFiles[i % iconFiles.length];
        // Insert after the label.
        var next = items[i].nextSibling;
        items[i].parentNode.insertBefore(makeIconSpan(iconPath), next);
      }
    }
  } catch (_) {}

  // --- Contact: letter-by-letter drop-in when reaching bottom quarter ---
  try {
    var contactAbout = document.querySelector('#contact .home-contact-about');
    var contactTalk = document.querySelector('#contact .home-contact-talk');
    if (contactAbout && contactTalk && 'IntersectionObserver' in window) {
      function splitTextToLetters(container) {
        if (!container || container.dataset.lettersSplit === '1') return;
        // Split ONLY the big titles (h2). Do not touch the smaller text/links.
        var nodes = container.querySelectorAll('h2');
        for (var n = 0; n < nodes.length; n++) {
          var el = nodes[n];
          if (!el || el.dataset.lettersSplit === '1') continue;
          var txt = el.textContent || '';
          el.textContent = '';
          var letterIndex = 0;
          for (var i = 0; i < txt.length; i++) {
            var ch = txt[i];
            if (ch === ' ') {
              el.appendChild(document.createTextNode(' '));
              continue;
            }
            var span = document.createElement('span');
            span.className = 'contact-letter';
            span.textContent = ch;
            span.style.setProperty('--i', letterIndex);
            el.appendChild(span);
            letterIndex++;
          }
          el.dataset.lettersSplit = '1';
        }
        container.dataset.lettersSplit = '1';
      }

      splitTextToLetters(contactAbout);
      splitTextToLetters(contactTalk);

      var revealObserver = new IntersectionObserver(function(entries) {
        for (var i = 0; i < entries.length; i++) {
          var ent = entries[i];
          if (ent.isIntersecting) {
            if (ent.target === contactAbout) contactAbout.classList.add('contact-revealed');
            if (ent.target === contactTalk) contactTalk.classList.add('contact-revealed');
            revealObserver.unobserve(ent.target);
          }
        }
      }, { root: null, rootMargin: '0px 0px -25% 0px', threshold: 0 });

      revealObserver.observe(contactAbout);
      revealObserver.observe(contactTalk);
    }
  } catch (_) {}
})();
