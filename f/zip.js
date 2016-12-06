function zip(...arrs) {
  const resultLength = Math.min(...arrs.map(a => a.length));
  return new Array(resultLength)
    .fill(0)
    .map((_, i) => arrs.map(a => a[i]));
}