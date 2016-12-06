it('runs a function on each element and replace it with the output', function () {
  expect(f([1,2,3,4], e => 2*e)).to.deep.equal([2,4,6,8]);
});
