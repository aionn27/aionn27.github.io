// A large φ built from many small φ letters. They behave like atoms:
// they tremble in place, scatter when the mouse moves through them, then drift back.
(function () {
  var canvas = document.getElementById('phi');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  // Settings you can change
  var COLORS =  ['#d07a10', '#8a3b4c', '#3b66b5', '#168a16'];
  var SPACING = 45;        // letters across the φ's width. More = more, smaller letters
  var LETTER_SIZE = 1.45;   // size of each small φ compared with the spacing
  var MOUSE_RADIUS = 0.2;  // how far the mouse reaches, as a fraction of the φ's width
  var MOUSE_FORCE = 1.35;     // 0 = the mouse does nothing, 2 = a stronger scatter
  var SPRING = 0.09;       // how strongly letters return to their place (higher = snappier)
  var SHIVER = 1;          // how much the letters tremble in place (0 = perfectly still)

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W = 0, H = 0, R = 0;
  var spriteCss = 0;
  var sprites = [];
  var particles = [];
  var mouse = { x: -9999, y: -9999, vx: 0, vy: 0 };
  var visible = true;

  function inkColors() {
    if (COLORS && COLORS.length) return COLORS;
    var c = getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim();
    return [c || '#1a1a1a'];
  }

  // Draw one small φ per color ahead of time, so each frame only has to copy them
  function makeSprites(size) {
    var box = Math.ceil(size * 1.6 * dpr);
    spriteCss = box / dpr;
    sprites = inkColors().map(function (color) {
      var s = document.createElement('canvas');
      s.width = box;
      s.height = box;
      var c = s.getContext('2d');
      c.scale(dpr, dpr);
      c.fillStyle = color;
      c.font = 'bold ' + size + 'px Georgia, "Times New Roman", serif';
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText('\u03C6', spriteCss / 2, spriteCss / 2);
      return s;
    });
  }

  // The big φ as a solid shape: a loop that is thick at the sides and thin at the top and bottom,
  // with a stem running through it and a small serif at each end of the stem
  function drawMask(w, h) {
    var m = document.createElement('canvas');
    m.width = w;
    m.height = h;
    var c = m.getContext('2d');
    var cx = w / 2;
    var top = h * 0.04;
    var bottom = h * 0.96;
    var ringY = top + (bottom - top) * 0.42;

    c.fillStyle = '#000';
    c.beginPath();
    c.ellipse(cx, ringY, w * 0.385, w * 0.265, 0, 0, Math.PI * 2);
    c.fill();
    c.globalCompositeOperation = 'destination-out';
    c.beginPath();
    c.ellipse(cx, ringY, w * 0.255, w * 0.22, 0, 0, Math.PI * 2);
    c.fill();
    c.globalCompositeOperation = 'source-over';

    c.fillRect(cx - w * 0.0375, top, w * 0.075, bottom - top);
    c.fillRect(cx - w * 0.15, bottom - w * 0.04, w * 0.3, w * 0.04);
    c.fillRect(cx - w * 0.14, top, w * 0.18, w * 0.035);
    return c.getImageData(0, 0, w, h).data;
  }

  // Place one small letter wherever the big φ has ink
  function buildParticles() {
    var iw = Math.round(W);
    var ih = Math.round(H);
    var data = drawMask(iw, ih);
    var step = W / SPACING;
    particles = [];

    for (var y = step / 2; y < H; y += step) {
      for (var x = step / 2; x < W; x += step) {
        var jx = x + (Math.random() - 0.5) * step * 0.5;
        var jy = y + (Math.random() - 0.5) * step * 0.5;
        var ix = Math.round(jx);
        var iy = Math.round(jy);
        if (ix < 0 || iy < 0 || ix >= iw || iy >= ih) continue;
        if (data[(iy * iw + ix) * 4 + 3] > 128) {
          particles.push({
            hx: jx, hy: jy,                              // home: its place in the big φ
            x: reduceMotion ? jx : Math.random() * W,    // the letters start scattered...
            y: reduceMotion ? jy : Math.random() * H,    // ...and gather into the φ
            vx: 0, vy: 0,
            s: Math.floor(Math.random() * sprites.length)
          });
        }
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.drawImage(sprites[p.s], p.x - spriteCss / 2, p.y - spriteCss / 2, spriteCss, spriteCss);
    }
  }

  function resize() {
    var rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    W = rect.width;
    H = rect.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    R = W * MOUSE_RADIUS;
    makeSprites((W / SPACING) * LETTER_SIZE);
    buildParticles();
    if (reduceMotion) draw();
  }

  var last = 0;

  function tick(now) {
    requestAnimationFrame(tick);
    if (!visible || !particles.length) { last = now; return; }

    var dt = Math.min((now - last) / 16.67, 3) || 1;
    last = now;
    var damp = Math.pow(0.88, dt);
    mouse.vx *= Math.pow(0.85, dt);
    mouse.vy *= Math.pow(0.85, dt);
    var r2 = R * R;

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      // each letter is pulled back toward its place in the φ, and trembles a little
      var ax = (p.hx - p.x) * SPRING + (Math.random() - 0.5) * 0.05 * SHIVER;
      var ay = (p.hy - p.y) * SPRING + (Math.random() - 0.5) * 0.05 * SHIVER;

      // the mouse pushes nearby letters away, shakes them up, and carries them along
      var dx = p.x - mouse.x;
      var dy = p.y - mouse.y;
      var d2 = dx * dx + dy * dy;
      if (d2 < r2) {
        var d = Math.sqrt(d2) || 1;
        var f = 1 - d / R;
        var push = f * f * 3.4 * MOUSE_FORCE;
        ax += dx / d * push + (Math.random() - 0.5) * f * 2.2 * MOUSE_FORCE + mouse.vx * f * 0.06 * MOUSE_FORCE;
        ay += dy / d * push + (Math.random() - 0.5) * f * 2.2 * MOUSE_FORCE + mouse.vy * f * 0.06 * MOUSE_FORCE;
      }

      p.vx = (p.vx + ax * dt) * damp;
      p.vy = (p.vy + ay * dt) * damp;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
    }
    draw();
  }

  // Follow the pointer (mouse, pen, or finger) in the canvas's own coordinates
  window.addEventListener('pointermove', function (event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    if (mouse.x > -9000) {
      mouse.vx = mouse.vx * 0.5 + (x - mouse.x) * 0.5;
      mouse.vy = mouse.vy * 0.5 + (y - mouse.y) * 0.5;
    }
    mouse.x = x;
    mouse.y = y;
  });
  document.documentElement.addEventListener('mouseleave', function () {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  // Rest while the φ is scrolled out of view
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
    }).observe(canvas);
  }

  resize();
  if (!reduceMotion) requestAnimationFrame(tick);
})();
