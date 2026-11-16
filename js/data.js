// All of this data is made up for the demo. It is not a real place.
// The map is 1000 x 640 units. One unit is about 0.6 metres.

export const SCALE = 0.6;

// Every spot on a path: [x, y]
export const NODES = {
  gate: [80, 560], j1: [200, 560], j2: [200, 400], j3: [200, 200],
  j4: [450, 400], j5: [450, 200], j6: [450, 560],
  j7: [720, 400], j8: [720, 200], j9: [720, 560],
  admin: [200, 480], clinic: [325, 200], library: [450, 300],
  science: [590, 200], engineering: [585, 400], hub: [585, 560],
  lt: [720, 300], sports: [880, 560],
};

// A path is a list of spots. Spots next to each other are joined.
export const PATHS = [
  ['gate', 'j1', 'j6', 'hub', 'j9', 'sports'],
  ['j1', 'admin', 'j2', 'j3'],
  ['j2', 'j4', 'engineering', 'j7'],
  ['j3', 'clinic', 'j5', 'science', 'j8'],
  ['j6', 'j4', 'library', 'j5'],
  ['j9', 'j7', 'lt', 'j8'],
  ['j4', 'j9'], // a shortcut across the middle
];
