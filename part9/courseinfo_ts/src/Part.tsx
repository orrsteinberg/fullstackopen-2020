import React from "react";
import { CoursePart } from "./types";
import { assertNever } from "./utils";

const Part: React.FC<{ coursePart: CoursePart }> = ({ coursePart }) => {
    switch (coursePart.name) {
        case ("Fundamentals"):
           return (
               <div style={{background: "#f1f1f1", padding: "1rem"}}>
                    <p>Name: {coursePart.name}</p>
                    <p>Exercise Count: {coursePart.exerciseCount}</p>
                    <p>Description: {coursePart.description}</p>
                </div>
           )

        case ("Using props to pass data"):
           return (
               <div style={{background: "#fcfcfc", padding: "1rem"}}>
                    <p>Name: {coursePart.name}</p>
                    <p>Exercise Count: {coursePart.exerciseCount}</p>
                    <p>Group Project Count: {coursePart.groupProjectCount}</p>
                </div>
           )

        case ("Deeper type usage"):
           return (
               <div style={{background: "#f1f1f1", padding: "1rem"}}>
                    <p>Name: {coursePart.name}</p>
                    <p>Exercise Count: {coursePart.exerciseCount}</p>
                    <p>Description: {coursePart.description}</p>
                    <p>Exercise Submission Link: {coursePart.exerciseSubmissionLink}</p>
                </div>
           )

        case ("New course part interface"):
           return (
               <div style={{background: "#fcfcfc", padding: "1rem"}}>
                    <p>Name: {coursePart.name}</p>
                    <p>Exercise Count: {coursePart.exerciseCount}</p>
                    <p>Description: {coursePart.description}</p>
                    <p>Group Project Count: {coursePart.groupProjectCount}</p>
                    <p>Exercise Submission Link: {coursePart.exerciseSubmissionLink}</p>
                </div>
           )

       default:
           return assertNever(coursePart);
    }

}

export default Part;
