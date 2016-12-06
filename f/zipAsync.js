async function* zip(...its) {
  its = its.map(it => it[Symbol.iterator]());
  while(true) {
    const vs = await Promise.all(its.map(it => it.next()));
    if (vs.some(v => v.done)) return;
    yield vs.map(v => v.value);
  }
}

// Example:
zip([1, 2, 3], [4, 5, 6], [7, 8, 9]);
// returns [[1,4,7], [2,5,8], [3,6,9]]
