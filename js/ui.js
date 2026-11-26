// The bottom sheet and the search box. Plain DOM, no libraries.
import { searchPlaces } from './search.js';
import { SCALE } from './data.js';
import { walkMinutes } from './graph.js';

// Make an HTML element in one line.
function h(tag, props = {}, ...kids) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (key === 'class') node.className = value;
    else if (key.startsWith('on')) {
      if (typeof value === 'function') node.addEventListener(key.slice(2), value);
    } else node.setAttribute(key, value);
  }
  node.append(...kids.filter((kid) => kid != null && kid !== false));
  return node;
}

const chip = (text) => h('span', { class: 'chip' }, text);

function formatMetres(metres) {
  return metres < 1000 ? Math.round(metres / 5) * 5 + ' m' : (metres / 1000).toFixed(1) + ' km';
}

// A card about one place.
export function showCard(sheet, place, { onDirections, onClose } = {}) {
  sheet.replaceChildren(
    h('div', { class: 'handle' }),
    h('div', { class: 'row' }, h('h2', {}, place.name), h('button', { class: 'icon', 'aria-label': 'Close', onclick: onClose }, '×')),
    h('div', { class: 'chips' }, chip(place.type)),
    h('p', { class: 'about' }, place.about),
    h('p', { class: 'hours' }, 'Open: ' + place.hours),
    h('div', { class: 'chips' }, ...place.facilities.map((f) => chip(f))),
    onDirections && h('button', { class: 'primary', onclick: onDirections }, 'Directions'),
  );
}

// The search box. Shows up to five matches under it.
export function setupSearch(input, list, places, onPick) {
  const close = () => {
    list.replaceChildren();
    list.hidden = true;
  };
  input.addEventListener('input', () => {
    const text = input.value.trim();
    if (!text) return close();
    const rows = searchPlaces(places, text).slice(0, 5).map((p) =>
      h('li', {}, h('button', { onclick: () => { input.value = p.name; close(); onPick(p.id); } }, h('b', {}, p.name), h('span', {}, p.type))));
    list.replaceChildren(...(rows.length ? rows : [h('li', { class: 'none' }, 'No place found')]));
    list.hidden = false;
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      input.value = '';
      close();
    }
  });
}

// The route card: where from, how far, how long.
export function showRoute(sheet, { places, from, to, metres, minutes, onFrom, onStart, onBack }) {
  const here = metres === 0; // start and end are the same place
  const select = h('select', { 'aria-label': 'Start from', onchange: (e) => onFrom(e.target.value) },
    ...places.map((p) => {
      const option = h('option', { value: p.id }, p.name);
      option.selected = p.id === from;
      return option;
    }));
  sheet.replaceChildren(
    h('div', { class: 'handle' }),
    h('div', { class: 'row' }, h('h2', {}, 'To ' + to.name), h('button', { class: 'icon', 'aria-label': 'Back', onclick: onBack }, '←')),
    h('label', { class: 'from' }, 'From', select),
    here ? h('p', { class: 'trip' }, 'You are already here. Pick another start.')
      : h('p', { class: 'trip' }, h('b', {}, formatMetres(metres)), ' · ' + minutes + ' min walk'),
    h('p', { class: 'note' }, 'Walking time is an estimate.'),
    !here && onStart && h('button', { class: 'primary', onclick: onStart }, 'Start walking'),
  );
}

// The card shown while the dot walks. `update` is called many times a second.
export function showNav(sheet, { to, onStop, onFast }) {
  const left = h('b');
  const time = h('span');
  const bar = h('div', { class: 'bar' }, h('i'));
  const fast = h('label', { class: 'fast' }, h('input', { type: 'checkbox', onchange: (e) => onFast(e.target.checked) }), 'Fast demo');
  fast.firstChild.checked = true;
  sheet.replaceChildren(
    h('div', { class: 'handle' }),
    h('h2', {}, 'Walking to ' + to.name),
    h('p', { class: 'trip' }, left, ' left · ', time),
    bar,
    fast,
    h('button', { class: 'ghost', onclick: onStop }, 'Stop'),
  );
  return {
    update(walked, total) {
      const metres = (total - walked) * SCALE;
      left.textContent = formatMetres(metres);
      time.textContent = walkMinutes(metres) + ' min';
      bar.firstChild.style.width = (total ? (walked / total) * 100 : 100) + '%';
    },
  };
}

export function showArrived(sheet, { to, onDone, onAgain }) {
  sheet.replaceChildren(
    h('div', { class: 'handle' }),
    h('div', { class: 'arrived' }, h('div', { class: 'tick' }, '✓'), h('h2', {}, 'You have arrived'), h('p', {}, to.name + ' is right here.')),
    h('button', { class: 'primary', onclick: onDone }, 'Done'),
    h('button', { class: 'ghost', onclick: onAgain }, 'Walk it again'),
  );
}
