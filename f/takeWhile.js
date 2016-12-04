function takeWhile(f) {
  let ok = true;
  return this.filter(e => ok && (ok = f(e)));
};