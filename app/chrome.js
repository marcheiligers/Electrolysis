"use strict";

var Tab = require("./tab.js");
var path = require("path");
var S = require("string");
var electron = require('electron');

var Chrome = {
  root: path.resolve("."),
  docRoot: path.resolve("./docs/v0.36.3/docs"),
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

    tab.view.go(url);
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

  navigate: function(url, tab) {
    console.log(`Navigating to ${url}, root is ${this.root}`)
    var destination = url.replace(/^file:\/\//, "");
    if(S(destination).startsWith(this.docRoot)) {
      console.log(`Internal to ${destination}`)
      tab.go(destination);
    } else {
      console.log(`External to ${url}`)
      electron.shell.openExternal(url);
    }
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
  },

  clearStatus: function() {
    this.footer.innerHTML = "";
  }
};

module.exports = Chrome;