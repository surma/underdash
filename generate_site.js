const handlebars = require('handlebars');
const fs = require('mz/fs');
const prism = require('prismjs');
const htmlminify = require('html-minifier').minify;

Array.prototype.dropUntil = function (f) {
  let ok = false;
  return this.filter(e => ok || (ok = f(e)));
}

Array.prototype.takeWhile = function (f) {
  let ok = true;
  return this.filter(e => ok && (ok = f(e)));
}

function removeCopyright(str) {
  return str
    .split('\n')
    .dropUntil(line => line.endsWith('*/'))
    .slice(1)
    .dropUntil(line => !(/^\s*$/.test(line)))
    .takeWhile(line => !(/^\s*$/.test(line)))
    .join('\n');
}

const data = fs.readdir('f')
  .then(files => 
    files
      .filter(f => !/(Lazy|Async).js/.test(f))
      .sort()
      .map(filename => {
        const name = filename.replace(/\.js$/, '');
        const fCode = fs.readFile(`f/${name}.js`).then(buffer => buffer.toString()).then(removeCopyright);
        const fLazyCode = fs.readFile(`f/${name}Lazy.js`).then(buffer => buffer.toString()).then(removeCopyright).catch(_ => {});
        const fAsyncCode = 
          fs.readFile(`f/${name}Async.js`)
            .then(buffer => buffer.toString())
            .then(removeCopyright)
            .catch(_ => 
              fLazyCode
                .then(code => code && transformLazyToAsyncCode(code))
            );

        return Promise.all([fCode, fLazyCode, fAsyncCode])
          .then(([fCode, fLazyCode, fAsyncCode]) => ({
            name,
            fCode: prism.highlight(fCode, prism.languages.javascript),
            fLazyCode: fLazyCode && prism.highlight(fLazyCode, prism.languages.javascript),
            fAsyncCode: fAsyncCode && prism.highlight(fAsyncCode, prism.languages.javascript),
          }));
      })
  )
  .then(data => Promise.all(data))
  .then(data => {
    return {functions: data}
  });

fs.readFile('site/index.hbs')
  .then(file => Promise.all([data, file.toString()]))
  .then(([data, template]) => handlebars.compile(template)(data))
  .then(content => htmlminify(content, {
    minifyCSS: true,
    minifyJS: true,
    removeAttributeQuotes: true,
    collapseWhitespace: true
  }))
  .then(content => fs.writeFile('site/index.html', content))
  .then(_ => console.log('Done.'))
  .catch(err => console.error(err.toString()));

function transformLazyToAsyncCode(code) {
  return code
    .replace(/function/, 'async function')
    .replace(/for\s*\(/, 'for await (');
}