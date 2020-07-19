// npm install cheerio

let fs = require("fs");
let cheerio = require("cheerio");
// utf-8 -> plain text
let content = fs.readFileSync("./index.html");

let ch = cheerio.load(content);

let h1Tag = ch("h1").text();
// console.log(h1Tag+"");

let pKaText = ch("p").text();
// console.log(pKaText);

// if you have multiple elements then 
// you get a array of elements
let aTags = ch("a");
let aKaData = aTags.text();

console.log(aTags.length);
console.log(aKaData);