function* flatten(it) {
  for (let v of it) {
    if (v[Symbol.iterator])
      yield* v;
    else
      yield v;
  }
}

// Example:
flatten([1, [2, 3], [[4]]]);
// returns [1, 2, 3, [4]
