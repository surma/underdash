const handlebars = require('handlebars');
const fs = require('mz/fs');

const data = fs.readdir('f')
  .then(files => 
    files
      .filter(f => !/Lazy.js/.test(f))
      .map(filename => {
        const name = filename.replace(/\.js$/, '');
        const fCode = fs.readFile(`f/${name}.js`).then(buffer => buffer.toString());
        const fLazyCode = fs.readFile(`f/${name}Lazy.js`).then(buffer => buffer.toString()).catch(_ => {});
        const fAsyncCode = 
          fs.readFile(`f/${name}Async.js`)
            .then(buffer => buffer.toString())
            .catch(_ => fLazyCode)
            .then(code => !code || transformLazyToAsyncCode(code))
        
        return Promise.all([fCode, fLazyCode, fAsyncCode])
          .then(([fCode, fLazyCode, fAsyncCode]) => ({name, fCode, fLazyCode, fAsyncCode}));
      })
  )
  .then(data => Promise.all(data))
  .then(data => {
    // console.log(data);
    return {functions: data}
  });

fs.readFile('site/index.hbs')
  .then(file => Promise.all([data, file.toString()]))
  .then(([data, template]) => handlebars.compile(template)(data))
  .then(content => fs.writeFile('site/index.html', content))
  .then(_ => console.log('Done.'))
  .catch(err => console.error(err.toString()));

function transformLazyToAsyncCode(code) {
  return code
    .replace('function* ', 'async function* ')
    .replace('for (', 'for await (');
}