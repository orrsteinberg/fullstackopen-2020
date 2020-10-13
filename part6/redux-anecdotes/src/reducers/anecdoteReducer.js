import anecdoteService from "../services/anecdotes";

// Actions
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export const addVote = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.addVote(id);
    dispatch({
      type: "ADD_VOTE",
      data: updatedAnecdote,
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data: anecdote,
    });
  };
};

// Reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_ANECDOTES":
      return action.data;

    case "NEW_ANECDOTE":
      return [...state, action.data];

    case "ADD_VOTE":
      return state.map((anecdote) =>
        anecdote.id === action.data.id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );

    default:
      return state;
  }
};

export default reducer;
