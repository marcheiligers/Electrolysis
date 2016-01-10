"use strict";

var Tab = require("./tab.js");

var Chrome = {
  root: "http://electron.atom.io/docs/",
  tabs: [],
  init: function() {
    this.nav = document.querySelector("nav");
    this.main = document.querySelector("main");
    this.loader = document.querySelector("nav loader");
    this.footer = document.querySelector("footer");
  },

  newTab: function(url) {
    var tab = new Tab();
    this.nav.appendChild(tab.element);
    this.main.appendChild(tab.view.element);

    this.tabs.push(tab);

    tab.view.go(url || this.root);
    tab.activate();

    return tab;
  },

  activateTab: function(tab) {
    this.tabs.forEach(function(atab) {
      if(atab != tab) {
        atab.deactivate();
      }
    });
    tab.activate();
  },

  startLoading: function() {
    this.loader.style.display = "inline-block";
  },

  stopLoading: function() {
    var loadingTabs = this.tabs.some(function(atab) {
      return atab.loading;
    });
    if(loadingTabs == 0) {
      this.loader.style.display = "none";
    }
  },

  updateStatus: function(message) {
    this.footer.innerHTML = message;
  }
};

module.exports = Chrome;