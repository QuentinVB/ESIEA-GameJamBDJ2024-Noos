import { readFileSync } from "fs";
import { default as Computer } from "./computer.js";

const computerData = JSON.parse(readFileSync("../assets/content/computerA.json","utf-8"));

const computer = new Computer(computerData);

/*
computer.parseCommand("ls").then(r=>{console.log(r)})*/
computer.parseCommand("cd ..").then(r=>{console.log(r)})
computer.parseCommand("cd tmp").then(r=>{console.log(r)})
computer.parseCommand("pwd").then(r=>{console.log(r)})
computer.parseCommand("ls").then(r=>{console.log(r)})

computer.parseCommand("cat rt_45.dat").then(r=>{console.log(r)})