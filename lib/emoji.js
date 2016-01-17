"use strict";

var fs = require('fs');
var emojiParser = require('emoji-parser');
var path = require('path');

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
