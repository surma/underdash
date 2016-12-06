function max(arr, gt) {
  return arr.slice(1).reduce((max, cur) => gt(max, cur)?max:cur, arr[0]);
}

// Example:
max([{i:0,v:1},{i:1,v:9},{i:2,v:-2}], (a, b) => a.v > b.v);
// returns {i:1, v:9}
