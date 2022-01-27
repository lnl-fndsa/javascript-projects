const endDate = document.querySelector('.end-date');
const input = document.querySelector('.deadline-input');
const btnReset = document.querySelector('.btn-reset');
const containerOff = document.querySelector('.countdown-off');
const containerOn = document.querySelector('.countdown-on');
const items = document.querySelectorAll('.counter h3');
let timer;

const formatNumber = (item) => {
    if (item < 10) {
        return item = `0${item}`;
    }
    return item;
}

const start = () => {
    if (input.value) {
        containerOff.classList.remove('d-flex', 'active');
        containerOn.classList.add('d-flex', 'active');
        input.disabled = true;
    } else {
        return;
    }

    const futureDate = new Date(input.value);
    const year = futureDate.getFullYear();
    const hours = futureDate.getHours();
    const minutes = futureDate.getMinutes();
    const month = new Intl.DateTimeFormat('fr-Fr', { month: 'long' }).format(futureDate);
    const date = futureDate.getDate();
    const weekday = new Intl.DateTimeFormat('fr-Fr', { weekday: 'long' }).format(futureDate);
    const futurTime = futureDate.getTime();

    const getRemainingTime = () => {
        const today = new Date().getTime();
        const time = futureDate - today;
        const oneDay = 24 * 60 * 60 * 1000;
        const oneHour = 60 * 60 * 1000;
        const oneMinute = 60 * 1000;

        let days = Math.floor(time / oneDay);
        let hours = Math.floor((time % oneDay) / oneHour);
        let minutes = Math.floor((time % oneHour) / oneMinute);
        let seconds = Math.floor((time % oneMinute) / 1000);

        const values = [days, hours, minutes, seconds];
        items.forEach((item, index) => {
            item.textContent = formatNumber(values[index]);
        });

        if (time < 0) {
            clearInterval(timer);
            btnReset.parentNode.style = "display: none;";
            containerOn.innerHTML = `<h2 class="h1 m-0 fw-bold">L'annonce est terminée</h2>`;
        }
    }

    endDate.textContent = `${weekday} ${date} ${month} ${year} à ${formatNumber(hours)} : ${formatNumber(minutes)}`;
    timer = setInterval(getRemainingTime, 1000);
    getRemainingTime();
}

const reset = () => {
    clearInterval(timer);
    input.disabled = false;
    input.value = "";
    containerOff.classList.add('d-flex', 'active');
    containerOn.classList.remove('d-flex', 'active');
}

input.addEventListener('focusout', start);
btnReset.addEventListener('click', reset);