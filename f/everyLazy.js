function every(it, f) {
  let ok = true;
  for (let v of it) ok = ok && f(v);
  return ok;
}