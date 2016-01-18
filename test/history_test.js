const assert = require("assert");
const History = require("../lib/history");

describe("History", function() {
  describe("#length", function () {
    it("should return 0 for a new History", function () {
      assert.equal(0, new History().length);
    });

    it("should return 1 after pushing an item", function () {
      const history = new History();
      history.push("/example");
      assert.equal(1, history.length);
    });

    it("should return the correct length if constructed with a list", function() {
      const history = new History(["/example1", "/example2"]);
      assert.equal(2, history.length);
    });
  });

  describe("#back", function() {
    it("should return the previous item", function() {
      const history = new History(["/example1", "/example2"]);
      assert.equal("/example1", history.back());
    })
  });

  describe("#forward", function() {
    it("should return the next item", function() {
      const history = new History(["/example1", "/example2"]);
      history.back();
      assert.equal("/example2", history.forward());
    })
  });

  describe("#push", function() {
    it("should reset the forward items", function() {
      const history = new History(["/example1", "/example2", "/example3"]);
      history.back();
      history.back();
      history.push("/new")
      assert.equal(2, history.length);
      assert.equal(1, history.index);
      assert.equal("/new", history.current);
    })
  })
});