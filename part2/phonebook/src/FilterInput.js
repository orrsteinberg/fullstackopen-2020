import React from "react";

const FilterInput = ({ setFilter }) => (
  <input onChange={({ target }) => setFilter(target.value)} />
);

export default FilterInput;
