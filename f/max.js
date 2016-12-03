Array.prototype.max = function(gt) {
  return this.slice(1).reduce((max, cur) => gt(max, cur)?max:cur, this[0]);
}