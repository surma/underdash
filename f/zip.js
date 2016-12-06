function zip(...arrs) {
  const resultLength = Math.min(...arrs.map(a => a.length));
  return new Array(resultLength)
    .fill(0)
    .map((_, i) => arrs.map(a => a[i]));
}

// Example:
zip([1, 2, 3], [4, 5, 6], [7, 8, 9]);
// returns [[1,4,7], [2,5,8], [3,6,9]]
