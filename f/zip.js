function zip(a, b) {
  return a.map((e, i) => [e, i < b.length && b[i]])
}