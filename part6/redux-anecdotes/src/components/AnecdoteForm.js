import React from "react";
import { useDispatch } from "react-redux";
import anecdoteService from "../services/anecdotes";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  displayNotification,
  clearNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNew = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    // Post new anecdote to server
    const anecdote = await anecdoteService.createNew(content);

    // Dispatch action
    dispatch(createAnecdote(anecdote));

    // Display message
    dispatch(displayNotification(`Created new anecdote: ${anecdote.content}`));
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
