function takeWhile(arr, f) {
  let ok = true;
  return arr.filter(e => ok && (ok = f(e)));
}

// Example:
takeWhile([1, 2, 3, 4], e => e < 3);
// returns [1, 2]
