it('runs a function on each element', function () {
  let ctr = 0;
  f([1<<0,1<<1,1<<2,1<<3], i => ctr += i)
  expect(ctr).to.equal(15);
});
