(function () {
  Array.from(document.querySelectorAll('button.copy')).forEach(btn => {
    btn.onclick = evt => {
      const btn = event.target;
      const ctr = event.target.parentNode;
      const ta = document.createElement('textarea');
      ctr.removeChild(btn);
      ta.value = ctr.textContent;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
      } catch(e) {}
      document.body.removeChild(ta);
      ctr.prepend(btn);
      requestAnimationFrame(_ => btn.focus());
    };
  });
})()