/**
 * * This app downloads a resource at the URL provided to the local path on current machine.
 * * The app accepts two command line arguments:
 * * URL
 * * local file path
 * * Usage example: `node fetcher.js http://www.example.edu/ ./index.html`
 */

const fs = require("fs");
// const { resolve } = require("path");
const request = require("request");

const args = process.argv.slice(2); // Retrieves the URL and local file path specified by the user into an array.

const URL = args[0];
const fileName = args[1];

if (!URL || !fileName) {
  return console.log(
    "Arguments not provided, usage example:  `node fetcher.js http://www.example.edu/ ./index.html`"
  );
}

// asynchronous fetch the resourse from the provided URL
request(URL, (error, response, body) => {
  if (error) {
    console.log("An error accured in retrieving the data: \n", error);
  }

  // asynchronous write of the file
  fs.writeFile(fileName, body, (error) => {
    if (error) {
      console.log("An error accured in writing the file: \n", error);
    }

    // asynchronous get of the file size
    fs.stat(fileName, (error, stats) => {
      if (error) {
        console.log("An error accured in reading file size", fileName);
      }
      console.log(`Downloaded and saved ${stats.size} bytes to ${fileName}`);
    });
  });
});
