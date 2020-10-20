import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BOOK, ALL_AUTHORS } from "../queries";

const NewBook = ({ show, setError, updateCacheWith, redirect }) => {
  const [title, setTitle] = useState("");
  const [author, setAuhtor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => setError(error.graphQLErrors[0].message),
    refetchQueries: [{ query: ALL_AUTHORS }],
    // Manually update books in cache
    update: (store, response) => {
      updateCacheWith(response.data.addBook);
    },
    onCompleted: () => redirect("books"),
  });

  const submit = (event) => {
    event.preventDefault();

    const publishedInt = parseInt(published);

    if (isNaN(publishedInt)) {
      setError("Invalid publication year");
      return;
    }

    createBook({
      variables: {
        title,
        author,
        genres,
        published: publishedInt,
      },
    });

    setTitle("");
    setPublished("");
    setAuhtor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
