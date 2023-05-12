import { TonClient } from "@eversdk/core";
import { libNode } from "@eversdk/lib-node";
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';

// @ts-ignore
import inquirer, { Answers, QuestionCollection } from "inquirer";
import fs from "fs";

export default async function createNewWallet() {
  TonClient.useBinaryLibrary(libNode);
  const client = new TonClient();
  const keys = await client.crypto.generate_random_sign_keys();

  console.log("Public key:", keys.public);

  const questions = [
    {
      message: chalk.blue("Do you want to save the private key to a file?"),
      name: "save",
      type: "confirm",
    },
  ];

  const results = await inquirer.prompt(questions);
  if (results.save) {
    const questions2 = [
      {
        message: chalk.yellow("Enter the file name:\t"),
        name: "filename",
        type: "input",
      },
    ];

    const results2 = await inquirer.prompt(questions2);
    console.log("Saving private key to file:", results2.filename);

    // write it in a txt file
    fs.writeFileSync(results2.filename + ".txt", keys.secret);

    console.log("Private key saved to file:", results2.filename);
  } else {
    console.log("Private key not saved.");
  }
  
  client.close();
}
