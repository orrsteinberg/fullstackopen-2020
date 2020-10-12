export const updateFilter = (filterInput) => ({
  type: "UPDATE_FILTER",
  data: filterInput,
});

const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "UPDATE_FILTER":
      return action.data;
    default:
      return state;
  }
};

export default filterReducer;
