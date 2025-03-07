let counter = 0;

const counterDisplay = document.getElementById("counter");
const incrementButton = document.getElementById("btn-increase");
const decrementButton = document.getElementById("btn-decrease");
const resetButton = document.getElementById("btn-reset");
const asyncIncrementButton = document.getElementById("btn-async-increase");
const asyncDecrementButton = document.getElementById("btn-async-decrease");
const loadingMessage = document.getElementById("loading"); //+

counterDisplay.textContent = counter;
loadingMessage.style.display = "none";

incrementButton.addEventListener("click", () => {
  counter++;
  counterDisplay.textContent = counter;
});

decrementButton.addEventListener("click", () => {
  counter--;
  counterDisplay.textContent = counter;
});

resetButton.addEventListener("click", () => {
  counter = 0;
  counterDisplay.textContent = counter;
});

asyncIncrementButton.addEventListener("click", async () => {
  loadingMessage.style.display = "block";
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await incrementCounter();
  loadingMessage.style.display = "none";
});

asyncDecrementButton.addEventListener("click", async () => {
  loadingMessage.style.display = "block";
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await decrementCounter();
  loadingMessage.style.display = "none";
});

async function incrementCounter() {
  counter++;
  counterDisplay.textContent = counter;
}

async function decrementCounter() {
  counter--;
  counterDisplay.textContent = counter;
}
