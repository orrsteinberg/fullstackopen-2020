import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const addNew = (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    props.createAnecdote(content);

    // Display message
    props.setNotification(`Created new anecdote: ${content}`, 5);
  };

  return (
    <form onSubmit={addNew}>
      <div>
        <input name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

// Connecting component to redux store using the connect() function

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
};

const connectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default connectedAnecdoteForm;
