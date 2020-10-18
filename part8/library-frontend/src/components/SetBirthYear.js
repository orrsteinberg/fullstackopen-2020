import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import Select from "react-select";

const SetBirthYear = ({ authors, setError }) => {
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => setError(error.message),
  });

  const submit = (event) => {
    event.preventDefault();

    editAuthor({
      variables: { name: selectedAuthor.value, setBornTo: born },
    });

    setSelectedAuthor(null);
    setBorn("");
  };

  const options = authors.map((a) => {
    return { value: a.name, label: a.name };
  });

  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={submit}>
        <Select
          value={selectedAuthor}
          onChange={(selectedOption) => setSelectedAuthor(selectedOption)}
          options={options}
        />
        <div>
          <input
            type="number"
            name="born"
            onChange={({ target }) => setBorn(parseInt(target.value))}
            value={born}
          />
        </div>
        <input type="submit" value="Update Author" />
      </form>
    </div>
  );
};

export default SetBirthYear;
