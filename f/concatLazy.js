function* concat(it1, it2) {
  for (let v of it1) yield v;
  for (let v of it2) yield v;
}