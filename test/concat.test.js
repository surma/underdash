it('should concatenate', function () {
  expect(f([1,2,3],[4,5,6],[7,8,9])).to.deep.equal([1,2,3,4,5,6,7,8,9]);
});