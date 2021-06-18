export const updateFilter = (filterInput) => ({
  type: "UPDATE_FILTER",
  data: filterInput,
});

const filterReducer = (state = "", action) => {
  const { type, data } = action;

  switch (type) {
    case "UPDATE_FILTER":
      return data;
    default:
      return state;
  }
};

export default filterReducer;
