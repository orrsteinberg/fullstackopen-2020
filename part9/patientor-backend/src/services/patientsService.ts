import { v4 as uuid } from "uuid";
import patientsData from "../../data/patients";
import { NewPatient, Patient, CensoredPatient, NewEntry } from "../types";
import { censorPatient } from "../utils";

let patients: Patient[] = patientsData;

const getCensoredPatients = (): CensoredPatient[] => {
  return patients.map((patient) => censorPatient(patient));
};

const addPatient = (patient: NewPatient): CensoredPatient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);
  return censorPatient(newPatient);
};

const getPatients = (): Patient[] => {
  return patients;
};

const getPatient = (id: string): Patient => {
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    throw new Error("Patient not found");
  }

  return patient;
};

const addEntry = (patient: Patient, newEntry: NewEntry): Patient => {
  const entry = { ...newEntry, id: uuid() };
  const updatedPatient = {
    ...patient,
    entries: patient.entries?.concat(entry),
  };
  patients = patients.map((p) => {
    if (p.id === updatedPatient.id) {
      return updatedPatient;
    }
    return p;
  });

  return updatedPatient;
};

export default {
  getPatients,
  getCensoredPatients,
  getPatient,
  addPatient,
  addEntry,
};
