//require fs module from NodeJS 
let fs = require("fs");

let f1KaData = fs.readFileSync("./f1.txt");
let f2KaData = fs.readFileSync("./f2.txt");


console.log("Content of f1 ->" + f1KaData);
console.log("Content of f2 ->" + f2KaData);
