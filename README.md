# Pocket Wayfinder

A small demo of a map and walking navigation app. Search a place, see the shortest route, start navigation, and watch the blue dot walk the path until you arrive.

> **This is a demo.** The area ("Sunrise Grounds"), its buildings and its paths are all made up. The blue dot moves by itself: this demo never reads your location.
> The full app is a private project.

**Status:** work in progress, built a little every day.

## What works so far

- A drawn map of the demo area
- Tap a building to see its card

## Run it on your computer

The app uses ES modules, so open it through a small web server. Double-clicking `index.html` will not work.

```bash
python -m http.server 8080
```

Then open http://localhost:8080 in your browser. (`npx serve` works too if you use Node.)

## Licence

All rights reserved. You can look at the code and run the demo. You may not copy or reuse it. See [LICENSE](LICENSE).
