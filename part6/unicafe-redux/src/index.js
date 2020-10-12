import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const state = store.getState();

  const good = () => {
    store.dispatch({
      type: "GOOD",
    });
  };

  const ok = () => {
    store.dispatch({
      type: "OK",
    });
  };

  const bad = () => {
    store.dispatch({
      type: "BAD",
    });
  };

  const zero = () => {
    store.dispatch({
      type: "ZERO",
    });
  };

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>neutral</button>
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <div>good {state.good}</div>
      <div>neutral {state.ok}</div>
      <div>bad {state.bad}</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
