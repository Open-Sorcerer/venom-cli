import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { exec } from "child_process";

// @ts-ignore
import inquirer, { Answers, QuestionCollection } from "inquirer";
import fs from "fs";

const curlQuery = `curl 'https://gql-devnet.venom.network/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: https://www.graphqlbin.com' --data-binary '{"query":"# Write your query or mutation here\nquery {\n  blockchain{\n   account(address:\"0:d696592c65a084bdeb40b8de06ebb48793868e8e56cb77b669dcb31f04fe52dc\"){\n    info{\n      address\n      acc_type\n      balance\n      last_paid\n      last_trans_lt\n      boc\n      data\n      code\n      library\n      data_hash\n      code_hash\n      library_hash\n    }\n  }\n  }\n}"}' --compressed`;
export default async function trackAddress() {
  const questions = [
    {
      message: chalk.blue("Enter the address you want to track:\t"),
      name: "address",
      type: "input",
    },
  ];

  const results = await inquirer.prompt(questions);

  console.log("Tracking address", results.address);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var graphql = JSON.stringify({
    query: `query {\n  blockchain{\n   account(address:"${results.address}"){\n    info{\n      address\n      acc_type\n      balance\n      last_paid\n      last_trans_lt\n      boc\n      data\n      code\n      library\n      data_hash\n      code_hash\n      library_hash\n    }\n  }\n  }\n}`,
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
