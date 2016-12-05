it('finds the first element that matches the condition', function () {
  expect(f.call([1,2,3,4,5,6], e => e % 2 == 0)).to.equal(2);
});
