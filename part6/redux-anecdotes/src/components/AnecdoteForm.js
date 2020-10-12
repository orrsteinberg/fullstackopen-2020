import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNew = async (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    dispatch(createAnecdote(content));

    // Display message
    dispatch(setNotification(`Created new anecdote: ${content}`, 5));
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
