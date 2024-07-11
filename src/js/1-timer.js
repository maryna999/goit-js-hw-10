import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    handleDateSelection(selectedDates[0]);
  },
};
flatpickr("#datetime-picker", options);

let userSelectedDate = null;
const startButton = document.querySelector("[data-start]");
const daysValue = document.querySelector("[data-days]");
const hoursValue = document.querySelector("[data-hours]");
const minutesValue = document.querySelector("[data-minutes]");
const secondsValue = document.querySelector("[data-seconds]");

function handleDateSelection(date) {
  if (date < new Date()) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    startButton.disabled = true;
    startButton.classList.remove('enabled');
  } else {
    userSelectedDate = date;
    startButton.disabled = false;
    startButton.classList.add('enabled');
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerInterface({ days, hours, minutes, seconds }) {
  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
}

function startTimer() {
  const intervalId = setInterval(() => {
    const now = new Date();
    const ms = userSelectedDate - now;

    if (ms <= 0) {
      clearInterval(intervalId);
      iziToast.success({
        title: 'Success',
        message: 'Countdown finished!',
      });
      startButton.disabled = true;
      startButton.classList.remove('enabled');
      document.querySelector("#datetime-picker").disabled = false;
      return;
    }

    const time = convertMs(ms);
    updateTimerInterface(time);
  }, 1000);

  startButton.disabled = true;
  startButton.classList.remove('enabled');
  document.querySelector("#datetime-picker").disabled = true;
}

startButton.addEventListener("click", startTimer);
