function dropWhile(arr, f) {
  let ok = false;
  return arr.filter(e => ok || (ok = !f(e)));
};

// Example:
dropWhile([1, 2, 3, 4], e => e < 3);
// returns [3, 4]
