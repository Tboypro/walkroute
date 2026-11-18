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

## PLACES

The things people can search for.

| Field | Meaning |
| --- | --- |
| `id` | Must match a spot in `NODES`. That spot is the door. |
| `name` | The full name, shown on the card. |
| `short` | A short name drawn on the map. |
| `type` | A small label, like `Study` or `Food`. |
| `nick` | Other names people might type. |
| `rect` | The building shape `[x, y, width, height]`, or `null` for a landmark. |
| `about`, `hours`, `facilities` | Shown on the card. |

`GRASS` and `POND` only decorate the map.
