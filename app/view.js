"use strict";

class View {
  constructor(tab) {
    var element = this.element = document.createElement("webview");

    this.loading = false;

    var electron = require('electron');

    element.addEventListener('did-finish-load', function(e) {
      Chrome.updateStatus(element.getURL() + " loaded.");
    });

    element.addEventListener('load-commit', function(e) {
      if(!e.url.match(Chrome.root)) {
        element.stop();
        electron.shell.openExternal(e.url);
      }
    });

    element.addEventListener('new-window', function(e) {
      if(!e.url.match(Chrome.root)) {
        electron.shell.openExternal(e.url);
      } else {
        var tab = Chrome.newTab(e.url);
        Chrome.activateTab(tab);
      }
    });

    element.addEventListener('did-start-loading', function(e) {
      this.loading = true;
      Chrome.startLoading();
    });

    element.addEventListener('did-stop-loading', function(e) {
      this.loading = false;
      Chrome.stopLoading();
    });

    element.addEventListener('page-title-updated', function(e) {
      tab.setText(e.title);
    });

    this.hide();
  }

  show() {
    this.element.style.display = "block";
  }

  hide() {
    this.element.style.display = "none";
  }

  go(url) {
    Chrome.startLoading();
    this.element.src = url;
  }
}

module.exports = View;