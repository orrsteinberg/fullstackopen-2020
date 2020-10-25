import React from "react";
import { List } from "semantic-ui-react";
import { useStateValue } from "../state";
import { Diagnosis } from "../types";

const DiagnosisList: React.FC<{
  diagnosisCodes: Array<Diagnosis["code"]>;
}> = ({ diagnosisCodes }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <List>
      {diagnosisCodes.map((code) => (
        <List.Item
          key={code}
          icon="circle outline"
          content={diagnoses[code] && diagnoses[code].name}
        />
      ))}
    </List>
  );
};

export default DiagnosisList;
