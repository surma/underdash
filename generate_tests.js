const fs = require('mz/fs');

Array.prototype.takeWhile = function (f) {
  let ok = true;
  return this.filter(e => ok && (ok = f(e)));
};

Array.prototype.dropUntil = function (f) {
  let ok = false;
  return this.filter(e => ok || (ok = f(e)));
};

function removeExampleCode(code) {
  return code
    .split('\n')
    .takeWhile(line => !line.startsWith('// Example'))
    .join('');
}

function extractExampleTest(code, isGenerator) {
  const example = code
    .split('\n')
    .dropUntil(line => line === '// Example:')
    .slice(1);
  if (example.length < 2 || !example[1].startsWith('// returns'))
    return '';
  const expected = example[1].replace('// returns ', '');
  return `
    const r = ${example[0].replace(/;$/, '')}
    if (${isGenerator})
      expect(Array.from(r)).to.deep.equal(${expected});
    else
      expect(r).to.deep.equal(${expected});
  `;
}

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
  const ${'oldName'} = f;
`;

boilerplate = templateTag`
  (function (root) {
    'use strict';

    const isNode = typeof(process) === 'object';
    const expect = root.chai && root.chai.expect || require('chai').expect;
    const f = ${'func'};

    describe('${'name'}', function () {
      ${'test'}
      it('has correct example code', function () {
        ${'func'}
        ${'example'}
      });
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
              func: removeExampleCode(fCode.toString()),
              test: testCode.toString(),
              example: extractExampleTest(fCode.toString())
            });
            testFiles.push(fs.writeFile(`test/${name}.test.boilerplated.js`, code));
          }
          if (!files.includes(`${name}Lazy.test.js`) && fLazyCode && !fLazyCode.startsWith('//!')) {
            const isGenerator = /function\*/.test(fLazyCode.split('\n')[0]);
            const code = boilerplate({
              name: `${name}Lazy`,
              func: asyncFuncWrapper({
                oldName: name,
                func: removeExampleCode(fLazyCode),
                isGenerator
              }),
              example: extractExampleTest(fLazyCode.toString(), isGenerator),
              test: testCode.toString()
            });
            testFiles.push(fs.writeFile(`test/${name}Lazy.test.boilerplated.js`, code));
          }
          return Promise.all(testFiles);
        });
      })
  )
  .catch(err => console.error(err.toString()));
