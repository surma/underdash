(function (root) {
  'use strict';

  const isNode = typeof(process) === 'object';
  const expect = root.chai && root.chai.expect || require('chai').expect;

  describe('underdash', function () {
    describe('max', function () {
      it('gets the maximum', function () {
        console.log('asdf');
      });
    });
  });
})(this);