function dropWhile(arr, f) {
  let ok = false;
  return arr.filter(e => ok || (ok = !f(e)));
};