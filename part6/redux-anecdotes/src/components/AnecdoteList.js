import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import Filter from "./Filter";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    // Filter
    const filteredAnecdotes = state.anecdotes.filter((a) => {
      return a.content.toLowerCase().includes(state.filter.toLowerCase());
    });
    // Sort
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes);
  });

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(addVote(id));
    const content = anecdotes.find((a) => a.id === id).content;
    // Display message
    dispatch(setNotification(`You voted for: ${content}`, 5));
  };

  return (
    <div>
      <Filter />
      {anecdotes.map((anecdote) => (
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

export default AnecdoteList;
