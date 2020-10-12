import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const anecdoteObject = { content, votes: 0 };
  const response = await axios.post(baseUrl, anecdoteObject);
  return response.data;
};

const addVote = async (id) => {
    const { data: anecdoteToUpdate } = await axios.get(`${baseUrl}/${id}`);
    const anecdoteObject = { ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1 }
    const response = await axios.put(`${baseUrl}/${id}`, anecdoteObject);
    return response.data;
}

export default {
  getAll,
  createNew,
    addVote
};
