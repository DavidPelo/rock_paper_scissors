// Global Variables
const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";
const WIN_LIMIT = 5;
const countDownInterval = 1000;
let timeCounter = 3;
let pScore = 0;
let cScore = 0;

// UI Elements
const rockBtn = document.getElementById("rock-button");
const paperBtn = document.getElementById("paper-button");
const scissorsBtn = document.getElementById("scissors-button");
const gameOutcome = document.getElementById('outcome-icon');
const userMessage = document.getElementById("user-message");
const playerScore = document.getElementById('player-score');
const cpuScore = document.getElementById('cpu-score');
const playAgain = document.getElementById('play-again-button');

// Hide play again button
playAgain.style.display = "none";

// Event Listeners
rockBtn.addEventListener('click', playGame);
paperBtn.addEventListener('click', playGame);
scissorsBtn.addEventListener('click', playGame);
playAgain.addEventListener('click', newGame);

function playGame(e) {
    let playerChoice = e.target.innerText.toLowerCase();
    let cpuChoice = getCpuChoice();

    console.log('playerchoice ', playerChoice);

    // countDown();
    displayCpuChoiceIcon(cpuChoice);
    showResultMessageAndUpdateScores(playerChoice, cpuChoice);
}

function getCpuChoice() {
    let randomChoice = Math.floor(Math.random() * 3 + 1);
    let cpuChoiceOutput = "";

    if(randomChoice == 1) {
        cpuChoiceOutput = ROCK;
    } else if (randomChoice == 2) {
        cpuChoiceOutput = PAPER;
    } else if (randomChoice == 3) {
        cpuChoiceOutput = SCISSORS;
    }

    return cpuChoiceOutput;
}

function countDown() {
    if (timeCounter > 0) {
        console.log(timeCounter);
        gameOutcome.innerHTML = timeCounter;
        timeCounter--;
        setTimeout(function() {
            countDown();
        }, countDownInterval);
    } else {
        timeCounter = 3;
        return;
    }
}

function displayCpuChoiceIcon(cpuChoice) {
    console.log('cpuChoice ', cpuChoice)

    gameOutcome.setAttribute('src', `./icons/${cpuChoice}.svg`);

}

function showResultMessageAndUpdateScores(playerChoice, cpuChoice) {
    if(playerChoice == cpuChoice) {
        userMessage.innerHTML = "Draw! Play Again!"
    } else if (playerChoice == ROCK && cpuChoice == PAPER) {
        userMessage.innerHTML = "Paper beats Rock! Computer Wins!"
        cScore++;
        cpuScore.innerHTML = cScore;
    } else if (playerChoice == ROCK && cpuChoice == SCISSORS) {
        userMessage.innerHTML = "Rock beats Scissors! Player Wins!"
        pScore++;
        playerScore.innerHTML = pScore;
    } else if (playerChoice == PAPER && cpuChoice == ROCK) {
        userMessage.innerHTML = "Paper beats Rock! Player Wins!"
        pScore++;
        playerScore.innerHTML = pScore;
    } else if (playerChoice == PAPER && cpuChoice == SCISSORS) {
        userMessage.innerHTML = "Scissors beats Paper! Computer Wins!"
        cScore++;
        cpuScore.innerHTML = cScore;
    } else if (playerChoice == SCISSORS && cpuChoice == ROCK) {
        userMessage.innerHTML = "Rock beats Scissors! Computer Wins!";
        cScore++;
        cpuScore.innerHTML = cScore;
    } else if (playerChoice == SCISSORS && cpuChoice == PAPER) {
        userMessage.innerHTML = "Scissors beats Paper! Player Wins!"
        pScore++;
        playerScore.innerHTML = pScore;
    }

    if(pScore == WIN_LIMIT || cScore == WIN_LIMIT) {
        let winner;

        pScore == WIN_LIMIT ? winner = "Player" : winner = "Computer";

        gameOver(winner);
    }
}

function gameOver(winner) {
    userMessage.innerHTML = `Game Over! ${winner} wins!`

    playAgain.style.display = "inline-block";

    rockBtn.disabled = true;
    paperBtn.disabled = true;
    scissorsBtn.disabled = true;
}

function newGame() {
    pScore = 0;
    cScore = 0;
    playerScore.innerHTML = pScore;
    cpuScore.innerHTML = cScore;
    userMessage.innerHTML = "";
    playAgain.style.display = "none";
    gameOutcome.setAttribute('src', ``);

    rockBtn.disabled = false;
    paperBtn.disabled = false;
    scissorsBtn.disabled = false;
}