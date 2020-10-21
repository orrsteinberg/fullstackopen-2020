import { v4 as uuid } from "uuid";
import patientsData from "../../data/patients";
import { NewPatient, Patient, CensoredPatient, Entry } from "../types";
import { censorPatient } from "../utils";

const patients: Patient[] = patientsData;

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

  if (patient) {
    return patient;
  }

  throw new Error("Patient not found");
};

export default {
  getPatients,
  getCensoredPatients,
  addPatient,
  getPatient,
};
