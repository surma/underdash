function unique(arr, f) {
  const vArr = arr.map(f);
  return arr.filter((_, i) => vArr.indexOf(vArr[i]) === i);
};