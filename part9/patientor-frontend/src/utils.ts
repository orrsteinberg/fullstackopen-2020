import { NewEntry, NewBaseEntry, EntryFormValues, EntryType } from "./types";

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isDate = (date: any): boolean => {
  return Boolean(Date.parse(date));
};

export const isValidDate = (date: any): boolean => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  return isDate(date) && date.match(regEx);
};

export const toNewEntry = (entryFormValues: EntryFormValues): NewEntry => {
  const {
    type,
    description,
    date,
    specialist,
    diagnosisCodes,
  } = entryFormValues;
  const newBaseEntry: NewBaseEntry = {
    description,
    date,
    specialist,
    diagnosisCodes,
  };

  switch (type) {
    case EntryType.HealthCheck:
      return {
        ...newBaseEntry,
        type,
        healthCheckRating: entryFormValues.healthCheckRating,
      };

    case EntryType.OccupationalHealthcare:
      return {
        ...newBaseEntry,
        type,
        employerName: entryFormValues.employerName,
        sickLeave: {
          startDate: entryFormValues.sickLeaveStartDate,
          endDate: entryFormValues.sickLeaveEndDate,
        },
      };

    case EntryType.Hospital:
      return {
        ...newBaseEntry,
        type,
        discharge: {
          date: entryFormValues.dischargeDate,
          criteria: entryFormValues.dischargeCriteria,
        },
      };

    default:
      return assertNever(type);
  }
};
