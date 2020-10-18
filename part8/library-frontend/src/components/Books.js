import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import Select from "react-select";

const Books = (props) => {
  const [filterByGenre, setFilterByGenre] = useState("all");
  const result = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const books = result.data.allBooks;

  // Generate list of genres without duplicates, beginning with 'all'
  const uniqueListOfGenres = ["all"].concat(
    Array.from(
      new Set(
        books.reduce((arr, book) => {
          return arr.concat(book.genres);
        }, [])
      )
    )
  );
  // Create an array of genre object for the select filter component
  const genreOptions = uniqueListOfGenres.map((g) => ({ value: g, label: g }));

  // Apply filter
  const booksToShow =
    filterByGenre === "all"
      ? books
      : books.filter((book) => book.genres.includes(filterByGenre));

  return (
    <div>
      <h2>books</h2>

      <h4>filter by genre:</h4>
      <Select
        value={filterByGenre}
        options={genreOptions}
        onChange={(selectedOption) => {
          setFilterByGenre(selectedOption.value);
        }}
      />

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
