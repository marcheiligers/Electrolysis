"use strict";

// From https://29a.ch/2014/12/03/full-text-search-example-lunrjs

var fs = require('fs');
var lunr = require('../vendor/lunr.js');

class DocIndexer {
  constructor(path) {
    this.path = path;
  }

  index() {
    // create the index
    var index = lunr(function(){
        // boost increases the importance of words found in this field
        this.field('title', {boost: 10});
        this.field('abstract', {boost: 2});
        this.field('content');
        // the id
        this.ref('href');
    });

    // this is a store with some document meta data to display
    // in the search results.
    var store = {};

    entries.forEach(function(entry){
        index.add({
            href: entry.href,
            title: entry.title,
            abstract: entry.abstract,
            // hacky way to strip html, you should do better than that ;)
            content: cheerio.load(entry.content.replace(/<[^>]*>/g, ' ')).root().text()
        });
        store[entry.href] = {title: entry.title, abstract: entry.abstract};
    });

    fs.writeFileSync('public/searchIndex.json', JSON.stringify({
        index: index.toJSON(),
        store: store
    }));
  }
}
