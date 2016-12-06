it('should stop taking after condition is met', function () {
  expect(f([1,1,1,9,2,2,2], e => e < 5)).to.deep.equal([1,1,1]);
});