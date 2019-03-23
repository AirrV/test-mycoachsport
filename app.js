const mainDiv = document.getElementById('main');
const elements = ["rock", "paper", "scissors"]

function startNewGame(opponent) {
  onePlayerScreen.innerHTML = onePlayerScreenContent(opponent)
  CPUScreen.innerHTML = onePlayerScreenContent("CPU")
}

function game(el) {

  if ( !el ) {
    let CPUchoice = randomCPU();
    let CPU2choice = randomCPU();
    document.getElementById("choice").innerHTML = CPU2choice
    document.getElementById("CPUchoice").innerHTML = CPUchoice
    whoWins( "CPU2", CPU2choice, CPUchoice )

  }else {
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
    } else {
      result = 'CPU wins'
    }

  } else {
    if ( iStr1 < iStr2 ) {
      result = 'CPU wins'
    } else {
      result = player + ' wins'
    }
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
    <h3>For My Coach Sport</h3>
    <button id="playerVsCpu">Player VS CPU</button>
    <button id="cpuVsCpu">CPU VS CPU</button>
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
