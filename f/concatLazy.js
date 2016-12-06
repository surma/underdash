function* concat(...its) {
  for (let it of its) yield* it;
}