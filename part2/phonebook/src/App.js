import React, { useState, useEffect } from "react";
import axios from "axios";

import NewPersonForm from "./components/NewPersonForm";
import FilterInput from "./components/FilterInput";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => {
        const personsFromDb = res.data;
        setPersons(personsFromDb);
      })
      .catch((error) => console.error(error));
  }, []);

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

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterInput setFilter={setFilter} />
      <h2>Add new</h2>
      <NewPersonForm addNewPerson={addNewPerson} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
