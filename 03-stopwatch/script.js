const spans = document.querySelectorAll('.timer span');
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const splitBtn = document.querySelector('#split');
const resetBtn = document.querySelector('#reset');
const storage = document.querySelector('.storage');
const data = document.querySelector('.data');

let [msSpan, sSpan, minSpan, hSpan] = [spans[3], spans[2], spans[1], spans[0]];
let [millisecond, second, minute, hour] = [0, 0, 0, 0];
let tab = [];
let chrono;

const display = (h, m, s, ms) => {
    return [
        hour < 10 ? '0' + hour : hour,
        minute < 10 ? '0' + minute : minute,
        second < 10 ? '0' + second : second,
        millisecond < 100 ? '0' + millisecond : millisecond
    ]
}

const showChrono = (ms, s, m, h) => {
    const tabChrono = display(h, m, s, ms);
    hSpan.innerText = tabChrono[0];
    minSpan.innerText = tabChrono[1];
    sSpan.innerText = tabChrono[2];
    msSpan.innerText = tabChrono[3];
}

const updateChrono = () => {
    millisecond += 10;

    if (millisecond === 1000) {
        millisecond = 0;
        second++;
    }

    if (second === 60) {
        second = 0;
        minute++;
    }

    if (minute === 60) {
        minute = 0;
        hour++
    }

    showChrono(millisecond, second, minute, hour);
}

const showInterval = () => {
    storage.classList.add('active');
    tab.push(display(hour, minute, second, millisecond));

    let listChrono = tab.map(item => {
        item = item.join(" : ");
        return `<p>${item}</p>`;
    });

    listChrono = listChrono.join("");
    data.innerHTML = listChrono;
}

const start = () => {
    chrono = window.setInterval(updateChrono, 10);
    startBtn.disabled = true;
    stopBtn.disabled = false;
    splitBtn.disabled = false;
}

const stop = () => {
    clearInterval(chrono);
    startBtn.disabled = false;
    stopBtn.disabled = true;
    splitBtn.disabled = true;
    showInterval();
}

const split = () => {
    showInterval();
}

const reset = () => {
    clearInterval(chrono);
    startBtn.disabled = false;
    storage.classList.remove('active');
    [millisecond, second, minute, hour] = [0, 0, 0, 0];
    tab = [];
    data.innerHTML = "";
    showChrono("00", second, minute, hour);
}

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);
splitBtn.addEventListener('click', split);