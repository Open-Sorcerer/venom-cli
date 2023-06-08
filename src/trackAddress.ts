import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { exec } from "child_process";

// @ts-ignore
import inquirer, { Answers, QuestionCollection } from "inquirer";
import fs from "fs";

export default async function track() {
  const questions = [
    {
      message: chalk.blue("What do you want to track\t"),
      name: "track",
      type: "list",
      choices: ["Address", "Transaction"],
    },
  ];

  const results = await inquirer.prompt(questions);

  if (results.track === "Address") {
    trackAddress();
  } else if (results.track === "Transaction") {
    trackTransaction();
  }
}

async function trackAddress() {
  const questions1 = [
    {
      message: chalk.blue("Enter the address you want to track:\t"),
      name: "address",
      type: "input",
    },
  ];

  const results1 = await inquirer.prompt(questions1);

  console.log("Tracking address", results1.address);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var graphql = JSON.stringify({
    query: `query {\n  blockchain{\n   account(address:"${results1.address}"){\n    transactions{\n      edges{\n        node{\n          id\n          hash\n          \n        }\n      }\n      pageInfo{\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n  }\n}`,
    variables: {},
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
    redirect: "follow",
  };

  fetch("https://gql-devnet.venom.network/graphql", requestOptions as any)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

async function trackTransaction() {
  const questions1 = [
    {
      message: chalk.blue("Enter the transaction hash you want to track:\t"),
      name: "hash",
      type: "input",
    },
  ];

  const results1 = await inquirer.prompt(questions1);

  console.log("Tracking transaction", results1.hash);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var graphql = JSON.stringify({
    query: `query{\n  blockchain{\n    transaction(hash:"${results1.hash}"){\n      id\n      hash\n      balance_delta\n      aborted\n      lt\n      now\n    }\n  }\n}`,
    variables: {},
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
    redirect: "follow",
  };

  fetch("https://gql-devnet.venom.network/graphql", requestOptions as any)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
