const mainDiv = document.getElementById('main');
const elements = ["rock", "paper", "scissors"];
let playedGames = 0;
let wonGames = 0;
let gamesRatio = "";
let scoreOpponent;
let scoreCPU;

function startNewGame(opponent) {
  scoreOpponent = 0;
  scoreCPU = 0;
  onePlayerScreen.innerHTML = onePlayerScreenContent(opponent);
  CPUScreen.innerHTML = CPUScreenHTML;
}

function reset() {
  onePlayerScreen.innerHTML = "";
  CPUScreen.innerHTML = "";
  document.getElementById("choice").innerHTML = "";
  document.getElementById("CPUchoice").innerHTML = "";
  document.getElementById("winner").innerHTML = "";
}

function game(el) {

  if ( !el ) {
    let CPUchoice = randomCPU();
    let CPU2choice = randomCPU();
    document.getElementById("choice").innerHTML = CPU2choice
    document.getElementById("CPUchoice").innerHTML = CPUchoice
    whoWins( "CPU2", CPU2choice, CPUchoice )

  } else {
    let CPUchoice = randomCPU()
    document.getElementById("choice").innerHTML = el
    document.getElementById("CPUchoice").innerHTML = CPUchoice
    whoWins( "Player", el, CPUchoice )
  }

}

function randomCPU () {
  let id = Math.floor(Math.random() * elements.length)
  return elements[id]
}

function whoWins (player, str1, str2)  {
  let result;
  let iStr1 = elements.indexOf(str1);
  let iStr2 = elements.indexOf(str2);

  if (str1 === str2){
    result = 'Deuce'

  } else if ( iStr1 % 2 === iStr2 % 2 ) {
    if ( iStr1 < iStr2 ) {
      result = player + ' wins'
      scoreOpponent ++
    } else {
      result = 'CPU wins'
      scoreCPU ++
    }

  } else {
    if ( iStr1 < iStr2 ) {
      result = 'CPU wins'
      scoreCPU ++
    } else {
      result = player + ' wins'
      scoreOpponent ++
    }
  }
  
  document.getElementById("scoreCPU").innerHTML = scoreCPU
  document.getElementById("score").innerHTML = scoreOpponent
  document.getElementById("winner").innerHTML = result;

  if ( scoreOpponent === 3) {
    wonGames ++;
    finalWinner("Player");
  } else if ( scoreCPU === 3) {
    finalWinner("CPU");
  }
}

function finalWinner(winner) {
  setTimeout( () => {
    window.alert( winner +" wins the game");
    playedGames ++
    updateStats();
    reset();
  }, 10)
}

function updateStats() {
  gamesRatio =Math.round((100 * wonGames) / playedGames);
  document.getElementById("spanPlayedGames").innerHTML = playedGames;
  document.getElementById("spanWonGames").innerHTML = wonGames;
  document.getElementById("spanRatio").innerHTML = gamesRatio;  
}

const CPUScreenHTML = `<div>
    <p>CPU</p>
    <div id="scoreCPU">0</div>
  </div>`

const onePlayerScreenContent = (type) => {
  let randomDisplay;
  let elementsDisplay

  if ( type.substring(0,4) === "CPU2" ) {
    randomDisplay = "flex";
    elementsDisplay = "none"; 
  } else {
    randomDisplay = "none";
    elementsDisplay = "flex";
  }

  return (`<div>
    <p>Name of the player : ${type}</p>
    <div id="elementsButtons" style="display: ${elementsDisplay}">
      <button id='rock' name='rock'  onclick="game('rock')">Rock</button>
      <button id='paper' name='paper' onclick="game('paper')">Paper</button>
      <button id='scissors' name='scissors' onclick="game('scissors')">
        Scissors
      </button>
    </div>
    <button id='random' name='random' style="display: ${randomDisplay}" onclick="game()">
      GO !
    </button>
    <div id="score">0</div>
  </div>`
  );
}

const homePage = `<div>
    <h1>The great Tournament</h1>
    <h3>For My Coach Sport</h3>
    <p>Total games played: <span id="spanPlayedGames">0</span></p>
    <p>Total games won: <span id="spanWonGames">0</span></p>
    <p>Ratio: <span id="spanRatio"></span> %</p>
    <p>You can choose to play yourself or let a computer fight on your behalf :</p>
    <button id="playerVsCpu">I will handle it myself</button>
    <button id="cpuVsCpu">Let's see what this machine can do</button>
    <div id="CPUScreen"></div>
    <div id="CPUchoice"></div>
    <div id="onePlayerScreen"></div>
    <div id="choice"></div>
    <div id="winner"></div>
  </div>`

document.addEventListener("DOMContentLoaded", () => {
  let modePlayer = document.getElementById("playerVsCpu");
  let modeCpu = document.getElementById("cpuVsCpu");
  let onePlayerScreen = document.getElementById("onePlayerScreen");
  let CPUScreen = document.getElementById("CPUScreen")

  modePlayer.addEventListener('click', () => {
    startNewGame("human")
  })

  modeCpu.addEventListener('click', () => {
    startNewGame("CPU2")
  })

})


mainDiv.innerHTML = homePage
