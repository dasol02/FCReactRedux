import { createStore } from "./redux.js";
import * as Actions from "./actions.js";
import reducer from "./reducer.js";
import { logger } from "./logger.js";
import { ASYNC_INCREASE_COUNTER } from "./action-type.js";

const asyncRouter = (jobs) => (store) => (next) => (action) => {
  const matchjob = Object.entries(jobs).find(([type]) => action.type === type);

  if (matchjob) {
    matchjob[1](store, action);
  } else {
    next(action);
  }
};

const asyncJobs = {
  [ASYNC_INCREASE_COUNTER]: async (store, action) => {
    store.dispatch(Actions.asyncRequest());

    setTimeout(() => {
      store.dispatch(Actions.increase(20));
      store.dispatch(Actions.asyncResponse());
    }, 3000);
  },
};

const store = createStore(reducer, [logger, asyncRouter(asyncJobs)]);

const counterDisplay = document.querySelector("#counter");
const loadingManager = document.querySelector("#loading");
const btnIncrease = document.querySelector("#btn-increase");
const btnAsyncIncrease = document.querySelector("#btn-async-increase");
const btnDecrease = document.querySelector("#btn-decrease");
const btnReset = document.querySelector("#btn-reset");

store.subscribe(function () {
  const { counter, request } = store.getState();

  loadingManager.style.visibility = request ? "visible" : "hidden";
  counterDisplay.textContent = counter;
});

store.dispatch(Actions.setCounter(0));

btnReset.addEventListener("click", () => {
  store.dispatch(Actions.setCounter(0));
});

btnIncrease.addEventListener("click", () => {
  store.dispatch(Actions.increase());
});

btnAsyncIncrease.addEventListener("click", () => {
  store.dispatch(Actions.asyncIncrease({ url: "/async-increase" }));
});

btnDecrease.addEventListener("click", () => {
  store.dispatch(Actions.decrease());
});
