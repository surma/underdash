function* filter(it, f) {
  for (let v of it) {
    if (!f(v)) continue;
    yield v;
  }
}

// Example:
filter([1, 2, 3, 4], e => e % 2 == 0);
// return [2, 4]
