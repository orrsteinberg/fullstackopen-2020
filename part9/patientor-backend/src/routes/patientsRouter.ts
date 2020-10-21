import express from "express";
import patientsService from "../services/patientsService";
import { toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getCensoredPatients());
});

router.get("/:id", (req, res) => {
  try {
    const patient = patientsService.getPatient(req.params.id);
    res.json(patient);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntryData = toNewEntry(req.body);
    const newEntry = patientsService.addEntry(newEntryData);
    res.json(newEntry);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientData = toNewPatient(req.body);
    const newPatient = patientsService.addPatient(newPatientData);
    res.json(newPatient);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

export default router;
