/*LANDING PAGE*/ 

const daysRemaining = document.getElementById("days-remaining");
const hoursRemaining = document.getElementById("hours-remaining");
const minutesRemaining = document.getElementById("minutes-remaining");



//for countdown
let timeOfCompetition = new Date(2023, 4, 6, 5, 0, 0);

//Getting current date
let currentTime = new Date();
let difference = Math.abs(timeOfCompetition.getTime() - currentTime.getTime())/1000;


let remainingTimeData = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
}


function calculateTimeRemaining(diff){
    // Getting current time every call
    currentTime = new Date();
    difference = Math.abs(timeOfCompetition.getTime() - currentTime.getTime())/1000;
    //resetting values
    remainingTimeData.days = 0;
    remainingTimeData.hours = 0;
    remainingTimeData.minutes = 0;
    remainingTimeData.seconds = 0;

    //looping through data 
    for(let i = 0; diff >= 0; i++){
        if(diff > 86400){
            remainingTimeData.days++;
            diff = diff -  86400;
        }
        else if( diff > 3600){
            remainingTimeData.hours++;
            diff = diff - 3600;
    
        }
        else if( diff > 60){
            remainingTimeData.minutes++;
            diff = diff -  60;
    
        }
        else{
            remainingTimeData.seconds++;
            diff = diff - 1;
    
        }
    }

    // returning information to DOM
    daysRemaining.innerHTML = remainingTimeData.days;
    hoursRemaining.innerHTML = remainingTimeData.hours;
    if(parseInt(remainingTimeData.seconds) < 10){
        minutesRemaining.innerHTML = `${remainingTimeData.minutes}:0${remainingTimeData.seconds}`;

    }
    else if(parseInt(remainingTimeData.seconds) == 60){
        minutesRemaining.innerHTML = `${remainingTimeData.minutes+1}:00`;

    }
    else if(parseInt(remainingTimeData.minutes) < 10){
        minutesRemaining.innerHTML = `0${remainingTimeData.minutes}:${remainingTimeData.seconds}`;

    }
    else{
        minutesRemaining.innerHTML = `${remainingTimeData.minutes}:${remainingTimeData.seconds}`;
    }
    // returning information to DOM end



}
if(document.URL.includes("index.html")){
    setInterval( () => calculateTimeRemaining(difference), 1000);

}






//Hamburger menu

let menuList = document.getElementById("menu");
let hamburgerMenu = document.getElementById("menu-hamburger");


function openCloseMenu(){
    console.log(menuList.style.display)
    if(menuList.style.display === ''){
        menuList.style.display = "flex";
        console.log("ay1a")

    }
    else if(menuList.style.display === 'flex'){
        menuList.style.display = "none";
        console.log("ay2a")

    }
    else if(menuList.style.display === 'none'){
        menuList.style.display = "flex";

    }
}


//LANDING PAGE END


//CALCULATOR
// https://ub2023-backend.onrender.com/api/v1/stages API


//API for data

if(document.URL.includes("calculator.html")){
    const url = 'https://ub2023-backend.onrender.com/api/v1/stages';

let apiData;

async function harvestData(url){
    const respone = await fetch(url);
    apiData = await respone.json();;
}
harvestData(url).then( function() { 
    
    const templateStageAssignment = document.getElementById("stage-assignment-row");
    const templateContentStage = templateStageAssignment.content.querySelector(".flex-row");

    for (let i = 0; i < apiData.length; i++) {
    let teamStageRow = document.importNode(templateContentStage, true);
    teamStageRow.querySelector("h2:nth-child(1)").textContent = i+1;
    teamStageRow.id = i;
    teamStageRow.querySelector("h2:nth-child(2)").textContent = apiData[i].distance;
    teamStageRow.querySelector("h2:nth-child(3)").textContent = apiData[i].startingLocation;
    teamStageRow.querySelector("h2:nth-child(4)").textContent = apiData[i].arrivalLocation;
    teamStageRow.querySelector("h2:nth-child(5)").textContent = apiData[i].name;

    for (let j = 0; j < 10; j++) {
        const option = document.createElement("option");
        option.textContent = `${memberData[j].first} ${memberData[j].last}`;
        teamStageRow.querySelector(`.runners`).append(option)
        
        
    }

    document.getElementsByClassName("flex-container-two")[0].append(teamStageRow);
    

   
    


}

 } );

//console.log(harvestData(url))

const templateTeamMember = document.getElementById("team-member-row");
const templateContent = templateTeamMember.content.querySelector(".flex-row");

for (let i = 0; i < 10; i++) {
    let teamMemberRow = document.importNode(templateContent, true);
    teamMemberRow.querySelector("h2:nth-child(1)").textContent = i+1;
    teamMemberRow.id = i;

    teamMemberRow.querySelector("h2:nth-child(2)").id = "1-first-name";
    teamMemberRow.querySelector("h2:nth-child(3)").id = "2-last-name";
    teamMemberRow.querySelector("h2:nth-child(4)").id = "3-speed";


    teamMemberRow.querySelector("h2:nth-child(2)").addEventListener('input', storeData);

    teamMemberRow.querySelector("h2:nth-child(3)").addEventListener('input', storeData);

    teamMemberRow.querySelector("h2:nth-child(4)").addEventListener('input', storeData);

    document.getElementsByClassName("flex-container")[0].append(teamMemberRow);
    
}





function storeData(event){
    let columnId = event.target.id.split("-")[1];
    let rowId = event.target.parentElement.id;
    let value = event.target.childNodes[0].data;
    memberData[rowId][columnId] = value;


    
}

let memberData = [];
for(let i = 0; i < 10;++i){
    memberData.push({});
}

const dropDown = document.getElementById("runners");

}






////CALCULATOR END