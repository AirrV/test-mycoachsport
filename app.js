const mainDiv = document.getElementById('main');

function startNewGame(opponent) {
  document.getElementById("onePlayerScreen").innerHTML = onePlayerScreenContent(opponent)
  document.getElementById("CPUScreen").innerHTML = onePlayerScreenContent("CPU")
}

function choice(el) {
  console.log(el)
}

const onePlayerScreenContent = name => {
  let disabled; 
  name.substring(0,3) === "CPU" ? disabled = "disabled" : disabled = null

  return (`<div>
    <p>Name of the player : ${name}</p>
    <p>Choice</p>
    <button id='rock' name='rock' ${disabled} onclick="game('rock')">Rock</button>
    <button id='paper' name='paper' ${disabled} onclick="game('paper')">Paper</button>
    <button id='scissors' name='scissors' ${disabled} onclick="game('scissors')">Scissors</>
  </div>`
  )
}

const homePage = `<div>
    <h1>The great Tournament</h1>
    <button id="playerVsCpu">Player VS CPU</button>
    <button id="cpuVsCpu">CPU VS CPU</button>
    <div id="onePlayerScreen"></div>
    <div id="CPUScreen"></div>
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
