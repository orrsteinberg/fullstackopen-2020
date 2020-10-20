import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import SetBirthYear from "./SetBirthYear"

const Authors = (props) => {
  const [authors, setAuthors] = useState([]);
  const { loading, error, data } = useQuery(ALL_AUTHORS);

  useEffect(() => {
    if (data) {
      setAuthors(data.allAuthors);
    }
  }, [setAuthors, data]);

  // Return appropriate render
  if (!props.show) return null;

  if (loading) return <div>Loading...</div>;

  if (error) {
    console.error(error);
    return <div>Oops! Something went wrong</div>;
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Born</th>
            <th>Books</th>
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

export default Authors;
