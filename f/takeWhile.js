function takeWhile(arr, f) {
  let ok = true;
  return arr.filter(e => ok && (ok = f(e)));
};