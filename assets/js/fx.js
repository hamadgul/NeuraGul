/* NeuraGul motion engine — reveals, counters, magnetic, tilt, parallax, nav, cursor glow, flow-field canvas */
(function () {
  'use strict';
  var NGFX = {};

  NGFX.init = function (opts) {
    opts = opts || {};
    var motion = opts.motion || 'full';
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var mode = (reduced || motion === 'off') ? 'off' : motion; /* 'full' | 'calm' | 'off' */
    var cleanups = [];
    function on(t, ev, fn, o) { t.addEventListener(ev, fn, o); cleanups.push(function () { t.removeEventListener(ev, fn, o); }); }
    function qsa(s) { return Array.prototype.slice.call(document.querySelectorAll(s)); }

    /* ---------- background video autoplay (belt & suspenders for muted autoplay) ---------- */
    qsa('video[data-autoplay]').forEach(function (v) {
      v.muted = true;
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
    });

    /* ---------- scroll reveals ---------- */
    (function () {
      var els = qsa('[data-reveal]');
      if (!els.length || mode === 'off') return;
      var vh = window.innerHeight;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var el = e.target;
          var d = parseFloat(el.getAttribute('data-delay') || '0');
          el.style.transition = 'opacity .9s cubic-bezier(.2,.7,.2,1) ' + d + 's, transform .9s cubic-bezier(.2,.7,.2,1) ' + d + 's';
          el.style.opacity = '1';
          el.style.transform = 'none';
          io.unobserve(el);
        });
      }, { threshold: 0.12 });
      els.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top > vh * 0.86) { /* below the fold: safe to hide, no flash */
          var kind = el.getAttribute('data-reveal') || 'up';
          el.style.opacity = '0';
          el.style.transform = kind === 'left' ? 'translateX(-40px)' : kind === 'right' ? 'translateX(40px)' : kind === 'scale' ? 'scale(.95)' : 'translateY(40px)';
          io.observe(el);
        }
      });
      cleanups.push(function () { io.disconnect(); });
    })();

    /* ---------- count-up numbers ---------- */
    (function () {
      var els = qsa('[data-count]');
      if (!els.length) return;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var el = e.target; io.unobserve(el);
          var target = parseFloat(el.getAttribute('data-count'));
          var dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
          var suffix = el.getAttribute('data-suffix') || '';
          var prefix = el.getAttribute('data-prefix') || '';
          if (mode === 'off') { el.textContent = prefix + target.toFixed(dec) + suffix; return; }
          var t0 = performance.now(), dur = 1500;
          (function tick(t) {
            var p = Math.min(1, ((t || performance.now()) - t0) / dur);
            var ease = 1 - Math.pow(1 - p, 3);
            el.textContent = prefix + (target * ease).toFixed(dec) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          })(t0);
        });
      }, { threshold: 0.6 });
      els.forEach(function (el) { io.observe(el); });
      cleanups.push(function () { io.disconnect(); });
    })();

    /* ---------- magnetic elements ---------- */
    if (mode === 'full' && window.matchMedia('(pointer: fine)').matches) {
      qsa('[data-magnetic]').forEach(function (el) {
        var strength = parseFloat(el.getAttribute('data-magnetic') || '0.32');
        function move(e) {
          var r = el.getBoundingClientRect();
          var dx = e.clientX - (r.left + r.width / 2);
          var dy = e.clientY - (r.top + r.height / 2);
          el.style.transition = 'transform .15s ease-out';
          el.style.transform = 'translate(' + (dx * strength).toFixed(1) + 'px,' + (dy * strength).toFixed(1) + 'px)';
        }
        function leave() {
          el.style.transition = 'transform .55s cubic-bezier(.2,.9,.25,1.25)';
          el.style.transform = 'translate(0,0)';
        }
        on(el, 'pointermove', move);
        on(el, 'pointerleave', leave);
      });
    }

    /* ---------- 3D tilt cards ---------- */
    if (mode === 'full' && window.matchMedia('(pointer: fine)').matches) {
      qsa('[data-tilt]').forEach(function (el) {
        var max = parseFloat(el.getAttribute('data-tilt') || '5');
        function move(e) {
          var r = el.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - 0.5;
          var py = (e.clientY - r.top) / r.height - 0.5;
          el.style.transition = 'transform .12s ease-out';
          el.style.transform = 'perspective(1100px) rotateX(' + (-py * max).toFixed(2) + 'deg) rotateY(' + (px * max).toFixed(2) + 'deg)';
        }
        function leave() {
          el.style.transition = 'transform .7s cubic-bezier(.2,.8,.2,1)';
          el.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg)';
        }
        on(el, 'pointermove', move);
        on(el, 'pointerleave', leave);
      });
    }

    /* ---------- scroll-linked: parallax, drift-x, nav chrome, progress lines ---------- */
    (function () {
      var plx = qsa('[data-plx]').map(function (el) { return { el: el, s: parseFloat(el.getAttribute('data-plx') || '0.15') }; });
      var dfx = qsa('[data-driftx]').map(function (el) { return { el: el, s: parseFloat(el.getAttribute('data-driftx') || '0.12') }; });
      var cfx = qsa('[data-centerx]').map(function (el) { return { el: el }; });
      var nav = document.querySelector('[data-nav]');
      var lines = qsa('[data-progressline]');
      if (!plx.length && !dfx.length && !cfx.length && !nav && !lines.length) return;
      var raf = 0;
      function update() {
        raf = 0;
        var vh = window.innerHeight;
        if (mode !== 'off') {
          plx.forEach(function (o) {
            var r = o.el.getBoundingClientRect();
            var c = r.top + r.height / 2 - vh / 2;
            o.el.style.transform = 'translateY(' + (-c * o.s).toFixed(1) + 'px)';
          });
          dfx.forEach(function (o) {
            var r = o.el.getBoundingClientRect();
            o.el.style.transform = 'translateX(' + ((r.top - vh) * o.s).toFixed(1) + 'px)';
          });
          cfx.forEach(function (o) {
            var par = o.el.parentElement;
            var pr = par.getBoundingClientRect();
            var p = Math.min(1, Math.max(0, (vh - pr.top) / (vh * 1.15)));
            var e = p * p * (3 - 2 * p); /* smoothstep: slow in, slow out */
            var target = (par.offsetWidth - o.el.offsetWidth) / 2 - o.el.offsetLeft;
            o.el.style.transform = 'translateX(' + (e * target).toFixed(1) + 'px)';
          });
          lines.forEach(function (el) {
            var r = el.parentElement.getBoundingClientRect();
            var p = Math.min(1, Math.max(0, (vh * 0.78 - r.top) / (r.height + vh * 0.25)));
            el.style.transform = 'scaleY(' + p.toFixed(3) + ')';
          });
        }
        if (nav) {
          var sc = window.scrollY > 30;
          nav.style.background = sc ? 'rgba(7,10,15,.8)' : 'rgba(7,10,15,0)';
          nav.style.backdropFilter = sc ? 'blur(16px)' : 'none';
          nav.style.webkitBackdropFilter = sc ? 'blur(16px)' : 'none';
          nav.style.borderBottomColor = sc ? 'rgba(140,170,255,.14)' : 'rgba(140,170,255,0)';
        }
      }
      function onScroll() { if (!raf) raf = requestAnimationFrame(update); }
      on(window, 'scroll', onScroll, { passive: true });
      on(window, 'resize', onScroll);
      update();
      cleanups.push(function () { if (raf) cancelAnimationFrame(raf); });
    })();

    /* ---------- dot-aligned track sizing ---------- */
    (function () {
      qsa('[data-dotline-box]').forEach(function (box) {
        var dots = Array.prototype.slice.call(box.querySelectorAll('[data-dot]'));
        var lineEls = Array.prototype.slice.call(box.querySelectorAll('[data-dotline]'));
        if (dots.length < 2 || !lineEls.length) return;
        function cy(dot) { return dot.parentElement.offsetTop + dot.offsetTop + dot.offsetHeight / 2; }
        function size() {
          var top = cy(dots[0]);
          var end = cy(dots[dots.length - 1]);
          lineEls.forEach(function (el) {
            el.style.top = top + 'px';
            el.style.height = Math.max(0, end - top) + 'px';
            el.style.bottom = 'auto';
          });
        }
        size();
        on(window, 'resize', size);
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(size);
      });
    })();

    /* ---------- cursor glow ---------- */
    if (mode === 'full' && window.matchMedia('(pointer: fine)').matches) {
      var glow = document.querySelector('[data-cursor-glow]');
      if (glow) {
        var gx = -600, gy = -600, tx = gx, ty = gy, raf2 = 0;
        (function loop() {
          gx += (tx - gx) * 0.1; gy += (ty - gy) * 0.1;
          glow.style.transform = 'translate(' + (gx - 300).toFixed(1) + 'px,' + (gy - 300).toFixed(1) + 'px)';
          raf2 = requestAnimationFrame(loop);
        })();
        on(window, 'pointermove', function (e) { tx = e.clientX; ty = e.clientY; });
        cleanups.push(function () { cancelAnimationFrame(raf2); });
      }
    }

    /* ---------- hero flow-field canvas ---------- */
    (function () {
      var canvas = document.querySelector('[data-hero-canvas]');
      if (!canvas) return;
      var ctx = canvas.getContext('2d');
      var w = 0, h = 0, raf3 = 0, running = false, t = Math.random() * 100;
      var mx = -9999, my = -9999;
      var COUNT = mode === 'full' ? 240 : 150;
      var P = [];
      function spawn(p) {
        p.x = Math.random() * w; p.y = Math.random() * h;
        p.px = p.x; p.py = p.y; p.vx = 0; p.vy = 0;
        p.hue = 220 + Math.random() * 64;              /* blue -> violet */
        p.life = 140 + Math.random() * 280;
        p.lw = 0.6 + Math.random() * 1.1;
      }
      function resize() {
        var r = canvas.parentElement.getBoundingClientRect();
        var dpr = Math.min(1.5, window.devicePixelRatio || 1);
        w = Math.max(2, Math.floor(r.width)); h = Math.max(2, Math.floor(r.height));
        canvas.width = w * dpr; canvas.height = h * dpr;
        canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.fillStyle = '#070a0f'; ctx.fillRect(0, 0, w, h);
        P.forEach(spawn);
      }
      function frame() {
        t += 0.006;
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'rgba(7,10,15,0.085)';
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'lighter';
        for (var i = 0; i < P.length; i++) {
          var p = P[i];
          var a = Math.sin(p.x * 0.0019 + t * 0.9) * 1.8 + Math.cos(p.y * 0.0016 - t * 0.7) * 1.8;
          p.vx += Math.cos(a) * 0.045; p.vy += Math.sin(a) * 0.045;
          var dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
          if (d2 < 32400) {
            var d = Math.sqrt(d2) || 1;
            var f = (1 - d / 180) * 0.85;
            p.vx += (-dy / d) * f + (dx / d) * f * 0.35;  /* swirl + slight repel */
            p.vy += (dx / d) * f + (dy / d) * f * 0.35;
          }
          p.vx *= 0.955; p.vy *= 0.955;
          p.px = p.x; p.py = p.y;
          p.x += p.vx; p.y += p.vy;
          p.life -= 1;
          if (p.life <= 0 || p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) { spawn(p); continue; }
          var sp = Math.min(1, Math.hypot(p.vx, p.vy) / 2.2);
          ctx.strokeStyle = 'hsla(' + p.hue.toFixed(0) + ', 88%, ' + (58 + sp * 14).toFixed(0) + '%, ' + (0.05 + sp * 0.22).toFixed(3) + ')';
          ctx.lineWidth = p.lw;
          ctx.beginPath(); ctx.moveTo(p.px, p.py); ctx.lineTo(p.x, p.y); ctx.stroke();
        }
      }
      function step() { frame(); raf3 = requestAnimationFrame(step); }
      function start() { if (!running) { running = true; raf3 = requestAnimationFrame(step); } }
      function stop() { running = false; cancelAnimationFrame(raf3); }
      var i0; for (i0 = 0; i0 < COUNT; i0++) P.push({});
      resize();
      if (mode === 'off') {
        for (var k = 0; k < 110; k++) frame();  /* leave a static texture */
      } else {
        var io = new IntersectionObserver(function (es) {
          es.forEach(function (e) { if (e.isIntersecting && document.visibilityState === 'visible') start(); else stop(); });
        }, { threshold: 0.02 });
        io.observe(canvas);
        on(document, 'visibilitychange', function () { if (document.visibilityState !== 'visible') stop(); else start(); });
        on(window, 'resize', resize);
        var host = canvas.parentElement;
        on(host, 'pointermove', function (e) {
          var r = canvas.getBoundingClientRect();
          mx = e.clientX - r.left; my = e.clientY - r.top;
        });
        on(host, 'pointerleave', function () { mx = -9999; my = -9999; });
        cleanups.push(function () { io.disconnect(); stop(); });
      }
    })();

    return function cleanup() { cleanups.forEach(function (f) { f(); }); };
  };

  window.NGFX = NGFX;
})();
