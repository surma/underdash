const handlebars = require('handlebars');
const fs = require('mz/fs');
const prism = require('prismjs');
const htmlminify = require('html-minifier').minify;
const closure = require('google-closure-compiler').compiler;

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

function closureCompile(file) {
  return new Promise((resolve, reject) => {
    const compiler = new closure({
      js: file,
      compilation_level: 'ADVANCED'
    })
    .run((exitCode, stdOut, stdErr) => {
      if (exitCode === 0) return resolve(stdOut);
      reject(stdErr);
    });
  });
}

fs.readdir('site/')
  .then(files => 
    Promise.all([
      fs.readFile('site/index.hbs').then(f => f.toString()),
      data,
      ...files.filter(f => f.endsWith('.js')),
    ])
  )
  .then(([template, data, ...jsFiles]) => {
    const index = handlebars.compile(template)(data);
    return Promise.all(jsFiles.map(f => closureCompile(`site/${f}`)))
        .then(files => index + 
          files.map(f => `<script>${f}</script>`).join('')
        );
  })
  .then(content => htmlminify(content, {
    minifyCSS: true,
    minifyJS: false,
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