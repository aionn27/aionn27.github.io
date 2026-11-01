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