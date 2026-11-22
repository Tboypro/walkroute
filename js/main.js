// Connects the map, the search box and the bottom sheet.
import { createMap } from './map.js';

const map = createMap(document.getElementById('map'), { onPick: (id) => map.select(id) });

// Tap a building (on the map or in the search): show its card.

// Close everything and go back to the plain map.

// Directions: find the shortest way and show it.

// Start: the dot walks the route by itself. It is a simulation and never uses GPS.
