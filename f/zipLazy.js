function* zip(it1, it2) {
  [it1, it2] = [it1, it2].map(it => it[Symbol.iterator]());
  for(let v1 of it1) {
    const v2 = it2.next();
    if (v2.done) return;
    yield [v1, v2.value];
  }
}