function* flatten(it) {
  for (let v of it) {
    if (v[Symbol.iterator])
      yield* v;
    else
      yield v;
  }
}