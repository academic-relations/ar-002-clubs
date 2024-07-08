/**
 * prompt for user confirmation [y/N]
 * @author Jiho Park (night)
 * @param {string} message - message to display
 * @returns {Promise<boolean>} - true if user confirms
 */
const confirm = async message => {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise(resolve => {
    readline.question(`${message} [y/N] `, answer => {
      readline.close();
      resolve(answer.toLowerCase() === "y");
    });
  });
};

/**
 * prompt for user option selection
 * @author Jiho Park (night)
 * @param {Array.<string>} options - options to display
 * @returns {Promise<number>} - index of selected option
 */
const select = async options => {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise(resolve => {
    options.forEach((option, index) => {
      console.log(`[${index + 1}] ${option}`);
    });
    readline.question(`Select an option [1-${options.length}] `, answer => {
      readline.close();

      // validate int and try again if out of range
      if (
        isNaN(answer) ||
        parseInt(answer) < 1 ||
        parseInt(answer) > options.length
      ) {
        console.log("Invalid selection. Please try again.");
        return select(options);
      }

      const index = parseInt(answer) - 1;
      resolve(index);
    });
  });
};

/**
 * prompt for user input
 * @param {string} message - message to display
 * @param {string} defaultVal - default value
 * @returns {Promise<string>} - user input
 */
const input = async (message, defaultVal) => {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise(resolve => {
    readline.question(`${message} (Default: ${defaultVal})`, answer => {
      readline.close();
      resolve(answer || defaultVal);
    });
  });
};

module.exports = {
  confirm,
  select,
  input,
};
