#!/usr/bin/env node

import chalk from "chalk";
// @ts-ignore
// const figlet = require('figlet');
import figlet from "figlet";
import createNewWallet from "./createWallet";
import createFrontend from "./createFrontend";
import track from "./trackAddress";
const availableOptions: string[] = [
  "create",
  "create-frontend",
  "track",
  "withdraw",
];

// second argument should be the selected option
const option: string = process.argv[2];

if (!availableOptions.includes(option)) {
  console.log(
    chalk.red(
      `Invalid operation. Available operations are: ${availableOptions}`
    )
  );
  process.exit(-1);
}

console.log(
  chalk.magentaBright(figlet.textSync(`Venom`, { horizontalLayout: "full" }))
);

switch (option) {
  case "create":
    // arg 3 is the project name
    console.log(chalk.magentaBright("create"));
    createNewWallet();
    break;
  case "create-frontend":
    createFrontend();
    break;
  case "track":
    track();
    break;
  case "withdraw":
    console.log(chalk.magentaBright("withdraw"));
    break;
}
