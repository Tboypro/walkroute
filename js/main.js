// Connects the map, the search box and the bottom sheet.
import { createMap } from './map.js';
import { PLACES } from './data.js';
import { showCard } from './ui.js';
import { setupSearch } from './ui.js';

const byId = new Map(PLACES.map((p) => [p.id, p]));
const sheet = document.getElementById('sheet');
const map = createMap(document.getElementById('map'), { onPick: pick });
let to = null; // where we are going

// Tap a building (on the map or in the search): show its card.
function pick(id) {
  to = id;
  map.select(id);
  showCard(sheet, byId.get(id), { onClose: reset });
}

// Close everything and go back to the plain map.
function reset() {
  to = null;
  map.select(null);
  sheet.replaceChildren();
}

// Directions: find the shortest way and show it.

// Start: the dot walks the route by itself. It is a simulation and never uses GPS.

setupSearch(document.getElementById('search'), document.getElementById('results'), PLACES, pick);
