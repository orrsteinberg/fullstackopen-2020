import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import anecdoteService from "./services/anecdotes";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";
import Notification from "./components/Notification";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(initializeAnecdotes(anecdotes)));
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;
