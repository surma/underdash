function* takeWhile(it, f) {
  for (let v of it) 
    if (!f(v)) break;
  yield* it;
}