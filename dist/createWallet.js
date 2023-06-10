import { TonClient, signerKeys } from "@eversdk/core";
import { libNode } from "@eversdk/lib-node";
import chalk from "chalk";
// @ts-ignore
import inquirer from "inquirer";
import fs from "fs";
export default async function createNewWallet() {
    TonClient.useBinaryLibrary(libNode);
    const client = new TonClient();
    const SEED_PHRASE_WORD_COUNT = 12; //Mnemonic word count
    const SEED_PHRASE_DICTIONARY_ENGLISH = 1; //Dictionary identifier
    const { phrase } = await client.crypto.mnemonic_from_random({
        dictionary: SEED_PHRASE_DICTIONARY_ENGLISH,
        word_count: SEED_PHRASE_WORD_COUNT,
    });
    // const mnemonic =
    //   "hurdle scale antenna spread smoke frost print legend delay rice can image";
    const HD_PATH = "m/44'/396'/0'/0/0";
    const keyPair = await client.crypto.mnemonic_derive_sign_keys({
        phrase: phrase,
        path: HD_PATH,
        dictionary: SEED_PHRASE_DICTIONARY_ENGLISH,
        word_count: SEED_PHRASE_WORD_COUNT,
    });
    console.log("public key", keyPair.public);
    const signerKey = signerKeys(keyPair);
    console.log("signerKey", signerKey);
    const questions = [
        {
            message: chalk.blue("Do you want to save your mnemonic phrase?"),
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
        // write the seed phrase, private key and public key in json
        const data = {
            phrase: phrase,
            public: keyPair.public,
            private: keyPair.secret,
            HD_PATH: HD_PATH,
        };
        fs.writeFileSync(results2.filename + ".json", JSON.stringify(data));
        console.log("Data regarding the keys is stored safely at", results2.filename);
    }
    else {
        console.log("Data regarding this account is not stored");
    }
    client.close();
}
