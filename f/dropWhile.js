function takeWhile(f) {
  let ok = false;
  return this.filter(e => ok || (ok = !f(e)));
};