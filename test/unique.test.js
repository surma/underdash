it('return true if condition is met at least once', function () {
  expect(f([1,9,2,9,1,4,2], e => e)).to.deep.equal([1,9,2,4]);
});
