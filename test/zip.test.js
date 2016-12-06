it('should zip two arrays', function () {
  expect(f([1, 2, 3], [9, 8, 7])).to.deep.equal([[1,9], [2,8], [3,7]]);
});

it('should zip two arrays of different length', function () {
  expect(f([1, 2, 3, 4], [9, 8, 7])).to.deep.equal([[1,9], [2,8], [3,7]]);
  expect(f([1, 2, 3], [9, 8, 7, 6])).to.deep.equal([[1,9], [2,8], [3,7]]);
});

it('should zip more than two arrays ', function () {
  expect(f([1,2], [3,4], [5,6])).to.deep.equal([[1,3,5], [2,4,6]]);
});