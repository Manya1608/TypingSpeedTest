const testWrapper=document.querySelector(".test-wrapper");
const testArea=document.querySelector("#test-area");
const originText=document.querySelector(".origin-text p");
const resetButton=document.querySelector("#reset");
const theTimer=document.querySelector(".timer");
        const scoreBox= document.querySelector("#score-screen");
        const speed= document.querySelector("#speed");
        const accuracy= document.querySelector("#accuracy");
        const closebtn= document.querySelector("#score-screen .cross");

var timer=[0,0,0,0];
var interval;
var timerRunning=false;
var errorCount=0;
var a=5;
var timeInMinute;

var texts=["Vegetables and fruits are an important part of a healthy diet, and variety is as important as quantity.",
          "Typing fast is by Mechcanical keyboards, which are the best keyboard, by far in the entire world.",
		  "No single fruit or vegetable provides all of the nutrients you need to be healthy. Eat plenty everyday.",
		  "Don't give up.Normally it is the last key on the ring which opens the door.",
		  "No matter what you do,do it because it is what your heart and soul desire."]

//add leading zero
function leadingZero(time){
	if ( time<=9)
	{
		time="0"+time;
	}
	return time;
}	

//run a standard min/sec/hr timer
function runTimer(){
	let currentTime=leadingZero(timer[0])+":"+leadingZero(timer[1])+":" +leadingZero(timer[2]);
	theTimer.innerHTML=currentTime;
	timer[3]++;
	
	timer[0]=Math.floor((timer[3]/100)/60);
	timer[1]=Math.floor((timer[3]/100)-(timer[0]*60));
	timer[2]=Math.floor(timer[3]-(timer[1]*100)-(timer[0]*6000));
}

//match text entered with provided text
function spellCheck(){
	let textEntered=testArea.value;
	let originTextMatch=originText.innerHTML.substr(0,textEntered.length);
	if(textEntered==originText.innerHTML){
		timeInMinute=timer[3]/100/60;
		clearInterval(interval);
		testWrapper.setAttribute("style","border-color: MediumSeaGreen");
		speed.innerHTML="   " + Math.round((originText.innerHTML.length)/5/(timeInMinute)*100)/100+" ";
        accuracy.innerHTML="  " + Math.round((speed.innerHTML-errorCount/5)/(speed.innerHTML)*10000)/100+"%";
        scoreBox.setAttribute("style","display:block");
	}
	else{
		if(textEntered==originTextMatch){
			testWrapper.setAttribute("style","border-color: #65ccf3");
		}	
		else{
			testWrapper.setAttribute("style","border-color: #e95d0f");
			errorCount++;
		}	
	}	
	console.log(textEntered);
}
//start timer
function start(){
	let textEnteredLength=testArea.value.length;
	if(textEnteredLength === 0 && !timerRunning){
		timerRunning=true;
		interval=setInterval(runTimer,10);
	}
	console.log(textEnteredLength);
}
//reset everything;
function reset(){
	clearInterval(interval);
	interval=null;
	timer=[0,0,0,0];
	timerRunning=false;
	
	testArea.value="";
	theTimer.innerHTML="00:00:00";
	testWrapper.setAttribute("style","border-color: #888");
	var num=Math.floor(Math.random()*5);
    originText.innerHTML=texts[num];
    scoreBox.setAttribute("style","display:none");
    console.log("reset is pressed");
}
//Event listeners for keyboard input and the reset
testArea.addEventListener("keypress",start,false);
testArea.addEventListener("keyup",spellCheck,false);
resetButton.addEventListener("click",reset,false);
closebtn.addEventListener("click",reset);

