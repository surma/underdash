it('returns true if condition is met at least once', function () {
  expect(f([1,9,2,9,1,4,2], e => e)).to.deep.equal([1,9,2,4]);
});

it('returns true if condition is met at least once', function () {
  expect(f([{i:0,v:1},{i:1,v:2},{i:2,v:1}], e => e.v)).to.deep.equal([{i:0,v:1},{i:1,v:2}]);
});
