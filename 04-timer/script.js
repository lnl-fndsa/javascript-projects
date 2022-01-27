const input = document.querySelector('.input-chrono');
const btnStart = document.querySelector('.btn-start');
const btnReset = document.querySelector('.btn-reset');
const spanMin = document.querySelector('.minute');
const spanSec = document.querySelector('.second');
let timer;

const show = (min, sec) => {
    if (min < 10) {
        min = "0" + min;
    }

    if (sec < 10) {
        sec = "0" + sec;
    }

    spanMin.innerText = min;
    spanSec.innerText = sec;
}

const start = () => {
    input.disabled = true;
    btnStart.disabled = true;

    let data = isNaN(input.value) ? 0 : input.value;
    let minute = data !== 0 ? data - 1 : 0;
    let second = 60;

    const update = () => {
        if (second == 0) {
            minute--;
            second = 60;
        }

        second--;

        if (minute == 0 && second == 0) {
            minute = 0;
            clearInterval(timer);
        }
        show(minute, second);
    }

    timer = window.setInterval(update, 1000);
}

const reset = () => {
    input.disabled = false;
    btnStart.disabled = false;
    input.value = "";
    input.style = "";
    clearInterval(timer);
    show(0, 0);
}

btnStart.addEventListener('click', () => {
    if (input.value.length == 0 | isNaN(input.value) | input.value < 0 | input.value > 60) {
        input.style = "border-color: red;";
    } else {
        input.style = "";
        start();
    }
});
btnReset.addEventListener('click', reset);