function max(it, gt) {
  let max = undefined;
  for(let v of it) {
    if(!max) {
      max = v;
      continue;
    }
    max = gt(max, v)?max:v;
  }
  return max;
}