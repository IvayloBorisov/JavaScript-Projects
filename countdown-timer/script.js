
const daysEl = document.querySelector('#days');
const hoursEl = document.querySelector('#hours');
const minutesEl = document.querySelector('#minutes');
const secondsEl = document.querySelector('#seconds');

function countdown() {

    const newYear = new Date('1 Jan 2021');
    const currentDate = new Date();
    const totalSeconds = (newYear - currentDate) / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const days = Math.floor(totalSeconds / 3600 / 24);

    daysEl.innerText = formatTime(days);
    hoursEl.innerText = formatTime(hours);
    minutesEl.innerText = formatTime(minutes);
    secondsEl.innerText = formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? `0${ time }` : time;
}

countdown();

setInterval(countdown, 1000);