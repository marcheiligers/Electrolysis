"use strict";

var DocRenderer = require("../lib/doc_renderer.js");
var S = require("string");

class View {
  constructor(tab) {
    this.tab = tab;
    this.element = document.createElement("article");
    this.hide();
  }

  show() {
    this.element.style.display = "block";
  }

  hide() {
    this.element.style.display = "none";
  }

  go(url) {
    var renderer = new DocRenderer(url);
    this.element.innerHTML = renderer.html;
    this.tab.setText(renderer.title);

    var tab = this.tab;
    var links = Array.from(this.element.querySelectorAll("a"));
    links.forEach(function(link) {
      if(S(link.href).match(Chrome.root)) {
        link.href = link.href.replace(Chrome.root, Chrome.docRoot);
      }
      link.addEventListener('mouseenter', function(e) {
        Chrome.updateStatus(e.target.href);
      });
      link.addEventListener('mouseleave', function(e) {
        Chrome.clearStatus();
      });
      link.addEventListener('click', function(e) {
        Chrome.navigate(e.target.href, tab);
        e.preventDefault();
      });
    });
  }
}

module.exports = View;