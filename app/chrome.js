"use strict";

var View = require("./view.js");
var path = require("path");
var S = require("string");
var electron = require('electron');

var Chrome = {
  root: path.resolve("."),
  docRoot: path.resolve("./docs/v0.36.3/docs"),
  views: [],
  init: function() {
    this.nav = document.querySelector("nav");
    this.main = document.querySelector("main");
    this.loader = document.querySelector("nav loader");
    this.footer = document.querySelector("footer");
  },

  newView: function(url) {
    let view = new View(this);
    this.views.push(view);

    view.go(url);
    view.activate();

    return view;
  },

  activateView: function(view) {
    this.views.forEach(function(aview) {
      if(aview != view) {
        aview.deactivate();
      }
    });
    view.activate();
  },

  navigate: function(url, view, e) {
    var destination = url.replace(/^file:\/\//, "");
    if(S(destination).startsWith(this.docRoot)) {
      if(e.altKey || e.metaKey) {
        view.deactivate();
        this.newView(destination);
      } else {
        view.go(destination);
      }
    } else {
      electron.shell.openExternal(url);
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