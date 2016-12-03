function* takeWhile(it, f) {
  for (let v of it) {
    if (!f(v)) return;
    yield v;
  }
}