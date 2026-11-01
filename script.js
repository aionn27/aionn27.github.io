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
    line.textContent = 'she woke up. pet her.';
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