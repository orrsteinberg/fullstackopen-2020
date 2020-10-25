import React from "react";
import { Segment, Header, Icon, Divider } from "semantic-ui-react";
import {
  HospitalEntry as Hospital,
  OccupationalHealthcareEntry as OccupationalHealthcare,
  HealthCheckEntry as HealthCheck,
} from "../types";

import DiagnosisList from "./DiagnosisList";
import HealthRatingBar from "../components/HealthRatingBar";

export const HospitalEntry: React.FC<{ entry: Hospital }> = ({ entry }) => {
  return (
    <Segment>
      <Header as="h3">
        {entry.date} <Icon name="hospital" />
      </Header>
      <p>
        <strong>Specialist: </strong>
        {entry.specialist}
      </p>
      <Divider />
      <p>{entry.description}</p>
      {entry.diagnosisCodes && (
        <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
      )}
      <p>
        <strong>Discharge: </strong>
        {entry.discharge.date} {entry.discharge.criteria}
      </p>
    </Segment>
  );
};

export const OccupationalHealthcareEntry: React.FC<{
  entry: OccupationalHealthcare;
}> = ({ entry }) => {
  return (
    <Segment>
      <Header as="h3">
        {entry.date} <Icon name="stethoscope" /> {entry.employerName}
      </Header>
      <Divider />
      <p>
        <strong>Specialist: </strong>
        {entry.specialist}
      </p>
      <p>{entry.description}</p>
      {entry.diagnosisCodes && (
        <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
      )}
      {entry.sickLeave && (
        <p>
          <strong>Sick Leave: </strong>
          from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
        </p>
      )}
    </Segment>
  );
};

export const HealthCheckEntry: React.FC<{ entry: HealthCheck }> = ({
  entry,
}) => {
  return (
    <Segment>
      <Header as="h3">
        {entry.date} <Icon name="doctor" />
      </Header>
      <p>
        <strong>Specialist: </strong>
        {entry.specialist}
      </p>
      <Divider />
      <p>{entry.description}</p>
      {entry.diagnosisCodes && (
        <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
      )}
      <HealthRatingBar rating={entry.healthCheckRating} showText={true} />
    </Segment>
  );
};
