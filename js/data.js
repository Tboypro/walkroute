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

// The places people can search for. `id` is also the spot where the door is.
// `rect` is the building shape: [x, y, width, height].
export const PLACES = [
  { id: 'gate', name: 'Main Gate', short: 'Gate', type: 'Landmark', nick: ['entrance'], rect: null,
    about: 'The main entrance. Routes start here unless you pick another place.', hours: 'Always open', facilities: ['Security desk'] },
  { id: 'admin', name: 'Admin Block', short: 'Admin', type: 'Office', nick: ['registry', 'office'], rect: [110, 450, 70, 60],
    about: 'Records, the fee desk and the registrar.', hours: 'Mon-Fri 8am - 4pm', facilities: ['Fee desk', 'Records', 'Help desk'] },
  { id: 'clinic', name: 'Health Clinic', short: 'Clinic', type: 'Health', nick: ['hospital', 'medical'], rect: [285, 125, 80, 55],
    about: 'First aid and basic check-ups.', hours: 'Daily 8am - 6pm', facilities: ['First aid', 'Pharmacy'] },
  { id: 'library', name: 'Central Library', short: 'Library', type: 'Study', nick: ['books', 'reading room'], rect: [340, 265, 90, 70],
    about: 'Quiet study floors, books and shared computers.', hours: 'Mon-Sat 8am - 8pm', facilities: ['Wi-Fi', 'Computers', 'Quiet rooms'] },
  { id: 'science', name: 'Science Block', short: 'Science', type: 'Teaching', nick: ['labs', 'physics', 'chemistry'], rect: [545, 125, 90, 55],
    about: 'Teaching labs and classrooms for the sciences.', hours: 'Mon-Fri 7am - 6pm', facilities: ['Labs', 'Classrooms'] },
  { id: 'engineering', name: 'Engineering Workshop', short: 'Engineering', type: 'Teaching', nick: ['workshop', 'eng'], rect: [540, 330, 90, 55],
    about: 'Workshops and drawing studios.', hours: 'Mon-Fri 8am - 5pm', facilities: ['Workshop', 'Drawing studio'] },
  { id: 'hub', name: 'Student Hub', short: 'Hub', type: 'Food', nick: ['cafeteria', 'canteen', 'cafe'], rect: [540, 575, 90, 50],
    about: 'Food, drinks and a place to meet friends.', hours: 'Daily 7am - 9pm', facilities: ['Food', 'Seating', 'Wi-Fi'] },
  { id: 'lt', name: 'Lecture Theatre A', short: 'LT A', type: 'Lecture', nick: ['lecture hall', 'theatre'], rect: [740, 265, 90, 70],
    about: 'The biggest lecture hall. It seats 400.', hours: 'Mon-Fri 7am - 7pm', facilities: ['Projector', 'Air conditioning'] },
  { id: 'sports', name: 'Sports Centre', short: 'Sports', type: 'Sports', nick: ['gym', 'football'], rect: [840, 490, 100, 55],
    about: 'Gym, indoor courts and changing rooms.', hours: 'Daily 6am - 9pm', facilities: ['Gym', 'Courts', 'Showers'] },
];

// Decoration only: [x, y, width, height] for grass, and one pond.
export const GRASS = [[225, 225, 200, 150], [480, 230, 210, 140], [20, 600, 140, 30]];
export const POND = { x: 320, y: 490, rx: 60, ry: 38 };
