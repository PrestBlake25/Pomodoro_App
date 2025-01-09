const bells = new Audio('./sounds/bell.wav'); 
const startBtn = document.querySelector('.btn-start');
const pauseBtn = document.querySelector('.btn-pause');
const session = document.querySelector('.minutes'); 
let state = true;
let isPaused = false;
let totalSeconds;

const updateSeconds = () => {
    if (!isPaused) {
        const minuteDiv = document.querySelector('.minutes');
        const secondDiv = document.querySelector('.seconds');

        totalSeconds--;

        let minutesLeft = Math.floor(totalSeconds / 60);
        let secondsLeft = totalSeconds % 60;

        if (secondsLeft < 10) {
            secondDiv.textContent = '0' + secondsLeft;
        } else {
            secondDiv.textContent = secondsLeft;
        }
        minuteDiv.textContent = `${minutesLeft}`;

        if (minutesLeft === 0 && secondsLeft === 0) {
            bells.play();
            clearInterval(myInterval);
        }
    }
};

const appTimer = () => {
    const sessionAmount = Number.parseInt(session.textContent);

    if (state) {
        state = false;
        totalSeconds = sessionAmount * 60;
        myInterval = setInterval(updateSeconds, 1000);
    } else {
        alert('Session has already started.');
    }
};

startBtn.addEventListener('click', appTimer);
pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    if (isPaused) {
        clearInterval(myInterval);
        pauseBtn.textContent = 'Resume';
    } else {
        myInterval = setInterval(updateSeconds, 1000);
        pauseBtn.textContent = 'Pause';
    }
});