function some(it, f) {
  for(let v of it) 
    if(f(v)) return true;
  return false;
}

// Example:
some([1, 2, 3, 4], e => e % 3 === 0);
// returns true
