let time = 0;
let timerInterval;
let isRunning = false;

window.addEventListener('message', async ({ data }) => {
    if (data.action == 'startTimer') {
        startTimer(data);
    } else if (data.action == 'stopTimer') {
        stopTimer();
    } else if (data.action == 'changeText') {
        if (data.title) {
            changeSubtext1(data.title);
        }
        if (data.subtitle) {
            changeSubtext2(data.subtitle);
        };
    };
});


function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateTimer() {
    if (time > 0) {
        time--;
        timer = document.getElementById('timer')
        timer.textContent = formatTime(time);
    } else {
        stopTimer();
        onTimerEnd();
    }
}

function changeSubtext1(newText) {
    subtext = document.getElementById('subtext1');
    subtext.innerHTML = newText;
}

function changeSubtext2(newText) {
    subtext = document.getElementById('subtext2');
    subtext.innerHTML = newText;
}

function startTimer(data) {
    if (!isRunning) {
        time = data.time;
        if (data.title) {
            changeSubtext1(data.title);
        }
        if (data.subtitle) {
            changeSubtext2(data.subtitle);
        };
        timerInterval = setInterval(updateTimer, 1000);
        isRunning = true;
        setTimeout(() => {
            document.getElementsByTagName('html')[0].style.display = 'block';
        }, 1100);
    }
}

function stopTimer() {
    document.getElementsByTagName('html')[0].style.display = 'none';
    document.getElementById('subtext1').innerHTML = "";
    document.getElementById('subtext2').innerHTML = "";
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }
}

function onTimerEnd() {
    console.log('Timer has ended!');
    clearInterval(timerInterval);
}
