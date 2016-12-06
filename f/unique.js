function unique(arr, f) {
  const vArr = arr.map(f);
  return arr.filter((_, i) => vArr.indexOf(vArr[i]) === i);
}

// Example:
unique([{i:0,v:2},{i:1,v:3},{i:2,v:2}], e => e.v);
// returns [{i:0,v:2},{i:1,v:3}]
