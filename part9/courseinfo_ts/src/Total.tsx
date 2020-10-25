import React from "react";
import { CoursePart } from "./types";

const Total: React.FC<{ parts: CoursePart[] }> = ({ parts }) => (
    <div style={{padding: "1rem", borderTop: "solid 3px #222" }}>
        <b>
            Total number of exercises:{" "}
            {parts.reduce(
              (carry: number, part: CoursePart) => carry + part.exerciseCount,
              0
            )}
        </b>
  </div>
);

export default Total;
