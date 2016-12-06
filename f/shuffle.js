function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
  return a;
}

// Example:
shuffle([1, 2, 3, 4])
// might return [2, 4, 1, 3] (or something)
