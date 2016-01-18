"use strict";

const fs = require("fs");
const commonmark = require("commonmark");
const Emoji = require("./emoji.js");
const S = require("string");

class DocRenderer {
  constructor(path) {
    this.title = this.getTitle(path);
    this.html  = this.getHTML(path);
  }

  getTitle(path) {
    return S(path.split("/").slice(-1)[0].split(".").slice(0, -1).join(".")).humanize().s;
  }

  getHTML(path) {
    const reader = new commonmark.Parser();
    const writer = new commonmark.HtmlRenderer();
    const parsed = reader.parse(fs.readFileSync(path, "utf8"));
    const emoji  = new Emoji();
    return emoji.render(writer.render(parsed));
  }
}

module.exports = DocRenderer;
