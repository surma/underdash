it('return true if condition is met at least once', function () {
  expect(f([9,9,9,1,9,9], e => e < 5)).to.equal(true);
});

it('return false if the condition is never met', function () {
  expect(f([9,9,9,9,9,9], e => e < 5)).to.equal(false);
});