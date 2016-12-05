it('return true if condition is met all the time', function () {
  expect(f.call([1,1,1,2,2,2], e => e < 5)).to.equal(true);
});

it('return false if the condition is not met at least once', function () {
  expect(f.call([1,1,1,9,2,2,2], e => e < 5)).to.equal(false);
});