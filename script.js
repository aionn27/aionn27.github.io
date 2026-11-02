// 1) Single words that open one block of text
document.querySelectorAll('.expand').forEach(function (trigger) {
  var target = trigger.nextElementSibling;
  trigger.setAttribute('role', 'button');
  trigger.setAttribute('aria-expanded', 'false');

  trigger.addEventListener('click', function (event) {
    event.preventDefault();
    var isOpen = target.classList.toggle('open');
    trigger.classList.toggle('opened', isOpen);
    trigger.setAttribute('aria-expanded', isOpen);
  });
});

// 2) Chains: one small fragment per press, optionally ending with a picture
document.querySelectorAll('.chain').forEach(function (chain) {
  var steps = Array.prototype.slice.call(chain.querySelectorAll('.step'));
  var id = chain.getAttribute('data-reveal');
  var extra = id ? document.getElementById(id) : null;
  var shown = 1;
  var extraShown = false;

  steps[0].classList.add('lead');

  function isActive(i) {
    if (i !== shown - 1) return false;
    if (i < steps.length - 1) return true;
    return !!extra && !extraShown; // last fragment is pressable only if there is a picture to reveal
  }

  function render() {
    steps.forEach(function (step, i) {
      var active = isActive(i);
      step.classList.toggle('shown', i < shown);
      step.classList.toggle('active', active);
      step.classList.toggle('done', i < shown && !active);

      if (active) {
        step.setAttribute('role', 'button');
        step.setAttribute('tabindex', '0');
      } else {
        step.removeAttribute('role');
        step.removeAttribute('tabindex');
      }
    });
  }

  steps.forEach(function (step, i) {
    step.addEventListener('click', function () {
      if (!isActive(i)) return;
      if (i < steps.length - 1) {
        shown += 1;
      } else {
        extra.classList.add('show');
        extraShown = true;
      }
      render();
    });
    step.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        step.click();
      }
    });
  });

  render();
});
// 3) Dachshund: sleeps until the picture appears, then stretches with each press
(function () {
  var dog = document.getElementById('dog');
  if (!dog) return;

  var line = document.getElementById('dog-line');
  var svg = dog.querySelector('svg');
  var body = dog.querySelector('.dog-body');
  var fronts = dog.querySelectorAll('.front-part');
  var eye = dog.querySelector('.eye');
  var pupil = dog.querySelector('.pupil');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var sleepLines = ['zzz.', 'shh.', 'she is dreaming of chicken'];
  var stretchLines = ['her name is gobi', 'she is long.', 'oh wow', 'that is a long german wiener'];
  var STEP = 25;                         // how much longer each press makes him
  var MAX = STEP * stretchLines.length;  // the longest he gets
  var awake = false;
  var stretch = 0;
  var presses = 0;
  var sleepCount = 0;
  var raf;
  var timer;

  function setStretch(s) {
    body.setAttribute('x', 72 - s);
    body.setAttribute('width', 126 + s);
    for (var i = 0; i < fronts.length; i++) {
      fronts[i].setAttribute('transform', 'translate(' + (-s) + ' 0)');
    }
  }

  function stretchTo(target) {
    cancelAnimationFrame(raf);
    if (reduceMotion) { stretch = target; setStretch(stretch); return; }
    var start = stretch;
    var t0 = null;
    function frame(t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / 350, 1);
      stretch = start + (target - start) * (1 - Math.pow(1 - p, 3));
      setStretch(stretch);
      if (p < 1) raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
  }

  function hop() {
    dog.classList.add('happy');
    clearTimeout(timer);
    timer = setTimeout(function () { dog.classList.remove('happy'); }, 900);
  }

  function wake() {
    if (awake) return;
    awake = true;
    dog.classList.add('awake');
    dog.setAttribute('aria-label', 'The dachshund. Press to stretch her.');
    line.textContent = 'she woke up! u can pet her';
    hop();
  }

  dog.addEventListener('click', function () {
    if (!awake) {
      line.textContent = sleepLines[sleepCount % sleepLines.length];
      sleepCount += 1;
      return;
    }
    if (presses < stretchLines.length) {
      stretchTo(STEP * (presses + 1));
      line.textContent = stretchLines[presses];
      presses += 1;
    } else {
      stretchTo(0);
      line.textContent = 'aaand back to normal.';
      presses = 0;
    }
    hop();
  });

  // Eyes follow the cursor once he is awake
  document.addEventListener('mousemove', function (event) {
    if (!awake) return;
    var box = eye.getBoundingClientRect();
    var scale = svg.getBoundingClientRect().width / 340;
    var dx = event.clientX - (box.left + box.width / 2);
    var dy = event.clientY - (box.top + box.height / 2);
    var dist = Math.sqrt(dx * dx + dy * dy) || 1;
    var move = Math.min(dist / (80 * scale), 1) * 2.2;
    pupil.setAttribute('transform', 'translate(' + (dx / dist * move) + ' ' + (dy / dist * move) + ')');
  });

  // He wakes up when the reflection's picture appears (or right away on pages without one)
  var picture = document.getElementById('reflection-image');
  if (picture) {
    new MutationObserver(function () {
      if (picture.classList.contains('show')) wake();
    }).observe(picture, { attributes: true, attributeFilter: ['class'] });
  } else {
    wake();
  }
})();
// 4) Pink lilies bloom across the background, then drift in the wind and get swept by the mouse
(function () {
  var picture = document.getElementById('reflection-image');
  if (!picture) return;

  // Settings you can change
  var WIND = 1;          // 0 = no wind, 2 = stronger wind
  var MOUSE_POWER = 1;   // 0 = the mouse does nothing, 2 = a stronger sweep
  var AVOID_TEXT = true; // where the lilies start: true = away from the text, false = anywhere
  var RADIUS = 130;      // how close the mouse has to be to move a lily (pixels)

  // One lily drawn as SVG. It is built once and reused for every flower.
  function petal(angle, fill) {
    return '<path transform="rotate(' + angle + ')" d="M0 0 C9 -12 11 -32 0 -46 C-11 -32 -9 -12 0 0Z" fill="' + fill + '" stroke="#e48fb3" stroke-width="1.4" stroke-linejoin="round"/>';
  }
  var parts = '';
  [30, 150, 270].forEach(function (a) { parts += petal(a, '#f7b7cf'); });
  [0, 120, 240].forEach(function (a) { parts += petal(a, '#fbd2e1'); });
  [0, 120, 240].forEach(function (a) {
    parts += '<path transform="rotate(' + a + ')" d="M0 -6 L0 -30" stroke="#e07aa4" stroke-width="1.2" stroke-linecap="round" fill="none"/>';
  });
  [20, 80, 140, 200, 260, 320].forEach(function (a) {
    parts += '<g transform="rotate(' + a + ')"><path d="M0 0 L0 -16" stroke="#c0446f" stroke-width="1" fill="none"/><circle cy="-17" r="2.2" fill="#9c2f58"/></g>';
  });
  var LILY = '<svg viewBox="-50 -50 100 100">' + parts + '</svg>';

  var lilies = [];
  var mouse = { x: -9999, y: -9999, vx: 0, vy: 0 };
  var bloomed = false;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Track the pointer (mouse, pen, or finger) in page coordinates
  window.addEventListener('pointermove', function (event) {
    if (mouse.x > -9000) {
      mouse.vx = mouse.vx * 0.5 + (event.pageX - mouse.x) * 0.5;
      mouse.vy = mouse.vy * 0.5 + (event.pageY - mouse.y) * 0.5;
    }
    mouse.x = event.pageX;
    mouse.y = event.pageY;
  });
  document.documentElement.addEventListener('mouseleave', function () {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  function place(layer) {
    var w = document.documentElement.clientWidth;
    var h = layer.offsetHeight;

    // On phones and small screens everything is stacked and there is no empty space,
    // so the lilies float softly behind the text instead of avoiding it.
    var avoidText = AVOID_TEXT && w >= 1200;
    var small = w < 700;

    var avoid = [];
    if (avoidText) {
      ['.side', '.main', '.side-image', '.dog'].forEach(function (selector) {
        var el = document.querySelector(selector);
        if (!el) return;
        var r = el.getBoundingClientRect();
        avoid.push({
          l: r.left + window.pageXOffset - 24,
          t: r.top + window.pageYOffset - 24,
          r: r.right + window.pageXOffset + 24,
          b: r.bottom + window.pageYOffset + 24
        });
      });
    }

    function blocked(x, y, s) {
      return avoid.some(function (a) {
        return x + s > a.l && x < a.r && y + s > a.t && y < a.b;
      });
    }

    var count = Math.max(14, Math.min(55, Math.round(w * h / 30000)));

    for (var i = 0; i < count; i++) {
      var size = small ? 20 + Math.random() * 26 : 26 + Math.random() * 34;
      var x = 0, y = 0, ok = false;
      for (var tries = 0; tries < 30 && !ok; tries++) {
        x = Math.random() * (w - size);
        y = Math.random() * (h - size);
        ok = !blocked(x, y, size);
      }
      if (!ok) continue;

      var el = document.createElement('span');
      el.className = 'lily';
      el.innerHTML = LILY;
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      // Paler when the flowers can sit behind text, so the writing stays easy to read
      el.style.setProperty('--o', (avoidText ? 0.55 + Math.random() * 0.35 : 0.3 + Math.random() * 0.3).toFixed(2));
      el.style.setProperty('--d', (Math.random() * 2.4).toFixed(2) + 's');
      layer.appendChild(el);

      var rot = Math.random() * 360;
      el.style.transform = 'rotate(' + rot.toFixed(1) + 'deg)';

      lilies.push({
        el: el, size: size,
        hx: x, hy: y,            // home: where the flower started
        x: x, y: y,              // where it is now
        vx: 0, vy: 0,
        rot: rot, vr: 0,
        spin: (Math.random() - 0.5) * 0.3,
        phase: Math.random() * 6.28,
        lift: 0.6 + 0.8 * Math.max(0, Math.min(1, (60 - size) / 34)) // small flowers are lighter
      });
    }
  }

  var last = 0;

  function tick(now) {
    var dt = Math.min((now - last) / 16.67, 3) || 1;
    last = now;
    var t = now / 1000;

    // A breeze that is always blowing a little, with bigger gusts now and then
    var gust = Math.max(0, Math.sin(t * 0.35) * Math.sin(t * 0.13 + 1));
    var windX = (0.012 + 0.07 * gust) * WIND;
    var windY = Math.sin(t * 0.5) * 0.01 * WIND;

    mouse.vx *= Math.pow(0.9, dt);
    mouse.vy *= Math.pow(0.9, dt);
    var energy = Math.min(Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy) / 12, 1);
    var damping = Math.pow(0.97, dt);

    for (var i = 0; i < lilies.length; i++) {
      var L = lilies[i];

      var ax = windX * L.lift + Math.sin(t * 0.9 + L.phase) * 0.006 * WIND;
      var ay = windY * L.lift + Math.cos(t * 0.7 + L.phase) * 0.006 * WIND;

      // A gentle pull back toward where the flower started
      ax += (L.hx - L.x) * 0.0004;
      ay += (L.hy - L.y) * 0.0004;

      // The mouse pushes flowers away and carries them along
      var dx = L.x + L.size / 2 - mouse.x;
      var dy = L.y + L.size / 2 - mouse.y;
      var d = Math.sqrt(dx * dx + dy * dy) || 1;
      if (d < RADIUS) {
        var f = 1 - d / RADIUS;
        var push = f * f * 0.9 * (0.25 + 0.75 * energy) * MOUSE_POWER;
        ax += dx / d * push + mouse.vx * f * 0.012 * MOUSE_POWER;
        ay += dy / d * push + mouse.vy * f * 0.012 * MOUSE_POWER;
      }

      L.vx = (L.vx + ax * dt) * damping;
      L.vy = (L.vy + ay * dt) * damping;
      var speed = Math.sqrt(L.vx * L.vx + L.vy * L.vy);
      if (speed > 12) { L.vx *= 12 / speed; L.vy *= 12 / speed; }
      L.x += L.vx * dt;
      L.y += L.vy * dt;

      // Flowers turn a little as they travel
      L.vr += (L.vx * 0.6 + L.spin - L.vr) * 0.05 * dt;
      L.rot += L.vr * dt;

      L.el.style.transform =
        'translate3d(' + (L.x - L.hx).toFixed(1) + 'px,' + (L.y - L.hy).toFixed(1) + 'px,0) rotate(' + L.rot.toFixed(1) + 'deg)';
    }

    requestAnimationFrame(tick);
  }

  function bloom() {
    if (bloomed) return;
    bloomed = true;

    var layer = document.createElement('div');
    layer.className = 'lilies';
    layer.setAttribute('aria-hidden', 'true');
    layer.style.height = Math.max(document.documentElement.scrollHeight, window.innerHeight) + 'px';
    document.body.appendChild(layer);

    place(layer);
    if (!reduceMotion) requestAnimationFrame(tick);
  }

  // They bloom at the same moment the reflection's picture appears
  new MutationObserver(function () {
    if (picture.classList.contains('show')) bloom();
  }).observe(picture, { attributes: true, attributeFilter: ['class'] });
})();