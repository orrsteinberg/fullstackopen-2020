import React from "react";
import Part from "./Part";
import { CoursePart } from "./types";

const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) => (
  <div>
    {parts.map((part: CoursePart) => {
        return <Part key={part.name} coursePart={part} />;
    })}
  </div>
);

export default Content;
