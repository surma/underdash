it('intersect two arrays', function () {
  expect(f([1,2,3,4], [2,4,6,8], (a, b) => a===b)).to.deep.equal([2,4]);
});