import React, { useState } from "react";
import Select from "react-select";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

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

  // Generate list of genres without duplicates
  let genres = { all: true };
  books.forEach((book) => {
    book.genres.forEach((genre) => (genres[genre] = true));
  });
  genres = Object.keys(genres).map((genre) => {
    return { value: genre, label: genre };
  });

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
        options={genres}
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
