// Draws the area as an SVG map and gives simple functions to control it.
import { NODES, PATHS, PLACES, GRASS, POND } from './data.js';

const NS = 'http://www.w3.org/2000/svg';
const W = 1000;
const H = 640; // the size of the map space

// Make an SVG element in one line.
function el(tag, attrs = {}, ...kids) {
  const node = document.createElementNS(NS, tag);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
  node.append(...kids);
  return node;
}

export function createMap(container, { onPick } = {}) {
  const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, 'aria-label': 'Map of the demo area' });
  const layers = {};
  for (const name of ['ground', 'roads', 'route', 'places', 'pins', 'dot']) layers[name] = el('g', { class: name });
  svg.append(el('rect', { width: W, height: H, class: 'map-ground' }), ...Object.values(layers));
  container.replaceChildren(svg);
  const api = {};

  // Grass, pond and the title
  for (const [x, y, w, h] of GRASS) layers.ground.append(el('rect', { x, y, width: w, height: h, rx: 14, class: 'grass' }));
  layers.ground.append(
    el('ellipse', { cx: POND.x, cy: POND.y, rx: POND.rx, ry: POND.ry, class: 'pond' }),
    el('text', { x: 24, y: 36, class: 'map-title' }, 'Sunrise Grounds (demo area)'),
  );

  // Paths: a wide edge first, then the lighter middle on top
  for (const cls of ['road-edge', 'road']) {
    for (const path of PATHS) {
      layers.roads.append(el('polyline', { points: path.map((id) => NODES[id].join(',')).join(' '), class: cls }));
    }
  }

  // Buildings
  const groups = new Map();
  for (const place of PLACES) {
    const g = el('g', { class: 'place', 'data-id': place.id });
    const [nx, ny] = NODES[place.id];
    if (place.rect) {
      const [x, y, w, h] = place.rect;
      g.append(el('rect', { x, y, width: w, height: h, rx: 8, class: 'house' }));
    } else {
      g.append(el('circle', { cx: nx, cy: ny, r: 12, class: 'landmark' }));
    }
    groups.set(place.id, g);
    layers.places.append(g);
  }

  return api;
}
