import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import Select from "react-select";

const Books = (props) => {
  const [books, setBooks] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [genre, setGenre] = useState("all");
  const [getBooks, { loading, error, data }] = useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    if (genre === "all") {
      getBooks();
    } else {
      getBooks({ variables: { genre } });
    }
  }, [getBooks, genre]);

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks);
    }
  }, [setBooks, data]);

  // Return appropriate render
  if (!props.show) return null;

  if (loading) return <div>Loading...</div>;

  if (error) {
    console.error(error);
    return <div>Oops! Something went wrong</div>;
  }

  // If there is no genre list yet (meaning it's the first render with all books), create it
  if (books && genreList.length === 0) {
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
    const genreOptions = uniqueListOfGenres.map((g) => ({
      value: g,
      label: g,
    }));

    setGenreList(genreOptions);
  }

  return (
    <div>
      <h2>Books</h2>

      <h4>filter by genre:</h4>
      <Select
        value={genre}
        options={genreList}
        onChange={(selectedOption) => {
          setGenre(selectedOption.value);
        }}
      />

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((a) => (
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
