const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector);
      if (element) element.innerText = text;
    }
  
    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type]);
    }

    ipcRenderer.invoke('perform-action', 'messege from renderer');
});

window.addEventListener('DOMContentLoaded', () => {
    let input = document.querySelector('input[name="data"]');
    let saveBtn = document.querySelector('.save-btn');

    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            ipcRenderer.invoke('save', input.value);
        });
    }
});