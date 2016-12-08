function tabpanel(elem) {
  this._panel = elem;
  this._tabs = Array.from(this._panel.querySelectorAll('.tab'));
  this._panels = Array.from(this._panel.querySelectorAll('.panel'));
  this.bindHandlers();
  this.init();
}

tabpanel.prototype.init = function () {
  this._panels.forEach(panel => {
    panel.setAttribute('aria-hidden', 'true')
    panel.classList.add('hidden');
  });

  let selectedTab = this._tabs.find(e => e.classList.contains('selected'));
  if (!selectedTab) {
    selectedTab = this._tabs[0];
  }
  selectedTab.classList.add('selected');
  const panel = this._panels.find(p => p.id === selectedTab.getAttribute('aria-controls'));
  panel.classList.remove('hidden');
  panel.setAttribute('aria-hidden', 'false');
}

tabpanel.prototype.reset = function () {
  this._tabs.forEach(tab => {
    tab.classList.remove('selected', 'focus');
    tab.setAttribute('tabindex', '-1')
    tab.setAttribute('aria-selected', 'false'); 
  });

  this._panels.forEach(panel => {
    panel.classList.add('hidden');
    panel.setAttribute('aria-hidden', 'true');
  });
}

tabpanel.prototype.switchTabs = function (newTab) {
  this.reset();

  const newPanel = this._panels.find(e => e.id === newTab.getAttribute('aria-controls'));
  newPanel.classList.remove('hidden');
  newPanel.setAttribute('aria-hidden', 'false');

  newTab.classList.add('selected');
  newTab.setAttribute('aria-selected', 'true');
  newTab.setAttribute('tabindex', '0');
  newTab.focus();
}

tabpanel.prototype.bindHandlers = function () {
  this.handleTabKeyDown = this.handleTabKeyDown.bind(this);
  this._tabs.forEach(tab => tab.addEventListener('keydown', this.handleTabKeyDown));

  this.handleTabClick = this.handleTabClick.bind(this);
  this._tabs.forEach(tab => tab.addEventListener('click', this.handleTabClick));
}

tabpanel.prototype.handleTabKeyDown = function (event) {
  let idx, nexTab;
  if (event.altKey) return true;

  switch (event.code) {
    case 'ArrowLeft':
    case 'ArrowUp':
      idx = this._tabs.findIndex(e => e.classList.contains('selected'));
      newTab = this._tabs[(idx - 1 + this._tabs.length) % this._tabs.length];
      this.switchTabs(newTab);
      break;
    case 'ArrowRight':
    case 'ArrowDown':
      idx = this._tabs.findIndex(e => e.classList.contains('selected'));
      newTab = this._tabs[(idx + 1 + this._tabs.length) % this._tabs.length];
      this.switchTabs(newTab);
      break;
    case 'Home':
      this.switchTabs(this._tabs[0]);
      break;
    case 'End':
      this.switchTabs(this._tabs[this._tabs.length - 1]);
      break;
    default:
      return true;
  }
  event.preventDefault();
  return false;
}

tabpanel.prototype.handleTabClick = function (event) {
  this.reset();
  this.switchTabs(event.target)
  return true;
}

Array.from(document.querySelectorAll('.tabpanel'))
  .forEach(tp => new tabpanel(tp));