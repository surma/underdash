it('keeps elements that pass the test', function () {
  expect(f([1,2,3,4,5,6], e => e % 2 == 0)).to.deep.equal([2,4,6]);
});
