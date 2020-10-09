import React from "react";

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

export default Persons;
