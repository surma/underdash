function some(it, f) {
  for(let v of it)
    if(f(it)) return true;
  return false;
}