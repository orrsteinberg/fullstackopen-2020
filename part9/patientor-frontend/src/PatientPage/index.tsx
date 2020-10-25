import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Header, Icon, Button } from "semantic-ui-react";

import { useStateValue, updatePatient } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient, NewEntry } from "../types";

import AddEntryModal from "../AddEntryModal";
import EntryDetails from "./EntryDetails";

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | undefined>(patients[id]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const genderIcon = {
    male: { name: "mars" as "mars" },
    female: { name: "venus" as "venus" },
    other: { name: "genderless" as "genderless" },
  };

  useEffect(() => {
    const fetchAndUpdatePatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patientFromApi));
        setPatient(patientFromApi);
      } catch (e) {
        console.error(e);

        if (e.response.status === 404) {
          setError(e.response.data.error);
        } else {
          setError("Oops! Something went wrong");
        }
      }
    };

    setError(null);

    if (!patient || !patient.ssn) {
      fetchAndUpdatePatient();
    }
  }, [id, patient, dispatch]);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(null);
  };

  const submitNewEntry = async (newEntry: NewEntry) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        newEntry
      );
      dispatch(updatePatient(updatedPatient));
      closeModal();
      setPatient(updatedPatient);
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  if (error) return <p>{error}</p>;

  if (!patient) return null;

  return (
    <Container>
      <Header as="h2">
        {patient.name} <Icon {...genderIcon[patient.gender]} />
      </Header>
      <p>
        <strong>ssn:</strong> {patient.ssn}
      </p>
      <p>
        <strong>occupation:</strong> {patient.occupation}
      </p>
      <Header as="h3">Entries</Header>
      {patient.entries &&
        patient.entries.map((entry) => (
          <EntryDetails entry={entry} key={entry.id} />
        ))}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New entry</Button>
    </Container>
  );
};

export default PatientPage;
