import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  displayNotification,
  clearNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNew = (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    dispatch(createAnecdote(anecdote));

    // Display message
    dispatch(displayNotification(`Created new anecdote: ${anecdote}`));
    setTimeout(() => dispatch(clearNotification()), 5000);
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

export default AnecdoteForm;
