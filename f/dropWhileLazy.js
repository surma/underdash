function* dropWhile(it, f) {
  it = it[Symbol.iterator]();
  for (let v of it)
    if (!f(v)) {
      yield v;
      break;
    }
  yield* it;
}

// Example:
dropWhile([1, 2, 3, 4], e => e < 3);
// returns [3, 4]
