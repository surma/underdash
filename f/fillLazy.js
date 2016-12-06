function* fill(it, v) {
  for (let _ of it) yield v;
}

// Example:
fill([1, 2, 3], 0);
// returns [0, 0, 0]
