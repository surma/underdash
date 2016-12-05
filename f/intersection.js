function intersection(a1, a2, eq) {
  return a1.filter(e1 => a2.some(e2 => eq(e1, e2)));
}