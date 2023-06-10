import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { exec } from "child_process";

// @ts-ignore
import inquirer, { Answers, QuestionCollection } from "inquirer";
import fs from "fs";

export default async function track() {
  const questions0 = [
    {
      message: chalk.blue("On what network do you want to track\t"),
      name: "network",
      type: "list",
      choices: ["Devnet", "Custom RPC"],
    },
  ];

  const results0 = await inquirer.prompt(questions0);

  let network;

  if (results0.network === "Devnet") {
    network = "https://gql-devnet.venom.network/graphql";
  } else if (results0.network === "Custom RPC") {
    const questions1 = [
      {
        message: chalk.blue("Enter the custom RPC endpoint\t"),
        name: "endpoint",
        type: "input",
      },
    ];

    const results1 = await inquirer.prompt(questions1);

    network = results1.endpoint;
  }

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
    trackAddress(network);
  } else if (results.track === "Transaction") {
    trackTransaction(network);
  }
}

async function trackAddress(network: string) {
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

  // returns the transactions of the address
  var graphql = JSON.stringify({
    query: `query {\n  blockchain{\n   account(address:"${results1.address}"){\n    transactions{\n       edges{\n        node{\n          id\n          hash\n          \n        }\n      }\n      pageInfo{\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n  }\n}`,
    variables: {},
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
    redirect: "follow",
  };

  fetch(network, requestOptions as any)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  // returns the balance of the address
  var graphql = JSON.stringify({
    query: `query {\n  blockchain{\n   account(address:"${results1.address}"){\n    info{\n      address\n      acc_type\n      balance\n      last_paid\n      last_trans_lt\n      boc\n      data\n      code\n      library\n      data_hash\n      code_hash\n      library_hash\n    }\n  }\n  }\n}`,
    variables: {},
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
    redirect: "follow",
  };

  fetch(network, requestOptions as any)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

async function trackTransaction(network: string) {
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

  fetch(network, requestOptions as any)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
