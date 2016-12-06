function min(arr, gt) {
  return arr.slice(1).reduce((min, cur) => gt(min, cur)?cur:min, arr[0]);
}