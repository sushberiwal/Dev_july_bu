let request = require("request");
let cheerio = require("cheerio");
let count=0;
let leaderBoard = [];

function findMatch(link) {
    console.log("sending request");
    count++;
    request(link, dataReceiver);
}
function dataReceiver(error, response, html) {
    if (error == null && response.statusCode == 200) {
        console.log("received data");
        count--;
        parseData(html);
        if(count==0){
            console.table(leaderBoard);
        }
    }
    else if (response.statusCode == 404) {
        console.log("Page not found");
    }
    else {
        console.log(error);
    }
}
function parseData(html) {
    let ch = cheerio.load(html);
    let bothInnings = ch(".card.content-block.match-scorecard-table .Collapsible");
    let winningTeam = ch(".summary span").text().split("won")[0].trim();
    // console.log(winningTeam);

    for (let i = 0; i < bothInnings.length; i++) {
        let teamName = ch(bothInnings[i]).find("h5").text();
        teamName = teamName.split("Innings")[0].trim();
        // console.log(teamName);
        if(teamName == winningTeam){
            let allRows = ch(bothInnings[i]).find(".table.batsman tbody tr");
            for (let j = 0; j < allRows.length - 1; j++) {
                let allTds = ch(allRows[j]).find("td");
                if (allTds.length > 1) {
                    let batsmanName = ch(allTds[0]).text();
                    let runs = ch(allTds[2]).text();
                    let balls = ch(allTds[3]).text();
                    let sr = ch(allTds[7]).text();
                    // console.log(batsmanName + " Runs:" + runs + " Balls:" + balls + " S/R :" + sr);
                    createLeaderBoard(teamName , batsmanName , runs , balls );
                }
            }
            console.log("###########################");
        
        }
    }
}


function createLeaderBoard(teamName , batsmanName, runs , balls){
   runs = Number(runs);
   balls = Number(balls);
    //batsman exist or not ?
   for(let i=0 ; i<leaderBoard.length ; i++){
       if(leaderBoard[i].teamName == teamName && leaderBoard[i].batsmanName == batsmanName){
           leaderBoard[i].runs += runs;
           leaderBoard[i].balls += balls;
           return;
       }
   } 
    
    let entry = {
        teamName : teamName,
        batsmanName : batsmanName,
        runs : runs,
        balls : balls
    }
    leaderBoard.push(entry);
}

module.exports = findMatch;