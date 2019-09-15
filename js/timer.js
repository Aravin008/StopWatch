let timer = document.getElementById("timer");
let timeP = document.getElementById("time");
let secS = document.getElementById("sec");
let cenSecS = document.getElementById("cen-sec");
let startButton = document.getElementById("start-button");
let buttonDiv = document.getElementById('buttons');

let buttonStop = document.createElement("button");
buttonStop.textContent = "Stop";
startButton.textContent = "Start";

// Laps
buttonStop.style.margin = "0 5px 0";
let lapButton = buttonStop.cloneNode(true);
lapButton.textContent = "Lap";

let targetStart = null;
let intervalId = null;
let sec = 0;
let cenSec = 0;
let mins = 0;

function formatTime(timeUnit) {
  if (timeUnit === 0) {
    return '00';
  } else if(timeUnit < 10) {
    return '0'+timeUnit;
  }else {
    return timeUnit;
  }
}

function intervalCallback(e) {

  if (targetStart === null || targetStart === 'pause') {
    targetStart = e.target;
    buttonStop.textContent = 'Stop';
    buttonDiv.appendChild(buttonStop);
    buttonDiv.appendChild(lapButton);
    intervalId = setInterval(() => {
      cenSec += 1;
      if (cenSec >= 100) {
        sec += 1;
        cenSec = 0;
      }
      if(sec >= 60) {
        mins += 1;
        sec = 0;
      }
      secS.textContent = formatTime(sec);
      cenSecS.textContent = formatTime(cenSec);
      min.textContent = formatTime(mins);
    }, 10);
  }
}

function stopTimer(e) {
  // startButton.removeEventListener("click", intervalCallback);
  targetStart = 'pause';
  // buttonDiv.removeChild(lapButton);
  clearInterval(intervalId);

  if(buttonStop.textContent === 'Reset') {
    sec = 0;
    cenSec = 0;
    mins = 0;
    secS.textContent = formatTime(sec);
    cenSecS.textContent = formatTime(cenSec);
    min.textContent = formatTime(mins);
    // buttonStop.textContent = 'Stop';
    buttonDiv.removeChild(lapButton);
    buttonDiv.removeChild(buttonStop);
    // To remove laps in children.
    while (lapDiv.firstChild) {
      lapDiv.removeChild(lapDiv.firstChild);
    }
  } else if(buttonStop.textContent === 'Stop') {
    buttonStop.textContent = 'Reset';
  }
}

let lapDiv = document.getElementById('lap');
lapDiv.style.textAlign = 'center';
lapDiv.style.marginTop = "1rem";
let lapHeader = document.createElement('p');
lapHeader.textContent = "Your Lap Times:"

// lapDiv.appendChild()
function lapIt() {
  let li = document.createElement('li');
  li.innerHTML = formatTime(mins)+ ':' + formatTime(sec) + ':' + formatTime(cenSec);
  lapDiv.appendChild(li);
}
// Event listnersec
startButton.addEventListener("click", intervalCallback);
buttonStop.addEventListener('click', stopTimer);
lapButton.addEventListener('click', lapIt)

timeP.style.fontSize = "2rem";
secS.textContent = "00";
cenSecS.textContent = "00";
min.textContent = "00";

timeP.style.textAlign = "center";
document.getElementsByClassName('container')[0].style.textAlign = 'center';
document.getElementsByTagName('header')[0].style.textAlign = 'center';
