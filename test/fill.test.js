it('will replace every element with a different value', function () {
  expect(f.call([1,1,1,2,2,2], 9)).to.deep.equal([9,9,9,9,9,9]);
});
