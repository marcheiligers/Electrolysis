"use strict";

var Tab = require("./tab");
var Pane = require("./pane");
var History = require("../lib/history");

class View {
  constructor(chrome) {
    let tab = this.tab = new Tab(this);
    let pane = this.pane = new Pane(this);

    chrome.nav.appendChild(tab.element);
    chrome.main.appendChild(pane.element);

    this.history = new History;
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
    this.history.push(url);
    this.pane.go(url);
  }

  back() {
    this.pane.go(this.history.back());
  }

  forward() {
    this.pane.go(this.history.forward());
  }
}

module.exports = View;