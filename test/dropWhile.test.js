it('should stop dropping after condition is met', function () {
  expect(f.call([1,1,1,9,2,2,2], e => e < 5)).to.deep.equal([9,2,2,2]);
});