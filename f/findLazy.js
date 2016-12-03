function find(it, f) {
  for (let v of it)
    if (f(v)) return v; 
}