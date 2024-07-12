// Copy env to root
// RUN COMMAND FROM PROJECT ROOT

const fs = require("fs");
const path = require("path");
const { input, confirm } = require("../.common/cli.js");

const envPath = path.resolve(__dirname, "../.env");

// validate user if root is correct
const root = path.resolve(__dirname, "../");
console.log(`Current root: ${root}`);

if (!confirm("Is this the correct root?")) {
  console.log("Please run this script from the project root. Exiting.");
  process.exit();
}

//
