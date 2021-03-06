"use strict";

const DocRenderer = require("../lib/doc_renderer.js");
const S = require("string");

class Pane {
  constructor(view) {
    this.view = view;
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
    let renderer = new DocRenderer(url);
    this.element.innerHTML = renderer.html;
    this.view.setTitle(renderer.title);

    let view = this.view;
    let links = Array.from(this.element.querySelectorAll("a"));
    links.forEach(function(link) {
      if(S(link.href).match(Chrome.root)) {
        link.href = link.href.replace(Chrome.root, Chrome.docRoot);
      }
      link.addEventListener("mouseenter", function(e) {
        Chrome.updateStatus(e.target.href);
      });
      link.addEventListener("mouseleave", function(e) {
        Chrome.clearStatus();
      });
      link.addEventListener("click", function(e) {
        Chrome.navigate(e.target.href, view, e);
        e.preventDefault();
      });
    });
  }
}

module.exports = Pane;