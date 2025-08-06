const chalk = require("chalk");

const logger = {
  log: (message) => {
    console.log(`${chalk.green("[LOG]")} ${message}`);
  },
  error: (message) => {
    console.error(`${chalk.red("[ERROR]")} ${message}`);
  },
  warn: (message) => {
    console.warn(`${chalk.yellow("[WARN]")} ${message}`);
  },
  info: (message) => {
    console.log(`${chalk.blue("[INFO]")} ${message}`);
  },
}

module.exports = logger