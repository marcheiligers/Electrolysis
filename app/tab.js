"use strict";

class Tab {
  constructor(view) {
    var element = this.element = document.createElement("tab");
    this.view = view;

    element.addEventListener("click", function(e) {
      Chrome.activateView(view);
    });
  }

  setText(title) {
    this.element.innerHTML = title;
  }

  activate() {
    this.element.className = "active";
  }

  deactivate() {
    this.element.className = "";
  }
}

module.exports = Tab;