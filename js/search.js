// Find places by name or nickname. The best matches come first.
export function searchPlaces(places, query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const found = [];
  for (const place of places) {
    let score = 0;
    for (const name of [place.name, ...place.nick].map((n) => n.toLowerCase())) {
      if (name === q) score = Math.max(score, 4);
      else if (name.startsWith(q)) score = Math.max(score, 3);
      else if (name.split(' ').some((word) => word.startsWith(q))) score = Math.max(score, 2);
      else if (name.includes(q)) score = Math.max(score, 1);
    }
    if (score) found.push({ place, score });
  }
  found.sort((a, b) => b.score - a.score || a.place.name.localeCompare(b.place.name));
  return found.map((f) => f.place);
}
