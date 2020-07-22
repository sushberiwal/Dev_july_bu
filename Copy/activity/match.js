let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let path = require("path");
// "https://www.espncricinfo.com/series/8039/scorecard/656495/australia-vs-new-zealand-final-icc-cricket-world-cup-2014-15"
let lb=[];
let count=0;
function findMatch(link) {
    count++;
    request(link, dataReceiver);
}
function dataReceiver(error, response, html) {
    count--;
    if (error == null && response.statusCode == 200) {
        parseData(html);
        if(count==0){
             console.table(lb);
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
    let wt = ch(".summary span").text().split("won")[0].trim();
    // console.log(wt);
    
    for (let i = 0; i < bothInnings.length; i++) {
        let teamName = ch(bothInnings[i]).find("h5").text();
        teamName = teamName.split("Innings")[0].trim();
        if (teamName == wt) {
            console.log(teamName);
            let allRows = ch(bothInnings[i]).find(".table.batsman tbody tr");
            for (let j = 0; j < allRows.length - 1; j++) {
                let allTds = ch(allRows[j]).find("td");
                if (allTds.length > 1) {
                    let batsmanName = ch(allTds[0]).text();
                    let runs = ch(allTds[2]).text();
                    let balls = ch(allTds[3]).text();
                    let sr = ch(allTds[7]).text();
                    // console.log(batsmanName + " Runs:" + runs + " Balls:" + balls + " S/R :" + sr);
                    // processData(teamName, batsmanName, runs, balls, sr);
                    processLeaderBoard(teamName, batsmanName, runs, balls, sr);
                }
            }
            console.log("###########################");
        }
    }
}

function processLeaderBoard(teamName , batsmanName , runs , balls , sr){
    runs = Number(runs);
    balls = Number(balls);
    for(let i=0 ; i<lb.length ; i++){
        if(lb[i].team == teamName && lb[i].batsman == batsmanName){
            lb[i].runs += runs;
            lb[i].balls += balls;
            return;
        }
    }
    let entry={
        team : teamName ,
        batsman : batsmanName ,
        runs : runs,
        balls : balls,
        sr : sr
    };
    lb.push(entry);
}



function checkTeamFolder(teamName) {
    let teamFolderExists = fs.existsSync(teamName);
    if (teamFolderExists == true) {
        return true;
    }
    else {
        return false;
    }
}
function createTeamFolder(teamName) {
    fs.mkdirSync(teamName);
}
function checkBatsmanFile(teamName, batsmanName) {
    let filePath = path.join(teamName, batsmanName + ".json");
    let isBatsman = fs.existsSync(filePath);
    if (isBatsman == true) {
        return true;
    }
    else {
        return false;
    }
}
function createBatsmanFile(teamName, batsmanName, runs, balls, sr) {
    let filePath = path.join(teamName, batsmanName + ".json");
    let data = [];
    let entry = {
        team: teamName,
        batsman: batsmanName,
        runs: runs,
        balls: balls,
        SR: sr
    }
    data.push(entry);
    data = JSON.stringify(data);
    fs.writeFileSync(filePath, data);
}
function updateBatsmanFile(teamName, batsmanName, runs, balls, sr) {
    let filePath = path.join(teamName, batsmanName + ".json");
    let content = fs.readFileSync(filePath);
    let entry = {
        team: teamName,
        batsman: batsmanName,
        runs: runs,
        balls: balls,
        SR: sr
    };
    content = JSON.parse(content);
    content.push(entry);
    content = JSON.stringify(content);
    fs.writeFileSync(filePath, content);
}
function processData(teamName, batsmanName, runs, balls, sr) {
    // check if team Folder exists ?
    let isTeam = checkTeamFolder(teamName);
    //if yes
    if (isTeam == true) {
        //check batsman file?
        let isBatsman = checkBatsmanFile(teamName, batsmanName);
        //if yes
        if (isBatsman == true) {
            //update batsman file
            updateBatsmanFile(teamName, batsmanName, runs, balls, sr);
        }
        else {
            //create batsman file
            createBatsmanFile(teamName, batsmanName, runs, balls, sr);
        }
    }
    else {
        createTeamFolder(teamName);
        createBatsmanFile(teamName, batsmanName, runs, balls, sr);
    }
}
module.exports = findMatch;