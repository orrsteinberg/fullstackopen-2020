import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = good * 1 + neutral * 0 + bad * -1; // Good = 1, neutral = 0, bad = -1
  const positivePercent = `${(good / total) * 100}%`;

  if (good > 0 || neutral > 0 || bad > 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <Statistic text="Good" value={good} />
            <Statistic text="Neutral" value={neutral} />
            <Statistic text="Bad" value={bad} />
            <Statistic text="All" value={total} />
            <Statistic text="Average" value={average} />
            <Statistic text="Positive" value={positivePercent} />
          </tbody>
        </table>
      </div>
    );
  }

  return <p>No feedback given</p>;
};

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodVote = () => setGood(good + 1);

  const handleNeutralVote = () => setNeutral(neutral + 1);

  const handleBadVote = () => setBad(bad + 1);

  return (
    <>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodVote} text="Good" />
      <Button handleClick={handleNeutralVote} text="Neutral" />
      <Button handleClick={handleBadVote} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
