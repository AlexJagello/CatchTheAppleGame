'use strict'

const topRectCanvas = document.getElementById("topRectCanvas");
const downRectCanvas = document.getElementById("downRectCanvas");
const ctxTop = topRectCanvas.getContext("2d");
const ctxDown = downRectCanvas.getContext("2d");
const modalWindow = document.querySelector(".modal-window");
const overlay = document.querySelector(".overlay");
const btnCloseModalWindow = document.querySelector(".close-modal-window");
const audioStep = new Audio("https://www.fesliyanstudios.com/play-mp3/6994");
const audioSuccess = new Audio("https://www.fesliyanstudios.com/play-mp3/5255");
const audioUnSuccess = new Audio("https://www.fesliyanstudios.com/play-mp3/2459");
const sourceMain = document.getElementById("sourceMain");
const sourceBomb = document.getElementById("sourceBomb");
const sourceApple = document.getElementById("sourceApple");
const statisticScore = document.getElementById("statisticScore");
const statisticLife = document.getElementById("statisticLife");
const statisticBestResult = document.getElementById("statisticBestResult");
const fallingRectSize = 40;
const amountOfLinesWithCell = 700/fallingRectSize;
const amountOfCellInLine = 1000/fallingRectSize;
const diffShift = fallingRectSize/12;
const downRectHeight = 65;
const downRectWidth = 100;
const arrayOfCells = [];

let bestResult = 0;
let lifes = 1;
let score = 0;
let coordDownRectX = 50;
let shift = 0;




function drawAppleCatcherPicture()
{
    ctxDown.clearRect(0,0,window.innerWidth,60);
    ctxDown.beginPath();
    ctxDown.drawImage(sourceMain, coordDownRectX, 0, downRectWidth, 60);
    ctxDown.fill();
}

function initializeArray()
{
    for(let i = 0; i < amountOfLinesWithCell; i++)
    {
        arrayOfCells[i] = [];
        for(let j = 0; j < amountOfCellInLine; j++)
        arrayOfCells[i][j] = 0;
    }
}

function closeModalWindow()
{
    modalWindow.classList.add('hidden');
    overlay.classList.add('hidden');
    addEventListener("keydown", moveRect);
    udateApples = setInterval(moveApples, 16);
    ctxDown.clearRect(0,0,window.innerWidth,700);
    initializeArray();
    score = 0;
    lifes = 1;
    drawStatistic();
    drawAppleCatcherPicture();
}

function drawStatistic()
{
    statisticLife.textContent = lifes;
    statisticScore.textContent = score;
}

function drawBestResult()
{
    statisticBestResult.textContent = "Best result: " + bestResult;
}

function moveRect(){  
    
if(!keyDown) return;

        switch(keyName){
         
        case "ArrowLeft":  
            if(coordDownRectX > 5)
                coordDownRectX -= 10;
            break;
        case "ArrowRight":  
            if(coordDownRectX < window.innerWidth-10)            
                coordDownRectX += 10;              
            break;
        }
    
  
   
    audioStep.play();
    drawAppleCatcherPicture();
  }

  function moveApples()
  {

    ctxTop.clearRect(0,0,window.innerWidth,700);
    ctxTop.beginPath();
    //ctxTop.fillStyle = "red";

     let newLine = [];

     for(let i = 0; i< amountOfCellInLine; i++)
        {
            let randApple = Math.random() > 0.99;
            let randBomb = Math.random() > 0.992;
            newLine[i] = randApple ? 1 : (randBomb ? 2 : 0);            
        }

    if(shift == fallingRectSize)
    {
        arrayOfCells.unshift(newLine);
        arrayOfCells.pop();
        shift = 0;

        let lastLine = arrayOfCells[arrayOfCells.length - 2];
        for(let i = 0; i < amountOfCellInLine; i++)    
        {
        
            if(lastLine[i] == 1 && isSomethingCatching(i))
            {
                ++score;
                audioSuccess.currentTime = 0;
                audioSuccess.play();
                drawStatistic();
            }
            if(lastLine[i] == 2 && isSomethingCatching(i))
            {
                --lifes;
                audioUnSuccess.currentTime = 0;
                audioUnSuccess.play();
                drawStatistic();
                if(lifes <= 0)
                {
                    modalWindow.classList.remove('hidden');
                    overlay.classList.remove('hidden');
                    clearInterval(udateApples);
                    removeEventListener("keydown", moveRect);    
                    if(score > bestResult){
                        bestResult = score;
                        drawBestResult();
                    }    
                }
            }
        }
    }

    shift += diffShift;
    drawSomeCell(1, sourceApple, shift);
    ctxTop.fill();

    ctxTop.beginPath();
    //ctxTop.fillStyle = "blue";
    drawSomeCell(2, sourceBomb, shift);
    ctxTop.fill();

  }

  function isSomethingCatching(i)
  {
   
    let coordOfFallingRectX = i * fallingRectSize;
    console.log(coordOfFallingRectX + "     "  + coordDownRectX);
    return coordDownRectX - fallingRectSize <= coordOfFallingRectX && coordDownRectX + downRectWidth >= coordOfFallingRectX; 
  }


  function drawSomeCell(oneOrTwo, source, shift){
    for(let i = 0; i < amountOfLinesWithCell; i++)
    {   
        for(let j = 0; j < amountOfCellInLine; j++)
        {
            if(arrayOfCells[i][j] == oneOrTwo)
            {
                ctxTop.drawImage(source,j * fallingRectSize, i * fallingRectSize + shift, fallingRectSize, fallingRectSize);                    
            }
        }      
    }
  }




topRectCanvas.width = window.innerWidth;
downRectCanvas.width = window.innerWidth;

drawStatistic();

initializeArray();

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click',closeModalWindow);

drawAppleCatcherPicture();

addEventListener("keydown", moveRect);

let udateApples = setInterval(moveApples, 16);

var keyDown = false;
var keyName = "";

document.onkeydown = function (evt) {
   if(evt.key == "ArrowLeft" || evt.key == "ArrowRight") {
keyDown = true;
keyName = evt.key;
   }
}

document.onkeyup = function(evt){
 if(evt.key == "ArrowLeft" || evt.key == "ArrowRight") {
keyDown = false;
   }
}

setInterval(moveRect, 20);

 
 