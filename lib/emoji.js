"use strict";

const emojiParser = require("emoji-parser");
const path = require("path");

class Emoji {
  constructor() {
    this.dirname = path.resolve("./emoji");
    emojiParser.init(this.dirname);
  }

  update(cb) {
    emojiParser.update(true, null, cb);
  }

  render(text) {
    return emojiParser.parse(text, this.dirname);
  }
}

module.exports = Emoji;
