it('should find the minimum', function () {
  expect(f.call([4,3,2,1,2,3,4], (a, b) => a>b)).to.equal(1);
});