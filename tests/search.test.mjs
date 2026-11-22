import { test } from 'node:test';
import assert from 'node:assert/strict';
import { searchPlaces } from '../js/search.js';
import { PLACES } from '../js/data.js';

test('an empty search finds nothing', () => {
  assert.deepEqual(searchPlaces(PLACES, ''), []);
  assert.deepEqual(searchPlaces(PLACES, '   '), []);
});

test('finds a place by the start of its name', () => {
  assert.equal(searchPlaces(PLACES, 'lib')[0].id, 'library');
});

test('finds a place by a nickname', () => {
  assert.equal(searchPlaces(PLACES, 'canteen')[0].id, 'hub');
  assert.equal(searchPlaces(PLACES, 'GYM')[0].id, 'sports');
});

test('an exact name comes before a partial match', () => {
  assert.equal(searchPlaces(PLACES, 'Science Block')[0].id, 'science');
});

test('a search with no match gives an empty list', () => {
  assert.deepEqual(searchPlaces(PLACES, 'zzzz'), []);
});
