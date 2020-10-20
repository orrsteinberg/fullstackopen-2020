import React, { useState, useEffect } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";

import Notification from "./components/Notification";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Recommend from "./components/Recommend";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("library-user-token");
    if (loggedInUser) {
      setToken(loggedInUser);
    }
  }, [setToken]);

  const notify = (message) => {
    setErrorMessage(message);

    if (window.notificationTimeout) {
      window.clearTimeout(window.notificationTimeout);
    }

    window.notificationTimeout = setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("login");
  };

  // Listen for new books and update cache when subscription data arrives
  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((b) => b.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });

    // Check that added book is not included in the current store
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      notify(`${addedBook.title} added`);
      updateCacheWith(addedBook);
    },
  });

  return (
    <div>
      <Notification errorMessage={errorMessage} />

      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <div style={{ display: "inline-block" }}>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </div>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} setError={notify} />

      <Books show={page === "books"} />

      <NewBook
        show={page === "add"}
        setError={notify}
        updateCacheWith={updateCacheWith}
        redirect={setPage}
      />

      <Recommend show={page === "recommend"} />

      <LoginForm
        show={page === "login"}
        setError={notify}
        setToken={setToken}
        redirect={setPage}
        isLoggedIn={token}
      />
    </div>
  );
};

export default App;
