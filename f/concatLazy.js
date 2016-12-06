function* concat(...its) {
  for (let it of its) yield* it;
}

// Example:
concat([1, 2], [3, 4], [5, 6]);
// returns [1, 2, 3, 4, 5, 6]
