function every(it, f) {
  let ok = true;
  for (let v of it) ok = ok && f(v);
  return ok;
}

// Example:
every([1, 2, 3, 4], e => e < 5);
// returs true
