it('should reduce the array to a single value', function () {
  expect(f.call([1<<0,1<<1,1<<2,1<<3], (acc, v) => acc+v, 0)).to.deep.equal(15);
});
