function some(it, f) {
  for(let v of it) 
    if(f(v)) return true;
  return false;
}