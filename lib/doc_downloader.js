"use strict";

const fs = require("fs");
const request = require("request");
const zlib = require("zlib");
const tar = require("tar");

class DocDownloader {
  constructor(url) {
    const filename  = url.split("/").slice(-1)[0];
    const dirname   = filename.split(".").slice(0, -2).join(".");

    this.url      = url;
    this.filename = `./docs/${filename}`;
    this.dirname  = `./docs/${dirname}`;
  }

  prepare() {
    try {
      fs.statSync("./docs");
    } catch(ex) {
      fs.mkdirSync("./docs");
    }
  }

  download(progress, success, error) {
    const filename = this.filename;
    const file     = fs.createWriteStream(filename);
    const url      = this.url;
    const req      = request.get(url);

    req.on("response", function(response) {
      console.log(`Downloading ${url} returns ${response.statusCode}`);
      if(response.statusCode !== 200) {
        if(error) {
          error("Response status was " + response.statusCode);
        }
      }
    });

    req.on("error", function (err) {
      fs.unlink(filename);

      console.log(`Downloading ${url} request error ${err.message}`);
      if(error) {
        error(err.message);
      }
    });

    req.pipe(file);

    file.on("finish", function() {
      file.close();

      console.log(`Finished downloading ${url}.`);
      if(success) {
        success();
      }
    });

    file.on("error", function(err) {
      fs.unlinkSync(filename);

      console.log(`Downloading ${url} file error ${err.message}`);
      if(error) {
        error(err.message);
      }
    });
  }

  extract(progress, success, error) {
    var extractor = tar.Extract({ path: this.dirname, strip: 1 });

    extractor.on("entry", function(entry) {
      var filename = entry.props.path;
      console.log(`Extracting file ${filename}`);
      if(progress) {
        progress(filename);
      }
    });

    extractor.on("end", function() {
      console.log("Extraction complete");
      if(progress) {
        progress(filename);
      }
    });

    extractor.on("error", function(err) {
      console.log(`Extraction tar error ${err}`);
      if(progress) {
        progress(filename);
      }
    });

    fs.createReadStream(this.filename)
      .pipe(zlib.createGunzip())
      .pipe(extractor)
  }

  cleanup() {
    fs.unlinkSync(this.filename);
  }
}

module.exports = DocDownloader;
