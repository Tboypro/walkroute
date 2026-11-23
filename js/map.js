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
    g.append(el('circle', { cx: nx, cy: ny, r: 5, class: 'door' }));
    const [lx, ly] = place.rect ? [place.rect[0] + place.rect[2] / 2, place.rect[1] + place.rect[3] / 2] : [nx, ny - 22];
    g.append(el('text', { x: lx, y: ly + 4, class: 'label' }, place.short));
    g.setAttribute('tabindex', '0');
    g.setAttribute('role', 'button');
    g.setAttribute('aria-label', place.name);
    g.addEventListener('click', () => onPick && onPick(place.id));
    g.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onPick && onPick(place.id);
      }
    });
    groups.set(place.id, g);
    layers.places.append(g);
  }

  // Highlight one building (or none, with null).
  api.select = (id) => {
    for (const [placeId, g] of groups) g.classList.toggle('selected', placeId === id);
  };

  // Draw the route as a blue line with a green start and a red end.
  api.showRoute = (points) => {
    api.clearRoute();
    const line = points.map((p) => p.join(',')).join(' ');
    layers.route.append(el('polyline', { points: line, class: 'route-casing' }), el('polyline', { points: line, class: 'route-line' }));
    const [sx, sy] = points[0];
    const [ex, ey] = points[points.length - 1];
    layers.pins.append(el('circle', { cx: sx, cy: sy, r: 9, class: 'pin-start' }), el('circle', { cx: ex, cy: ey, r: 9, class: 'pin-end' }));
  };
  api.clearRoute = () => {
    layers.route.replaceChildren();
    layers.pins.replaceChildren();
  };

  return api;
}
