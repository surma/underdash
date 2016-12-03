function* filter(it, f) {
  for (let v of it) {
    if (!f(v)) continue;
    yield v;
  }
}