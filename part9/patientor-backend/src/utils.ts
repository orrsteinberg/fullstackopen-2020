/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NewPatient,
  Patient,
  CensoredPatient,
  Gender,
  NewEntry,
  NewBaseEntry,
  EntryType,
  Diagnosis,
  Discharge,
  SickLeave,
  HealthCheckRating,
} from "./types";

// Exports
export const censorPatient = ({
  id,
  name,
  dateOfBirth,
  gender,
  occupation,
}: Patient): CensoredPatient => {
  return { id, name, dateOfBirth, gender, occupation };
};

export const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(object.name, "name"),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseString(object.ssn, "ssn"),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation, "occupation"),
    entries: [],
  };

  return newPatient;
};

export const toNewEntry = (object: any): NewEntry => {
  // Set up base entry
  const newEntry = toNewBaseEntry(object) as NewEntry;

  // Get rest of the fields according to the appropriate entry type
  switch (newEntry.type) {
    case EntryType.Hospital:
      newEntry.discharge = parseDischarge(object.discharge);
      return newEntry;

    case EntryType.OccupationalHealthcare:
      newEntry.employerName = parseString(object.employerName, "employer name");

      if (object.sickLeave) {
        newEntry.sickLeave = parseSickLeave(object.sickLeave);
      }
      return newEntry;

    case EntryType.HealthCheck:
      newEntry.healthCheckRating = parseHealthCheckRating(
        object.healthCheckRating
      );
      return newEntry;

    default:
      return assertNever(newEntry);
  }
};

const toNewBaseEntry = (object: any): NewBaseEntry => {
  const newBaseEntry: NewBaseEntry = {
    description: parseString(object.description, "description"),
    date: parseDate(object.date),
    specialist: parseString(object.specialist, "specialist"),
    type: parseEntryType(object.type),
  };

  // Optional diagnosis codes field
  if (object.diagnosisCodes) {
    newBaseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  }

  return newBaseEntry;
};

// Exhaustive type checking
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// General helper functions
const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (text: any, field: string): string => {
  if (!text || !isString(text) || text.trim() === "") {
    throw new Error(`Invalid or missing ${field}`);
  }
  return text.trim();
};

// Patient helper functions
const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseDateOfBirth = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Invalid or missing date of birth`);
  }
  return date.trim();
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error(`Invalid or missing gender`);
  }
  return gender;
};

// Entry helper functions
const isEntryType = (type: any): type is EntryType => {
  return Object.values(EntryType).includes(type);
};

const isDate = (date: any): boolean => {
  return Boolean(Date.parse(date));
};

const isDischarge = (discharge: any): boolean => {
  return (
    discharge.date &&
    discharge.criteria &&
    isDate(discharge.date) &&
    isString(discharge.criteria)
  );
};

const isSickLeave = (sickLeave: any): boolean => {
  return (
    sickLeave.startDate &&
    sickLeave.endDate &&
    isDate(sickLeave.startDate) &&
    isDate(sickLeave.endDate)
  );
};

const isHealthCheckRating = (healthCheckRating: any): boolean => {
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Invalid or missing date of entry`);
  }
  return date.trim();
};

const parseDiagnosisCodes = (codes: any): Array<Diagnosis["code"]> => {
  if (!Array.isArray(codes) || !codes.every((code) => isString(code))) {
    throw new Error(`Invalid diagnosis codes`);
  }
  return codes as Array<Diagnosis["code"]>;
};

const parseEntryType = (type: any): EntryType => {
  if (!type || !isString(type) || !isEntryType(type)) {
    throw new Error(`Invalid or missing entry type`);
  }

  return type;
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error(`Invalid or missing discharge field`);
  }

  return discharge as Discharge;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error(`Invalid or missing sick leave field`);
  }

  return sickLeave as SickLeave;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (healthCheckRating === undefined || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(`Invalid or missing healthcheck rating field`);
  }

  return healthCheckRating as HealthCheckRating;
};
