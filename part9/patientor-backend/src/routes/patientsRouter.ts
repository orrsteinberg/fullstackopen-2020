import express from "express";
import patientsService from "../services/patientsService";
import { toNewPatient, toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getCensoredPatients());
});

router.get("/:id", (req, res) => {
  try {
    const patient = patientsService.getPatient(req.params.id);
    res.json(patient);
  } catch (error) {
    const message = (error as Error).message;
    res.status(404).send({ error: message });
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const patient = patientsService.getPatient(req.params.id);
    if (!patient) {
      throw new Error("Patient not found");
    }
    const newEntry = toNewEntry(req.body);
    const updatedPatient = patientsService.addEntry(patient, newEntry);
    res.json(updatedPatient);
  } catch (error) {
    const message = (error as Error).message;
    res.status(400).send({ error: message });
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientData = toNewPatient(req.body);
    const newPatient = patientsService.addPatient(newPatientData);
    res.json(newPatient);
  } catch (error) {
    const message = (error as Error).message;
    res.status(400).send({ error: message });
  }
});

export default router;
