import React from "react";
import { connect } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import Filter from "./Filter";

const AnecdoteList = (props) => {
  const vote = (id) => {
    props.addVote(id);
    const content = props.anecdotes.find((a) => a.id === id).content;
    // Display message
    props.setNotification(`You voted for: ${content}`, 5);
  };

  return (
    <div>
      <Filter />
      {props.anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
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
