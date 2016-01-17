"use strict";

var fs = require('fs');
var commonmark = require('commonmark');
var Emoji = require('./emoji.js');
var S = require("string");

class DocRenderer {
  constructor(path) {
    this.title = this.getTitle(path);
    this.html  = this.getHTML(path);
  }

  getTitle(path) {
    return S(path.split("/").slice(-1)[0].split(".").slice(0, -1).join(".")).humanize().s;
  }

  getHTML(path) {
    var reader = new commonmark.Parser();
    var writer = new commonmark.HtmlRenderer();
    var parsed = reader.parse(fs.readFileSync(path, 'utf8'));
    var emoji  = new Emoji();
    return emoji.render(writer.render(parsed));
  }
}

module.exports = DocRenderer;
