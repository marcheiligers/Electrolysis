"use strict";

var Tab = require("./tab.js");
var Pane = require("./pane.js");

class View {
  constructor(chrome) {
    let tab = this.tab = new Tab(this);
    let pane = this.pane = new Pane(this);

    chrome.nav.appendChild(tab.element);
    chrome.main.appendChild(pane.element);
  }

  setTitle(text) {
    this.tab.setText(text);
  }

  activate() {
    this.tab.activate();
    this.pane.show();
  }

  deactivate() {
    this.tab.deactivate();
    this.pane.hide();
  }

  go(url) {
    // TODO: keep history
    this.pane.go(url);
  }
}

module.exports = View;