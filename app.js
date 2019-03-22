const mainDiv = document.getElementById('main');
const elements = ["rock", "paper", "scissors"]

function startNewGame(opponent) {
  document.getElementById("onePlayerScreen").innerHTML = onePlayerScreenContent(opponent)
  document.getElementById("CPUScreen").innerHTML = onePlayerScreenContent("CPU")
}

function game(el) {
  if ( !el ) {
    whoWins( "CPU2", randomCPU(), randomCPU() )
  }else {
    document.getElementById("choice").innerHTML = el
    let CPUchoice = randomCPU()
    whoWins( "player", el, CPUchoice )
  }
}

function randomCPU () {
  let id = Math.floor(Math.random() * elements.length)
  return elements[id]
}

function whoWins (player, str1, str2)  {
  let result
  if (str1 === str2){
    result = 'Deuce'
  } else if (( str1 === 'rock' && str2 === 'scissors' )
      || ( str1 === 'scissors' && str2 === 'paper' )
      || ( str1 === 'paper' && str2 === 'rock' )) {
    result = player + 'wins'
  } else {
    result = 'CPU wins'
  }
  document.getElementById("winner").innerHTML = result;
}

const onePlayerScreenContent = name => {
  let disabled;
  name.substring(0,3) === "CPU" ? disabled = "disabled" : disabled = null;
  name.substring(0,4) === "CPU2" ? visibility = "visible" : visibility = "hidden";

  return (`<div>
    <p>Name of the player : ${name}</p>
    <button id='rock' name='rock' ${disabled} onclick="game('rock')">Rock</button>
    <button id='paper' name='paper' ${disabled} onclick="game('paper')">Paper</button>
    <button id='scissors' name='scissors' ${disabled} onclick="game('scissors')">
      Scissors
    </button>
    <button id='random' name='random' style="visibility: ${visibility}" onclick="game()">
      Random
    </button>
  </div>`
  );
}

const homePage = `<div>
    <h1>The great Tournament</h1>
    <button id="playerVsCpu">Player VS CPU</button>
    <button id="cpuVsCpu">CPU VS CPU</button>
    <div id="onePlayerScreen"></div>
    <div id="choice">Choice</div>
    <div id="CPUScreen"></div>
    <div id="winner"></div>
  </div>`

document.addEventListener("DOMContentLoaded", () => {
  let modePlayer = document.getElementById("playerVsCpu")
  let modeCpu = document.getElementById("cpuVsCpu")

  modePlayer.addEventListener('click', () => {
    startNewGame("human")
  })

  modeCpu.addEventListener('click', () => {
    startNewGame("CPU2")
  })

})


mainDiv.innerHTML = homePage
