function find(it, f) {
  for (let v of it)
    if (f(v)) return v; 
}

// Example:
find([1, 2, 3, 4], e => e > 2);
// returns 3
