"use strict";

var View = require("./view.js");

class Tab {
  constructor() {
    this.view = new View(this);
    var element = this.element = document.createElement("tab");

    element.addEventListener('click', function(e) {
      Chrome.activateTab(this);
    }.bind(this));
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