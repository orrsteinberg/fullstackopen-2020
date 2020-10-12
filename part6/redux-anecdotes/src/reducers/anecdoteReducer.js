// Actions
export const initializeAnecdotes = (anecdotes) => ({
  type: "INIT_ANECDOTES",
  data: anecdotes,
});

export const addVote = (id) => ({
  type: "ADD_VOTE",
  data: {
    id,
  },
});

export const createAnecdote = (anecdote) => ({
  type: "NEW_ANECDOTE",
  data: anecdote,
});

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
