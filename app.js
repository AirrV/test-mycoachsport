const mainDiv = document.getElementById('main');
const elements = ["rock", "paper", "scissors"];
let playedGames = 0;
let wonGames = 0;
let gamesRatio = "";
let scoreOpponent;
let scoreCPU;

function startNewGame(opponent) {
  console.log("player", localStorage.getItem("storedPlayerName"))
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
    whoWins( playerName + "'s computer", CPU2choice, CPUchoice )

  } else {
    let CPUchoice = randomCPU()
    document.getElementById("choice").innerHTML = `<p>${el}</p>`
    document.getElementById("CPUchoice").innerHTML = `<p>${CPUchoice}</p>`
    whoWins( playerName, el, CPUchoice )
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
      result = 'Opponent wins'
      scoreCPU ++
    }

  } else {
    if ( iStr1 < iStr2 ) {
      result = 'Opponent wins'
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
    finalWinner(playerName);
  } else if ( scoreCPU === 3) {
    finalWinner("Opponent");
  }
}

function finalWinner(winner) {
  setTimeout( () => {
    window.alert( winner +" wins the match !");
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
  localStorage.setItem("storedPlayedGames", playedGames); 
  localStorage.setItem("storedWonGames", wonGames);
  localStorage.setItem("storedGamesRatio", gamesRatio);  
}

function eraseAllData() {
  localStorage.clear();
  document.location.reload(true);
}

const CPUScreenHTML = `<div>
    <p>Opponent</p>
    <button style="visibility:hidden; line-height:1.5"></button>
    <div id="scoreCPU" class="scores">0</div>
  </div>`

const onePlayerScreenContent = (type) => {
  let randomDisplay;
  let elementsDisplay;
  let challenger;

  if ( type.substring(0,3) === "CPU" ) {
    randomDisplay = "flex";
    elementsDisplay = "none";
    challenger = playerName + "'s computer";
  } else {
    randomDisplay = "none";
    elementsDisplay = "flex";
    challenger = type;
  }

  return (`<div>
    <p>${challenger}</p>
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
    <div id="score" class="scores">0</div>
  </div>`
  );
}

const homePage = `<div>
    <div id="upperBar">
      <h1>The great Tournament</h1>
      <h3>For 
        <a href="https://www.mycoachsport.com/fr/">
          <img src="./logo-mycoachsport.png" alt="My coach sport" />
        </a>
      </h3>
    </div>

    <div id="typeSelector">
      <p>You can choose to play yourself or let a computer fight on your behalf :</p>
      <button id="playerVsCpu">I will handle it myself</button>
      <button id="cpuVsCpu">Let's see what this machine can do</button>
    </div>

    <div id="gamingZone">
      <div class="playerScreen">
        <div id="choice" class="chosenElement"></div>
        <div id="onePlayerScreen" ></div>
      </div>
      <div class="playerScreen">
        <div id="CPUchoice" class="chosenElement"></div>
        <div id="CPUScreen"></div>
      </div>
      <div id="winner"></div>
    </div>

    <div id="statistics">
      <div id="playerNameHTML"></div>
      <p>Total games played: <span id="spanPlayedGames">0</span></p>
      <p>Total games won: <span id="spanWonGames">0</span></p>
      <p>Ratio: <span id="spanRatio"></span> %</p>
      <button id="restart" onclick="eraseAllData()">Restart from zero</button>
    </div>

  </div>`

document.addEventListener("DOMContentLoaded", () => {
  let modePlayer = document.getElementById("playerVsCpu");
  let modeCpu = document.getElementById("cpuVsCpu");
  let onePlayerScreen = document.getElementById("onePlayerScreen");
  let CPUScreen = document.getElementById("CPUScreen");

  modePlayer.addEventListener('click', () => {
    startNewGame(playerName)
  })

  modeCpu.addEventListener('click', () => {
    startNewGame("CPU")
  })

  if ( localStorage.getItem("storedPlayerName")) {
    playerName = localStorage.getItem("storedPlayerName");
//    window.alert("Welcome back " + playerName + " !");
    document.getElementById("playerNameHTML").innerHTML = playerName + "'s games stats"

    if ( localStorage.getItem("storedPlayedGames")) {
      playedGames = localStorage.getItem("storedPlayedGames");
      wonGames = localStorage.getItem("storedWonGames");
      gamesRatio = localStorage.getItem("storedGamesRatio");

      document.getElementById("spanPlayedGames").innerHTML = playedGames;
      document.getElementById("spanWonGames").innerHTML = wonGames;
      document.getElementById("spanRatio").innerHTML = gamesRatio;
    }
  } else {
    playerName = window.prompt("What's your name ?");
    localStorage.setItem("storedPlayerName", playerName)
    document.getElementById("playerNameHTML").innerHTML = playerName + "'s games stats"
  }

})


mainDiv.innerHTML = homePage
