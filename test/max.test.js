it('should find the maximum', function () {
  expect(f([1,2,3,4,3,2,1], (a, b) => a>b)).to.equal(4);
});