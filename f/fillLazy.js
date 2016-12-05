function* fill(it, v) {
  for (let _ of it) yield v;
}