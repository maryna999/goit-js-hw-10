import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    if (state === "fulfilled") {
      setTimeout(() => {
        resolve(delay);
      }, delay);
    } else if (state === "rejected") {
      setTimeout(() => {
        reject(delay);
      }, delay);
    }
  });
}

function handleFulfilled(delay) {
  iziToast.success({
    title: "Success",
    message: `✅ Fulfilled promise in ${delay}ms`,
    timeout: 3000,
    position: "topRight"
  });
}


function handleRejected(delay) {
  iziToast.error({
    title: "Error",
    message: `❌ Rejected promise in ${delay}ms`,
    timeout: 3000,
    position: "topRight"
  });
}

const form = document.querySelector(".form");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const delay = parseInt(delayInput.value);

  const stateInput = document.querySelector('input[name="state"]:checked');
  const state = stateInput ? stateInput.value : null;

  if (state && !isNaN(delay)) {
    createPromise(delay, state)
      .then(handleFulfilled) 
      .catch(handleRejected);

    delayInput.value = "";
    if (stateInput) stateInput.checked = false;
  } else {
    iziToast.warning({
      title: "Warning",
      message: "Please fill in all fields.",
      timeout: 3000,
      position: "topRight"
    });
  }
});