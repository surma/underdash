function flatten() {
  return Array.prototype.concat.apply([], this);
}