#! /usr/bin/env node
const shell = require("shelljs");
const yargs = require("yargs");
const axios = require("axios");

const options = yargs
    .usage("Usage: -n <name>")
    .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
    .option("s", { alias: "search", describe: "Search term", type: "string" })
    .argv;

shell.exec("echo shell.exec works");

const greeting = `Hello, ${options.name}!`;
console.log(greeting);

console.log("Here's a random joke for you:");

const url = "http://api.icndb.com/jokes/random";

axios.get(url, { headers: { Accept: "application/json" } })
    .then(res => {
        console.log(res.data.value.joke);
    });
