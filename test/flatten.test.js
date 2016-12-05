it('removes one level or array nesting', function () {
  expect(f.call([[1],[2,3],4,[[5,6]]])).to.deep.equal([1,2,3,4,[5,6]]);
});
