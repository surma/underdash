function zip(a, b) {
  const maxLength = Math.min(a.length, b.length);
  return a
    .map((e, i) => [e, i < b.length && b[i]])
    .slice(0, maxLength);
}