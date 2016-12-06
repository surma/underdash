function zip(...arrs) {
  const resultLength = arrs.map(a => a.length).reduce((a, b) => a<b?a:b, arrs[0].length);
  return new Array(resultLength)
    .fill(0)
    .map((_, i) => arrs.map(a => a[i]));
}