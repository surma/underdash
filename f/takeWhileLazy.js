function* takeWhile(it, f) {
  for (let v of it) {
    if (!f(v)) return;
    yield v;
  }
}

// Example:
takeWhile([1, 2, 3, 4], e => e < 3);
// returns [1, 2]
