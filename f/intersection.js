function intersection(a1, a2, eq) {
  return a1.filter(e1 => a2.some(e2 => eq(e1, e2)));
}

// Example:
intersection([1, 2, 3], [2, 4, 6], (a, b) => a === b);
// returns [2]
