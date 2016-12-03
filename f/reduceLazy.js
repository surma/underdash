function reduce(it, f, v0) {
  for(let v of it) v0 = f(v0, v);
  return v0;
}