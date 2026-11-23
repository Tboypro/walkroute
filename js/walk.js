// A pretend walker. It moves a dot along the route by itself.
// This is a simulation: it never reads the phone's location.
import { pointAlong, lengthOf } from './graph.js';
import { SCALE } from './data.js';

const SPEED = 8; // metres per second. Fast, so the demo is short.

export function startWalk(points, { onTick, onArrive }) {
  const total = lengthOf(points); // route length in map units
  let walked = 0;
  let last = null;
  let frame = 0;
  let stopped = false;

  function step(now) {
    if (stopped) return;
    const seconds = last === null ? 0 : Math.min((now - last) / 1000, 0.1); // a slow frame cannot make a big jump
    last = now;
    walked = Math.min(total, walked + (SPEED * seconds) / SCALE);
    onTick({ ...pointAlong(points, walked), walked, total });
    if (walked >= total) {
      stopped = true;
      onArrive();
      return;
    }
    frame = requestAnimationFrame(step);
  }

  frame = requestAnimationFrame(step);
  return {
    stop() { stopped = true; cancelAnimationFrame(frame); },
  };
}
