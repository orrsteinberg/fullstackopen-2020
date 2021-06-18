import React from "react";
import { connect } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import Filter from "./Filter";

const AnecdoteList = ({ anecdotes, addVote, setNotification }) => {
  const vote = (id) => {
    addVote(id);
    const content = anecdotes.find((a) => a.id === id).content;
    // Display message
    setNotification(`You voted for: ${content}`, 5);
  };

  return (
    <div>
      <Filter />
      {anecdotes.map(({ id, content, votes }) => (
        <div key={id}>
          <div>{content}</div>
          <div>
            has {votes}
            <button onClick={() => vote(id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Connecting component to redux store using the connect() function

const mapStateToProps = (state) => {
  // Map anecdotes in state to a filtered and sorted anecdotes prop
  if (state.filter === "") {
    return {
      anecdotes: state.anecdotes.sort((a, b) => b.votes - a.votes),
    };
  }

  const filterAnecdotes = (anecdote) =>
    anecdote.content.toLowerCase().includes(state.filter.toLowerCase());

  return {
    anecdotes: state.anecdotes
      .filter(filterAnecdotes)
      .sort((a, b) => b.votes - a.votes),
  };
};

const mapDispatchToProps = {
  setNotification,
  addVote,
};

const connectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

export default connectedAnecdoteList;
