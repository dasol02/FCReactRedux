// action
const INCREASE = "INCREMENT";
const DECREASE = "DECREASE";
const RESET = "RESET";
const INCREMENT_ASYNC = "INCREMENT_ASYNC";
const DECREMENT_ASYNC = "DECREMENT_ASYNC";

function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case INCREASE:
      return { count: state.count + 1 };
    case DECREASE:
      return { count: state.count - 1 };
    case RESET:
      return { count: 0 };
    case INCREMENT_ASYNC:
    case DECREMENT_ASYNC:
      return state; // no change in state for async actions
    default:
      return state;
  }
}

function createStore(reducer) {
  let state;
  let listeners = [];

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  dispatch({});

  return { dispatch, getState, subscribe };
}

const store = createStore(reducer);

const counterDisplay = document.getElementById("counter");
const incrementButton = document.getElementById("btn-increase");
const decrementButton = document.getElementById("btn-decrease");
const resetButton = document.getElementById("btn-reset");
const asyncIncrementButton = document.getElementById("btn-async-increase");
const asyncDecrementButton = document.getElementById("btn-async-decrease");
const loadingMessage = document.getElementById("loading"); //+

counterDisplay.textContent = 0;
loadingMessage.style.display = "none";

function render() {
  counterDisplay.textContent = store.getState().count;
}

store.subscribe(render);

incrementButton.addEventListener("click", () => {
  store.dispatch({ type: INCREASE });
});

decrementButton.addEventListener("click", () => {
  store.dispatch({ type: DECREASE });
});

resetButton.addEventListener("click", () => {
  store.dispatch({ type: RESET });
});

asyncIncrementButton.addEventListener("click", async () => {
  loadingMessage.style.display = "block";
  await new Promise((resolve) => setTimeout(resolve, 2000));
  store.dispatch({ type: INCREASE });
  loadingMessage.style.display = "none";
});

asyncDecrementButton.addEventListener("click", async () => {
  loadingMessage.style.display = "block";
  await new Promise((resolve) => setTimeout(resolve, 2000));
  store.dispatch({ type: DECREASE });
  loadingMessage.style.display = "none";
});
render();
