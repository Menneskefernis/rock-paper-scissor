"use strict";

const gameChoices = document.querySelectorAll('.game-choice');
const statusParagraph = document.getElementById('rounds');
const player = document.getElementById('player');
const computer = document.getElementById('computer');
const reset = document.getElementById('reset');

let computerScore = 0;
let playerScore = 0;
let gameRound = 1;
let winner;
        
function computerPlay() {
const rand = Math.floor(Math.random() * 3);
            
    switch (rand) {
        case 0:
            return "Rock";
            break;
        case 1:
            return "Paper";
            break;
        case 2:
            return "Scissors";
            break;
    }
            
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
            
    const upperCaseFirstLetter = playerSelection.charAt(0).toUpperCase();
    playerSelection = upperCaseFirstLetter + playerSelection.slice(1);  

    switch (true) {
        case playerSelection === "Rock" && computerSelection === "Scissors":
        case playerSelection === "Paper" && computerSelection === "Rock":
        case playerSelection === "Scissors" && computerSelection === "Paper":
            playerScore++;
            winner = 'player';
            
            return `You Win! ${playerSelection} ${setSingularPlural(playerSelection)} ${computerSelection}!`;
        case computerSelection === "Rock" && playerSelection === "Scissors":
        case computerSelection === "Paper" && playerSelection === "Rock":
        case computerSelection === "Scissors" && playerSelection === "Paper":
            computerScore++;
            winner = 'computer';

            return `You Lose! ${computerSelection} ${setSingularPlural(computerSelection)} ${playerSelection}!`;
        default:
            return `${playerSelection} vs ${computerSelection}! It's a draw!`;
    }          
}

function setSingularPlural(selection) {
    selection = selection.toLowerCase();

    if (selection === "scissors") {
        return "beat";
    } else {
        return "beats";
    }
}

function playGame() {
    if (gameRound >= 5) return;

    const playerSelection = this.id;
    
    statusParagraph.textContent = `Round ${gameRound + 1}!`;
    statusParagraph.textContent = `${playRound(playerSelection,computerPlay())}`;
    updateScores();
    gameRound++;
     
    if (gameRound < 5) {
        setTimeout(function() {
            if (gameRound < 5) {
                statusParagraph.textContent = `Round ${gameRound + 1}!`;
            }
        }, 2000);
    } else {
        setTimeout(function() {
            setWinner();
        }, 2000);
        
        setTimeout(function() {
            resetGame();
        }, 5000);
    }    
}

function updateScores() {
    if (winner === 'player') {
        player.textContent = `Player: ${playerScore}`;
    }

    if (winner === 'computer') {
        computer.textContent = `Computer: ${computerScore}`;
    }
}

function setWinner() {
    if (playerScore > computerScore) {
        statusParagraph.textContent = "YOU WON! YOU'RE A WINNER!";
    } else if (playerScore < computerScore) {
        statusParagraph.textContent = "YOU LOST! YOU ARE A LOSER!";
    } else {
        statusParagraph.textContent = "IT'S A DRAW!";
    }
}

function resetGame() {
    statusParagraph.textContent = "Round 1!";
    player.textContent = "Player: 0";
    computer.textContent = "Computer: 0";
    gameRound = 0;
    playerScore = 0;
    computerScore = 0;
}

gameChoices.forEach(choice => choice.addEventListener('click', playGame));
reset.addEventListener('click', resetGame);