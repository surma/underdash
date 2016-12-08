(function () {
  Array.from(document.querySelectorAll('button.copy')).forEach(btn => {
    btn.onclick = event => {
      const btn = event.target;
      const ctr = event.target.parentNode;
      const code = ctr.querySelector('pre');
      const ta = document.createElement('textarea');
      ctr.removeChild(btn);
      ta.value = code.textContent;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
      } catch(e) {}
      document.body.removeChild(ta);
      ctr.insertBefore(btn, code);
      requestAnimationFrame(_ => btn.focus());
    };
  });
})()