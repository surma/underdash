function* dropWhile(it, f) {
  it = it[Symbol.iterator]();
  for (let v of it)
    if (!f(v)) {
      yield v;
      break;
    }
  yield* it;
}