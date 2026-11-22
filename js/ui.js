// The bottom sheet and the search box. Plain DOM, no libraries.
import { searchPlaces } from './search.js';

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

// A card about one place.
export function showCard(sheet, place, { onDirections, onClose } = {}) {
  sheet.replaceChildren(
    h('div', { class: 'handle' }),
    h('div', { class: 'row' }, h('h2', {}, place.name), h('button', { class: 'icon', 'aria-label': 'Close', onclick: onClose }, '×')),
    h('div', { class: 'chips' }, chip(place.type)),
    h('p', { class: 'about' }, place.about),
    h('p', { class: 'hours' }, 'Open: ' + place.hours),
    h('div', { class: 'chips' }, ...place.facilities.map((f) => chip(f))),
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
