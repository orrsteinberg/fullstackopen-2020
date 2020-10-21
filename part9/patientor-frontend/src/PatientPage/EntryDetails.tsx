import React from "react";
import { Entry } from "../types";
import { assertNever } from "../utils";
import {
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
} from "./Entries";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
