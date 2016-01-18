"use strict";

class History {
  constructor(items) {
    this.index  = -1;
    this.items  = items || [];
  }

  get length() {
    return this.items.length;
  }

  push(item) {
    this.items = this.items.slice(0, this.index + 1);
    this.items.push(item);
    this.index = this.items.length - 1;
    return item;
  }

  back() {
    this.index--;
    if(this.index < 0) {
      this.index = 0;
    }
    return this.current;
  }

  forward() {
    this.index++;
    if(this.index >= this.length) {
      this.index = this.length - 1;
    }
    return this.current;
  }

  get current() {
    return this.items[this.index];
  }
}

module.exports = History;