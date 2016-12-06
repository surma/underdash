function min(arr, gt) {
  return arr.slice(1).reduce((min, cur) => gt(min, cur)?cur:min, arr[0]);
}

// Example:
min([{i:0,v:1},{i:1,v:9},{i:2,v:-2}], (a, b) => a.v > b.v);
// returns {i:2, v:-2}
