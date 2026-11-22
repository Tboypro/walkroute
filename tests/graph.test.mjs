import { test } from 'node:test';
import assert from 'node:assert/strict';
import { NODES, PLACES } from '../js/data.js';
import { buildGraph } from '../js/graph.js';
import { shortestPath } from '../js/graph.js';

const graph = buildGraph();

test('every spot is in the graph and has a neighbour', () => {
  for (const id of Object.keys(NODES)) {
    assert.ok(graph.get(id).length > 0, id + ' has no neighbour');
  }
});

test('paths work both ways', () => {
  for (const [id, edges] of graph) {
    for (const { to, metres } of edges) {
      assert.ok(graph.get(to).some((e) => e.to === id && Math.abs(e.metres - metres) < 1e-9), id + ' <-> ' + to);
    }
  }
});

test('the way to the same place is zero metres', () => {
  assert.deepEqual(shortestPath(graph, 'gate', 'gate'), { nodes: ['gate'], metres: 0 });
});

test('the shortcut beats the long way round', () => {
  assert.deepEqual(shortestPath(graph, 'j4', 'j9').nodes, ['j4', 'j9']);
});

test('gate to science is about 522 metres', () => {
  const result = shortestPath(graph, 'gate', 'science');
  assert.ok(Math.abs(result.metres - 522) < 1, String(result.metres));
  assert.equal(result.nodes[0], 'gate');
  assert.equal(result.nodes.at(-1), 'science');
});

test('an unknown place gives no route', () => {
  assert.equal(shortestPath(graph, 'gate', 'nowhere'), null);
});
