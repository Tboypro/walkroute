# Data format

All the map data lives in `js/data.js`. It is made up. You can change it to draw a different small area.

## SCALE

How many metres one map unit is. The map is 1000 x 640 units, and `SCALE = 0.6`, so the map is about 600 m wide.

## NODES

Every spot on a path, as `[x, y]`. Doors, junctions and path ends are all spots.

```js
gate: [80, 560],
j1: [200, 560],
```

## PATHS

A path is a list of spot names. Spots next to each other in the list are joined by a straight line, and you can walk both ways.

```js
['gate', 'j1', 'j6', 'hub', 'j9', 'sports']
```

Two paths meet where they share the same spot name.
