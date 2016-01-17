"use strict";

var View = require("./view.js");

class Tab {
  constructor() {
    var element = this.element = document.createElement("tab");
    this.view = new View(this);

    element.addEventListener('click', function(e) {
      Chrome.activateTab(this);
    }.bind(this));
  }

  go(url) {
    this.view.go(url);
  }

  setText(title) {
    this.element.innerHTML = title;
  }

  activate() {
    this.view.show();
    this.element.className = "active";
  }

  deactivate() {
    this.view.hide();
    this.element.className = "";
  }
}

module.exports = Tab;