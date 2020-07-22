let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
const findMatch = require("./match");


function findAllMatches(link){
    request(link , dataReceiver);
}

function dataReceiver(error , response , html){
    if(error ==null && response.statusCode == 200){
        parseData(html);   
    }
    else if(response.statusCode == 404){
        console.log("Page not found");
    }
    else{
        console.log(error);
    }
}

function parseData(html){
    let ch = cheerio.load(html);
    let allCards = ch(".col-md-8.col-16");

    for(let i=0 ; i<allCards.length ; i++){
        let summary = ch(allCards[i]).find("p span").text();
        // console.log(summary);
        let link = ch(allCards[i]).find(".match-cta-container a[data-hover='Scorecard']").attr("href");
        let completeLink = "https://www.espncricinfo.com"+link;
        // console.log(completeLink);
        findMatch(completeLink);
        // console.log("#################");
    }
}

module.exports = findAllMatches;