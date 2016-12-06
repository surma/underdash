function* map(it, f) {
  for (let v of it) 
    yield f(v);
}

// Example:
map([1, 2, 3], e => e*e)
// return [1, 4, 9]
