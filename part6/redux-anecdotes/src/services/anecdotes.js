import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const anecdoteObject = { content, votes: 0 };
  const response = await axios.post(baseUrl, anecdoteObject);
  console.log(response.data); // DEBUGGING
  return response.data;
};

export default {
  getAll,
  createNew,
};
