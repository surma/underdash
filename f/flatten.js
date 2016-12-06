function flatten(arr) {
  return Array.prototype.concat.apply([], arr);
}

// Example:
flatten([1, [2, 3], [[4]]]);
// returns [1, 2, 3, [4]]
