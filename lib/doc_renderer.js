"use strict";

var fs = require('fs');
var commonmark = require('commonmark');
var Emoji = require('./emoji.js');

class DocRenderer {
  constructor(path) {
    var reader = new commonmark.Parser();
    var writer = new commonmark.HtmlRenderer();
    var parsed = reader.parse(fs.readFileSync(path, 'utf8'));
    var emoji  = new Emoji();
    this.html  = emoji.render(writer.render(parsed));
  }
}

module.exports = DocRenderer;
