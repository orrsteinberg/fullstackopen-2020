import React, { useState } from "react";
import Select from "react-select";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetBirthYear authors={authors} setError={props.setError} />
    </div>
  );
};

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

export default Authors;
