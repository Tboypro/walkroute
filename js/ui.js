// The bottom sheet and the search box. Plain DOM, no libraries.

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
  );
}
