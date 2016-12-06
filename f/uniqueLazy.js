function* unique(it, f) {
  const buffer = [];
  for (let v of it) {
    const fv = f(v);
    if (buffer.indexOf(fv) !== -1) continue;
    buffer.push(fv);
    yield v;
  }
}

// Example:
unique([{i:0,v:2},{i:1,v:3},{i:2,v:2}], e => e.v);
// returns [{i:0,v:2},{i:1,v:3}]
