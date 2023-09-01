'use strict'

const topRectCanvas = document.getElementById("topRectCanvas");
const downRectCanvas = document.getElementById("downRectCanvas");
const ctxTop = topRectCanvas.getContext("2d");
const ctxDown = downRectCanvas.getContext("2d");
const audioStep = new Audio("https://www.fesliyanstudios.com/play-mp3/6994");
const audioSuccess = new Audio("https://www.fesliyanstudios.com/play-mp3/5255");
const audioUnSuccess = new Audio("https://www.fesliyanstudios.com/play-mp3/2459");

const sourceMain = document.getElementById("sourceMain");
const sourceBomb = document.getElementById("sourceBomb");
const sourceApple = document.getElementById("sourceApple");


const statisticScore = document.getElementById("statisticScore");
const statisticLife = document.getElementById("statisticLife");
const fallingRectSize = 40;
const amountOfLinesWithCell = 700/fallingRectSize;
const amountOfCellInLine = 1000/fallingRectSize + 1;
const downRectHeight = 65;
const downRectWidth = 80;
const arrayOfCells = [];

let lifes = 10;
let score = 0;
statisticLife.textContent = "Lifes: " + lifes;

let coordDownRectX = 50;
topRectCanvas.width = window.innerWidth;
downRectCanvas.width = window.innerWidth;

for(let i = 0; i < amountOfLinesWithCell; i++)
    {
        arrayOfCells[i] = [];
        for(let j = 0; j < amountOfCellInLine; j++)
        arrayOfCells[i][j] = 0;
    }



function moveRect(e){
    ctxDown.clearRect(0,0,window.innerWidth,60);
    ctxDown.beginPath();
  
    if(e!=null)
    {
        switch(e.key){
         
        case "ArrowLeft":  
            if(coordDownRectX > 5)
                coordDownRectX -= 10;
            break;
        case "ArrowRight":  
            if(coordDownRectX < window.innerWidth-10)            
                coordDownRectX += 10;              
            break;
        }
    }
  
   
    audioStep.play();

    ctxDown.drawImage(sourceMain, coordDownRectX, 0, downRectWidth, 60);
    ctxDown.fill();
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

    arrayOfCells.unshift(newLine);
    arrayOfCells.pop();

    drawSomeCell(1, sourceApple);
    ctxTop.fill();

    ctxTop.beginPath();
    //ctxTop.fillStyle = "blue";
    drawSomeCell(2, sourceBomb);
    ctxTop.fill();


    let lastLine = arrayOfCells[arrayOfCells.length - 2];
    for(let i = 0; i < amountOfCellInLine; i++)    
    {
        
        if(lastLine[i] == 1 && isSomethingCatching(i))
        {
            ++score;
            audioSuccess.currentTime = 0;
            audioSuccess.play();
            statisticScore.textContent = "Score : " + score;
        }
        if(lastLine[i] == 2 && isSomethingCatching(i))
        {
            --lifes;
            audioUnSuccess.currentTime = 0;
            audioUnSuccess.play();
            statisticLife.textContent = "Lifes: " + lifes;
        }
    }
  }

  function isSomethingCatching(i)
  {
   
    let coordOfFallingRectX = i * fallingRectSize;
    console.log(coordOfFallingRectX + "     "  + coordDownRectX);
    return coordDownRectX - fallingRectSize <= coordOfFallingRectX && coordDownRectX + downRectWidth >= coordOfFallingRectX; //вот здесь ошибка
  }


  function drawSomeCell(oneOrTwo, source){
    for(let i = 0; i < amountOfLinesWithCell; i++)
    {   
        for(let j = 0; j < amountOfCellInLine; j++)
        {
            if(arrayOfCells[i][j] == oneOrTwo)
            {
                ctxTop.drawImage(source,j * fallingRectSize, i * fallingRectSize, fallingRectSize, fallingRectSize);                    
            }
        }      
    }
  }


  moveRect(null);

  addEventListener("keydown", moveRect);

  let udateApples = setInterval(moveApples, 200);

 