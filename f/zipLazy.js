function* zip(it1, it2) {
  [it1, it2] = [it1, it2].map(it => it[Symbol.iterator]());
  for(let v of it1) {
    yield [v, it2.next().value];
  }
}