import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

const Recommend = (props) => {
  const [books, setBooks] = useState([]);
  const [getAllBooks, allBooks] = useLazyQuery(ALL_BOOKS);
  const user = useQuery(ME);

  useEffect(() => {
    if (user.data && user.data.me) {
      getAllBooks();
    }
  }, [user.data, getAllBooks]);

  useEffect(() => {
    if (allBooks.data) {
      setBooks(allBooks.data.allBooks);
    }
  }, [allBooks.data, setBooks]);

  // Return appropriate render
  if (!props.show) return null;

  if (books.loading) return <div>Loading...</div>;

  if (user.error || books.error) {
    return <div>Oops! Something went wrong</div>;
  }

  const recommendedBooks = books.filter((b) =>
    b.genres.includes(user.data.me.favoriteGenre)
  );

  return (
    <div>
      <h2>Recommended books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {recommendedBooks.map((a) => (
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

export default Recommend;
