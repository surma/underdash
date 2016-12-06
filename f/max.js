function max(arr, gt) {
  return arr.slice(1).reduce((max, cur) => gt(max, cur)?max:cur, arr[0]);
}