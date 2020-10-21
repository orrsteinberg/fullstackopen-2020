import React from "react";
import { CoursePart } from "./types";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const App: React.FC = () => {
    const courseName = "Half Stack application development";
    const courseParts: CoursePart[] = [
      {
        name: "Fundamentals",
        exerciseCount: 10,
        description: "This is an awesome course part"
      },
      {
        name: "Using props to pass data",
        exerciseCount: 7,
        groupProjectCount: 3
      },
      {
        name: "Deeper type usage",
        exerciseCount: 14,
        description: "Confusing description",
        exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
      },
      {
        name: "New course part interface",
        exerciseCount: 10,
        description: "Some description",
        groupProjectCount: 2,
        exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
      },
    ];

    return (
        <div>
            <Header name={courseName} />
            <Content parts={courseParts} />
            <Total parts={courseParts} />
        </div>
    );
};

export default App;
