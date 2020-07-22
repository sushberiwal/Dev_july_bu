//fs -> file system interaction
let fs = require("fs");

// serial type ->
console.log("Before");
let content = fs.readFileSync("f1.txt");
console.log("Content : " + content);
console.log("After");



