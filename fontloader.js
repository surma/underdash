(function () {
  [
    'https://fonts.googleapis.com/css?family=Yanone+Kaffeesatz:600,400|Source+Code+Pro:400',
    'prism.css'
  ]
  .forEach(href => {
    const link = document.createElement('link');
    link.href = href;
    link.rel = "stylesheet";
    link.onload = _ => document.body.classList.add('font-loaded');
    document.head.appendChild(link);
  });
})();