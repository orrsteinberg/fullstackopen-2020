import React, { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";

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

      <NewBook show={page === "add"} setError={notify} />

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
