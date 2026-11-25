// A pretend walker. It moves a dot along the route by itself.
// This is a simulation: it never reads the phone's location.
import { pointAlong, lengthOf } from './graph.js';
import { SCALE } from './data.js';

const REAL_SPEED = 1.4; // a normal walk, in metres per second
const DEMO_BOOST = 8; // the fast demo is this many times quicker

export function startWalk(points, { onTick, onArrive }) {
  const total = lengthOf(points); // route length in map units
  let walked = 0;
  let last = null;
  let frame = 0;
  let stopped = false;
  let fast = true;

  function step(now) {
    if (stopped) return;
    const seconds = last === null ? 0 : Math.min((now - last) / 1000, 0.1); // a slow frame cannot make a big jump
    last = now;
    walked = Math.min(total, walked + (REAL_SPEED * (fast ? DEMO_BOOST : 1) * seconds) / SCALE);
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
    setFast(on) { fast = on; },
  };
}
