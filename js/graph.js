// Turns the paths into a graph and finds the shortest way between two spots.
import { NODES, PATHS, SCALE } from './data.js';

// Straight-line distance between two [x, y] points.
export function distance(p, q) {
  return Math.hypot(p[0] - q[0], p[1] - q[1]);
}

// Each spot knows its neighbours and how far away they are, in metres.
export function buildGraph(nodes = NODES, paths = PATHS, scale = SCALE) {
  const graph = new Map(Object.keys(nodes).map((id) => [id, []]));
  for (const path of paths) {
    for (let i = 1; i < path.length; i++) {
      const a = path[i - 1];
      const b = path[i];
      const metres = distance(nodes[a], nodes[b]) * scale;
      graph.get(a).push({ to: b, metres });
      graph.get(b).push({ to: a, metres });
    }
  }
  return graph;
}

// Dijkstra's search. Gives the spots from `from` to `to`, and the total metres.
export function shortestPath(graph, from, to) {
  if (!graph.has(from) || !graph.has(to)) return null;
  const best = new Map([[from, 0]]); // shortest distance found so far
  const before = new Map(); // which spot we came from
  const todo = new Set([from]);
  while (todo.size) {
    // Take the closest spot. The graph is small, so a plain scan is fine.
    let here = null;
    for (const id of todo) if (here === null || best.get(id) < best.get(here)) here = id;
    todo.delete(here);
    if (here === to) break;
    for (const { to: next, metres } of graph.get(here)) {
      const total = best.get(here) + metres;
      if (total < (best.has(next) ? best.get(next) : Infinity)) {
        best.set(next, total);
        before.set(next, here);
        todo.add(next);
      }
    }
  }
  if (!best.has(to)) return null;
  const spots = [to];
  while (spots[0] !== from) spots.unshift(before.get(spots[0]));
  return { nodes: spots, metres: best.get(to) };
}

export const METRES_PER_MINUTE = 78; // a normal walking pace

export function walkMinutes(metres) {
  return Math.max(1, Math.round(metres / METRES_PER_MINUTE));
}

// Spot ids -> [x, y] points.
export function routePoints(ids, nodes = NODES) {
  return ids.map((id) => nodes[id]);
}

// Total length of a line, in map units.
export function lengthOf(points) {
  let total = 0;
  for (let i = 1; i < points.length; i++) total += distance(points[i - 1], points[i]);
  return total;
}

// Where you are after walking `units` along the line, and which way you face.
export function pointAlong(points, units) {
  let left = Math.max(0, units);
  for (let i = 1; i < points.length; i++) {
    const length = distance(points[i - 1], points[i]);
    if (left <= length || i === points.length - 1) {
      const t = length === 0 ? 1 : Math.min(1, left / length);
      const [ax, ay] = points[i - 1];
      const [bx, by] = points[i];
      return { x: ax + (bx - ax) * t, y: ay + (by - ay) * t, angle: Math.atan2(by - ay, bx - ax) };
    }
    left -= length;
  }
  return { x: points[0][0], y: points[0][1], angle: 0 };
}
