// Connects the map, the search box and the bottom sheet.
import { createMap } from './map.js';
import { PLACES } from './data.js';
import { showCard } from './ui.js';
import { setupSearch } from './ui.js';
import { buildGraph, shortestPath, walkMinutes, routePoints } from './graph.js';
import { showRoute } from './ui.js';
import { startWalk } from './walk.js';
import { showNav } from './ui.js';
import { showArrived } from './ui.js';

const byId = new Map(PLACES.map((p) => [p.id, p]));
const sheet = document.getElementById('sheet');
const map = createMap(document.getElementById('map'), { onPick: pick });
let to = null; // where we are going
const graph = buildGraph();
const START = 'gate'; // routes start at the main gate unless you pick another place
let from = START;
let walker = null; // the walk that is running now

// Tap a building (on the map or in the search): show its card.
function pick(id) {
  stopWalk();
  to = id;
  map.clearRoute();
  map.select(id);
  showCard(sheet, byId.get(id), { onDirections: planRoute, onClose: reset });
}

// Close everything and go back to the plain map.
function reset() {
  stopWalk();
  to = null;
  map.select(null);
  map.clearRoute();
  sheet.replaceChildren();
}

// Directions: find the shortest way and show it.
function planRoute() {
  stopWalk();
  const result = shortestPath(graph, from, to);
  if (!result) return;
  const points = routePoints(result.nodes);
  map.showRoute(points);
  showRoute(sheet, {
    places: PLACES, from, to: byId.get(to), metres: result.metres, minutes: walkMinutes(result.metres),
    onFrom: (id) => { from = id; planRoute(); },
    onStart: () => begin(points),
    onBack: () => pick(to),
  });
}

// Start: the dot walks the route by itself. It is a simulation and never uses GPS.
function begin(points) {
  stopWalk();
  const hud = showNav(sheet, { to: byId.get(to), onStop: planRoute });
  walker = startWalk(points, {
    onTick: ({ x, y, angle, walked, total }) => {
      map.setDot(x, y, angle);
      hud.update(walked, total);
    },
    onArrive: () => showArrived(sheet, { to: byId.get(to), onDone: reset, onAgain: planRoute }),
  });
}

function stopWalk() {
  if (walker) walker.stop();
  walker = null;
  map.hideDot();
}

setupSearch(document.getElementById('search'), document.getElementById('results'), PLACES, pick);
