let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;
const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function startPause() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1);
        startPauseBtn.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(tInterval);
        startPauseBtn.textContent = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    startPauseBtn.textContent = 'Start';
    display.textContent = '00:00:00';
    running = false;
    lapCounter = 0;
    lapsList.innerHTML = '';
}

function lap() {
    if (running) {
        lapCounter++;
        const lapTime = display.textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    milliseconds = (milliseconds < 10) ? '0' + milliseconds : milliseconds;

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);