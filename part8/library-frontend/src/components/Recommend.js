import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

const Recommend = ({ show }) => {
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  const user = useQuery(ME);
  const [getBooks, books] = useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    if (user.data && user.data.me) {
      getBooks({
        variables: { genre: user.data.me.favoriteGenre },
      });
    }
  }, [user.data, getBooks]);

  if (!show) {
    return null;
  }

  if (books.loading) {
    return <div>Loading...</div>;
  }

  if (books.data && books.data.allBooks && recommendedBooks.length === 0) {
    setRecommendedBooks(books.data.allBooks);
  }

  return (
    <div>
      <h2>recommended books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
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
