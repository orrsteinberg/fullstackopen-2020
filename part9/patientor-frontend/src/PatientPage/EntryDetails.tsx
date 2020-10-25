import React from "react";
import { Entry, EntryType } from "../types";
import { assertNever } from "../utils";
import {
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
} from "./Entries";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case EntryType.Hospital:
      return <HospitalEntry entry={entry} />;
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthcareEntry entry={entry} />;
    case EntryType.HealthCheck:
      return <HealthCheckEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
