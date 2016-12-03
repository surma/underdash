Array.prototype.unique = function (f) {
  const vArr = this.map(f);
  return this.filter((_, i) => vArr.indexOf(vArr[i]) === i);
};