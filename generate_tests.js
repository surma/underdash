const fs = require('mz/fs');

const templateTag = 
  (strings, ...keys) =>
    dict => 
      keys.reduce (
        (prev, cur, idx) => prev + dict[cur] + strings[idx + 1],
        strings[0]
      );

boilerplate = templateTag`
  (function (root) {
    'use strict';

    const isNode = typeof(process) === 'object';
    const expect = root.chai && root.chai.expect || require('chai').expect;
    const f = ${'func'};

    describe('underdash', function () {
      describe('${'name'}', function () {
        ${'test'}
      });
    });
  })(this);
  `

const filterRegex = /([^.]+)\.test\.js/;

fs.readdir('test')
  .then(files => 
    files
      .filter(f => filterRegex.test(f))
      .map(f => {
        const name = filterRegex.exec(f)[1];
        return Promise.all([
          fs.readFile(`test/${f}`),
          fs.readFile(`f/${name}.js`),
          name
        ])
        .then(([testCode, fCode, name]) => {
          const code = boilerplate({
            name,
            func: fCode.toString(),
            test: testCode.toString()
          });
          return fs.writeFile(`test/${name}.test.boilerplated.js`, code)
        });
      })
  )
  .catch(err => console.error(err.toString()));
