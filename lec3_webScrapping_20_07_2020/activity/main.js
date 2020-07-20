// module to make a request on http webpage
// npm install request
let request = require("request");
let cheerio = require("cheerio");
const findAllMatches = require("./allMatches");

request( "https://www.espncricinfo.com/series/_/id/8039/season/2015/icc-cricket-world-cup"  , dataReceiver);

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
    let aTag = ch(".widget-items.cta-link a");
    let link = aTag.attr("href");
    let completeLink = "https://www.espncricinfo.com"+link;
    findAllMatches(completeLink);
}



