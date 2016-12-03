function min(it, gt) {
  let min = undefined;
  for(let v of it) {
    if(!min) {
      min = v;
      continue;
    }
    min = gt(min, v)?v:min;
  }
  return min;
}