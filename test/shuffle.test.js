it('should shuffle the array', function () {
  const arr = [1,2,3,4];
  const shuffledArr = f([1,2,3,4]);
  for(let v of arr) {
    expect(shuffledArr.includes(v)).to.equal(true);
  }
});
