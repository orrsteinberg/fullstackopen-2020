import React, { useState } from "react";
import CountryInfo from "./CountryInfo";

const Country = ({ country }) => {
  const [show, setShow] = useState(false);

  const handleButtonClick = () => setShow(!show);

  if (show) {
    return (
      <div>
        {country.name}{" "}
        <button onClick={handleButtonClick}>{show ? "Hide" : "Show"}</button>
        <CountryInfo country={country} />
      </div>
    );
  }

  return (
    <div>
      {country.name}{" "}
      <button onClick={handleButtonClick}>{show ? "Hide" : "Show"}</button>
    </div>
  );
};

export default Country;
