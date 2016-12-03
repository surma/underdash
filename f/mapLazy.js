function* map(it, f) {
  for (let v of it) 
    yield f(v);
}