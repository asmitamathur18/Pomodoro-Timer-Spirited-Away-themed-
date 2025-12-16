let timer = null;
let isRunning = false;
let isWorkSession = true;
let timeLeft = 25 * 60;

const timerDisplay = document.getElementById("timer");
const music = document.getElementById("bgMusic");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const musicBtn = document.getElementById("musicBtn");

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent =
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;

  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      switchSession();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  isWorkSession = true;
  timeLeft = document.getElementById("workTime").value * 60;
  updateDisplay();
}

function switchSession() {
  isWorkSession = !isWorkSession;
  timeLeft = isWorkSession
    ? document.getElementById("workTime").value * 60
    : document.getElementById("breakTime").value * 60;

  updateDisplay();
  startTimer();
}

function toggleMusic() {
  if (music.paused) {
    music.play();
    musicBtn.textContent = "Pause Music";
  } else {
    music.pause();
    musicBtn.textContent = "Play Music";
  }
}

/* Event listeners */
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
musicBtn.addEventListener("click", toggleMusic);

/* Initial render */
updateDisplay();
