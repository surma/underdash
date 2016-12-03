function* unique(it, f) {
  const buffer = [];
  for (let v of it) {
    const fv = f(v);
    if (buffer.indexOf(fv) !== -1) continue;
    buffer.push(fv);
    yield fv;
  }
} 