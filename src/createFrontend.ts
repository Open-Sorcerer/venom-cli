import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { exec } from "child_process";

// @ts-ignore
import inquirer, { Answers, QuestionCollection } from "inquirer";
import fs from "fs";

export default async function createFrontend() {
  const questions = [
    {
      message: chalk.blue("Which framework do you want to use?"),
      name: "framework",
      type: "list",
      choices: ["NextJS", "ReactJS"],
    },
  ];

  const results = await inquirer.prompt(questions);

  const questions2 = [
    {
      message: chalk.yellow("Enter the project name:\t"),
      name: "projectName",
      type: "input",
    },
  ];

  const results2 = await inquirer.prompt(questions2);
  console.log("Creating frontend with", results2.projectName);

  // const questions3 = [
  //   {
  //     message: chalk.yellow("Got any choice for package manager?"),
  //     name: "packageManager",
  //     type: "list",
  //     choices: ["npm", "yarn", "pnpm", "Just make it work"],
  //   },
  // ];

  // const results3 = await inquirer.prompt(questions3);

  switch (results.framework) {
    case "NextJS":
      console.log(chalk.magentaBright("NextJS"));
      // execute git clone command
      // execute npm install
      // execute npm run dev
      exec(
        `git clone https://github.com/Open-Sorcerer/Venom-Next ${results2.projectName}`,
        (err, stdout, stderr) => {
          if (err) {
            console.log(chalk.redBright(err));
            return;
          }
          console.log(chalk.greenBright(stdout));
          console.log(chalk.blueBright(stderr));
        }
      );
      // if (results3.packageManager === "Just make it work") {
      //   exec(
      //     `cd ${results2.projectName} && npm install && npm run dev`,
      //     (err, stdout, stderr) => {
      //       if (err) {
      //         console.log(chalk.redBright(err));
      //         return;
      //       }
      //       console.log(chalk.greenBright(stdout));
      //       console.log(chalk.blueBright(stderr));
      //     }
      //   );
      // } else {
      //   exec(
      //     `cd ${results2.projectName} && ${results3.packageManager} install && ${results3.packageManager} run dev`,
      //     (err, stdout, stderr) => {
      //       if (err) {
      //         console.log(chalk.redBright(err));
      //         return;
      //       }
      //       console.log(chalk.greenBright(stdout));
      //       console.log(chalk.blueBright(stderr));
      //     }
      //   );
      // }
      break;
    case "ReactJS":
      console.log(chalk.magentaBright("ReactJS"));
      break;
  }
}
