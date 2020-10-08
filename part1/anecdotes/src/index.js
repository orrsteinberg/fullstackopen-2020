import React, { useState } from "react";
import ReactDOM from "react-dom";

const Anecdote = ({ title, anecdote, numVotes }) => (
  <>
    <h1>{title}</h1>
    <div>{anecdote}</div>
    <div>Has {numVotes} votes</div>
  </>
);

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

  const mostVoted = Object.keys(votes).sort((a, b) => votes[b] - votes[a])[0];

  const getRandomIndex = () => Math.floor(Math.random() * anecdotes.length);

  const handleNextAnecdote = () => {
    let idx = getRandomIndex();
    while (idx === selected) {
      idx = getRandomIndex();
    }
    setSelected(idx);
  };

  const addVote = () => {
    setVotes({
      ...votes,
      [selected]: votes[selected] + 1,
    });
  };

  return (
    <>
      <Anecdote
        title={"Anecdote of the day"}
        anecdote={anecdotes[selected]}
        numVotes={votes[selected]}
      />
      <button onClick={handleNextAnecdote}>Next anecdote</button>
      <button onClick={addVote}>Vote</button>
      <Anecdote
        title={"Anecdote with most votes"}
        anecdote={anecdotes[mostVoted]}
        numVotes={votes[mostVoted]}
      />
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
