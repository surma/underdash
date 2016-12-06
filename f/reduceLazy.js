function reduce(it, f, v0) {
  for(let v of it) v0 = f(v0, v);
  return v0;
}

// Example:
reduce([1, 2, 3], (acc, cur) => acc + cur, 0);
// returns 6
