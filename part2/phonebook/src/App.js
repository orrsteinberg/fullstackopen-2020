import React, { useState } from "react";

const NewPersonForm = ({ addNewPerson }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newName.trim() === "") return;
    addNewPerson({ name: newName, number: newNumber });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={({ target }) => setNewName(target.value)}
        />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={({ target }) => setNewNumber(target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const FilterInput = ({ setFilter }) => (
  <input onChange={({ target }) => setFilter(target.value)} />
);

const Persons = ({ persons, isMatchingFilter }) => (
  <div>
    {persons.map(
      (person) =>
        isMatchingFilter(person) && (
          <div key={person.name}>
            {person.name}: {person.number}
          </div>
        )
    )}
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [filter, setFilter] = useState("");

  const addNewPerson = (newPerson) => {
    const namesMatch = (person1, person2) =>
      person1.toLowerCase() === person2.toLowerCase();

    if (persons.find((person) => namesMatch(person.name, newPerson.name))) {
      alert(`${newPerson.name} is already added to the phonebook`);
      return;
    }

    setPersons([
      ...persons,
      { name: newPerson.name, number: newPerson.number },
    ]);
  };

  const isMatchingFilter = (person) =>
    person.name.toLowerCase().includes(filter.toLowerCase());

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterInput setFilter={setFilter} />
      <h2>Add new</h2>
      <NewPersonForm addNewPerson={addNewPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} isMatchingFilter={isMatchingFilter} />
    </div>
  );
};

export default App;
