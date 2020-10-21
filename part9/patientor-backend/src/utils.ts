import { NewPatient, Patient, CensoredPatient, Gender } from "./types";

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

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: any): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseString = (text: any, field: string): string => {
  if (!text || !isString(text) || text.trim() === "") {
    throw new Error(`Invalid or missing ${field}: ${text}`);
  }
  return text.trim();
};

const parseDateOfBirth = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Invalid or missing date of birth: ${date}`);
  }
  return date.trim();
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error(`Invalid or missing gender: ${gender}`);
  }
  return gender;
};
