const Enmap = require("enmap");
const myEnmap = require("./myEnmap.js");
(async function() {
    await myEnmap.faqs.defer;
    console.log(myEnmap.faqs.size + " keys loaded");
    // Ready to use!
  }());
  