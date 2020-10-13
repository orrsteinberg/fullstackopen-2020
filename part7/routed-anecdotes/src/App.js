import React, { useState } from "react";
import {
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { useField } from "./hooks";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link style={padding} to="/">
        Anecdotes
      </Link>
      <Link style={padding} to="/create">
        Create New
      </Link>
      <Link style={padding} to="/about">
        About
      </Link>
    </div>
  );
};

const AnecdoteList = ({ anecdotes, vote }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>{" "}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </li>
      ))}
    </ul>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div style={{ backgroundColor: "#eee" }}>
    Anecdote app for{" "}
    <a href="https://courses.helsinki.fi/fi/tkt21009">
      Full Stack -websovelluskehitys
    </a>
    . See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const history = useHistory();
  const [content, resetContent] = useField("text");
  const [author, resetAuthor] = useField("text");
  const [info, resetInfo] = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    history.push("/");
  };

  const resetFields = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={resetFields}>
          reset
        </button>
      </form>
    </div>
  );
};

const Anecdote = ({ anecdote, vote }) => (
  <div style={{ marginBottom: 10, padding: 5, borderBottom: "1px solid #222" }}>
    <h2>
      {anecdote.content} by {anecdote.author}
    </h2>
    <div>
      has {anecdote.votes} {anecdote.votes === 1 ? "vote" : "votes"}{" "}
      <button onClick={() => vote(anecdote.id)}>vote</button>
    </div>
    <div>
      For more information, see: <a href={anecdote.info}>{anecdote.info}</a>
    </div>
  </div>
);

const Notification = ({ notification }) => {
  if (notification === "") return null;

  const notificationStyle = {
    padding: 10,
    margin: "10px auto",
    border: "1px solid #222",
  };

  return <div style={notificationStyle}>{notification}</div>;
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2",
    },
  ]);

  const [notification, setNotification] = useState("");
  const anecdoteIdMatch = useRouteMatch("/anecdotes/:id");
  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const anecdote = anecdoteIdMatch
    ? anecdoteById(anecdoteIdMatch.params.id)
    : null;

  const notify = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 10000);
  };

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    notify(`New anecdote created: ${anecdote.content}`);
  };

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
    notify(`New vote added for ${anecdote.content}`);
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Notification notification={notification} />
      <Menu />
      <Switch>
        <Route path="/anecdotes/:id">
          {anecdote ? (
            <Anecdote anecdote={anecdote} vote={vote} />
          ) : (
            <Redirect to={"/"} />
          )}
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} vote={vote} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
