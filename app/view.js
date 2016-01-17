"use strict";

var Tab = require("./tab.js");
var Pane = require("./pane.js");

class View {
  constructor(chrome) {
    let tab = this.tab = new Tab(this);
    let pane = this.pane = new Pane(this);

    chrome.nav.appendChild(tab.element);
    chrome.main.appendChild(pane.element);

    this.history = [];
    this.historyIndex = -1; // TODO: Extract history into it's own class
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

  isActive() {
    return this.tab.element.className == "active";
  }

  go(url) {
    this.history = this.history.slice(0, this.historyIndex + 1);
    this.history.push(url);
    this.historyIndex = this.history.length - 1;
    console.log(this.history, this.historyIndex);
    this.pane.go(url);
  }

  back() {
    this.historyIndex--;
    if(this.historyIndex < 0) {
      this.historyIndex = 0;
    }
    console.log(this.history, this.historyIndex);
    this.pane.go(this.history[this.historyIndex]);
  }

  forward() {
    this.historyIndex++;
    if(this.historyIndex > this.history.length - 1) {
      this.historyIndex = this.history.length - 1;
    }
    console.log(this.history, this.historyIndex);
    this.pane.go(this.history[this.historyIndex]);
  }
}

module.exports = View;