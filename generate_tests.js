const fs = require('mz/fs');

const templateTag = 
  (strings, ...keys) =>
    dict => 
      keys.reduce (
        (prev, cur, idx) => prev + dict[cur] + strings[idx + 1],
        strings[0]
      );

const asyncFuncWrapper = templateTag`
  function f(...args) {
    if (${'isGenerator'})
      return Array.from(origF(...args));
    return origF(...args);
  };
  const origF = ${'func'};
`;

boilerplate = templateTag`
  (function (root) {
    'use strict';

    const isNode = typeof(process) === 'object';
    const expect = root.chai && root.chai.expect || require('chai').expect;
    const f = ${'func'};

    describe('${'name'}', function () {
      ${'test'}
    });
  })(this);
`;

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
          fs.readFile(`f/${name}Lazy.js`).catch(_ => {}),
          name
        ])
        .then(([testCode, fCode, fLazyCode, name]) => {
          let testFiles = [];
          fCode = fCode.toString();
          fLazyCode = fLazyCode && fLazyCode.toString();
          if (!fCode.startsWith('// Already defined')) {
            const code = boilerplate({
              name,
              func: fCode.toString(),
              test: testCode.toString()
            });
            testFiles.push(fs.writeFile(`test/${name}.test.boilerplated.js`, code));
          }
          if (!files.includes(`${name}Lazy.test.js`) && fLazyCode && !fLazyCode.startsWith('//!')) {
            const code = boilerplate({
              name: `${name}Lazy`,
              func: asyncFuncWrapper({
                func: fLazyCode,
                isGenerator: /function\*/.test(fLazyCode.split('\n')[0])
              }),
              test: testCode.toString()
            });
            testFiles.push(fs.writeFile(`test/${name}Lazy.test.boilerplated.js`, code));
          }
          return Promise.all(testFiles);
        });
      })
  )
  .catch(err => console.error(err.toString()));
