it('should zip two arrays', function () {
  expect(f([1, 2, 3], [9, 8, 7])).to.deep.equal([[1,9], [2,8], [3,7]]);
});