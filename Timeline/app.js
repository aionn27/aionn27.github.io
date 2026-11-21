// The timeline: builds the era bar, pops out philosophers, and shows their works.
(function () {
  var bar = document.getElementById('bar');
  var stage = document.getElementById('stage');
  var detail = document.getElementById('detail');
  var hint = stage.innerHTML;          // the "choose an era" message
  var currentEra = null;
  var currentPerson = null;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function findEra(id) {
    for (var i = 0; i < ERAS.length; i++) {
      if (ERAS[i].id === id) return ERAS[i];
    }
    return null;
  }

  function findPerson(era, id) {
    for (var i = 0; i < era.philosophers.length; i++) {
      if (era.philosophers[i].id === id) return era.philosophers[i];
    }
    return null;
  }

  // Keep the address bar in sync, so a link like #modern/kant opens that philosopher
  function updateHash() {
    var hash = currentEra ? '#' + currentEra + (currentPerson ? '/' + currentPerson : '') : '';
    history.replaceState(null, '', location.pathname + location.search + hash);
  }

  function markEras() {
    var buttons = bar.querySelectorAll('.era');
    for (var i = 0; i < buttons.length; i++) {
      var on = buttons[i].getAttribute('data-era') === currentEra;
      buttons[i].classList.toggle('active', on);
      buttons[i].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
    bar.classList.toggle('has-active', !!currentEra);
  }

  function markPins() {
    var pins = stage.querySelectorAll('.pin');
    for (var i = 0; i < pins.length; i++) {
      var on = pins[i].getAttribute('data-id') === currentPerson;
      pins[i].classList.toggle('active', on);
      pins[i].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
  }

  function clearAll() {
    currentEra = null;
    currentPerson = null;
    stage.classList.remove('open');
    stage.innerHTML = hint;
    detail.innerHTML = '';
    detail.className = 'detail';
    markEras();
    updateHash();
  }

  function renderStage(era) {
    stage.innerHTML = '';
    stage.classList.add('open');
    stage.style.setProperty('--c', era.color);

    var pins = el('div', 'pins');
    era.philosophers.forEach(function (person, i) {
      var pin = el('button', 'pin');
      pin.type = 'button';
      pin.setAttribute('data-id', person.id);
      pin.setAttribute('aria-pressed', 'false');
      pin.style.setProperty('--i', i);
      pin.appendChild(el('span', 'stem'));
      pin.appendChild(el('span', 'dot'));
      pin.appendChild(el('span', 'pname', person.name));
      pin.appendChild(el('span', 'years', person.years));
      pin.addEventListener('click', function () { selectPerson(person.id, true); });
      pins.appendChild(pin);
    });
    stage.appendChild(pins);
    stage.appendChild(el('p', 'blurb', era.blurb));
  }

  function renderDetail(era, person) {
    detail.innerHTML = '';
    detail.style.setProperty('--c', era.color);

    // left column: who they are. right column: their works
    var left = el('div', 'd-left');
    left.appendChild(el('h2', '', person.name));
    left.appendChild(el('p', 'meta', person.years + '  ·  ' + era.name + ' era'));
    left.appendChild(el('p', 'about', person.about));

    var right = el('div', 'd-right');
    right.appendChild(el('h3', '', 'Major works'));

    var list = el('ul', 'works');
    person.works.forEach(function (work) {
      var item = el('li');
      item.appendChild(el('span', 'wyear', work.year || '–'));
      var body = el('span', 'wbody');
      body.appendChild(el('span', 'wtitle', work.title));
      if (work.note) body.appendChild(el('span', 'wnote', work.note));
      item.appendChild(body);
      list.appendChild(item);
    });
    right.appendChild(list);

    if (person.note) right.appendChild(el('p', 'fine', person.note));

    detail.appendChild(left);
    detail.appendChild(right);

    // restart the fade-in each time
    detail.className = 'detail';
    void detail.offsetWidth;
    detail.className = 'detail show';
  }

  function selectEra(id, fromUser) {
    var era = findEra(id);
    if (!era) return;

    // clicking the open era again closes it
    if (fromUser && currentEra === id) { clearAll(); return; }

    currentEra = id;
    currentPerson = null;
    renderStage(era);
    detail.innerHTML = '';
    detail.className = 'detail';
    markEras();
    updateHash();
  }

  function selectPerson(id, fromUser) {
    var era = findEra(currentEra);
    if (!era) return;
    var person = findPerson(era, id);
    if (!person) return;

    currentPerson = id;
    markPins();
    renderDetail(era, person);
    updateHash();

    if (fromUser) {
      detail.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
    }
  }

  // Build the four era buttons
  ERAS.forEach(function (era) {
    var button = el('button', 'era');
    button.type = 'button';
    button.setAttribute('data-era', era.id);
    button.setAttribute('aria-pressed', 'false');
    button.style.setProperty('--c', era.color);

    var label = el('span', 'label');
    label.appendChild(el('span', 'name', era.name));
    label.appendChild(el('span', 'dates', era.dates));
    button.appendChild(label);
    button.appendChild(el('span', 'line'));

    button.addEventListener('click', function () { selectEra(era.id, true); });
    bar.appendChild(button);
  });

  // Open straight to an era or philosopher if the address has one (for example #modern/kant)
  var parts = location.hash.replace('#', '').split('/');
  if (parts[0]) {
    selectEra(parts[0], false);
    if (parts[1]) selectPerson(parts[1], false);
  }
})();
