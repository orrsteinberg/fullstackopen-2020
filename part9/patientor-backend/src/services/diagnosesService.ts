import { Diagnosis } from "../types";
import diagnosesData from "../../data/diagnoses";

const diagnoses: Diagnosis[] = diagnosesData;

const getAllDiagnoses = (): Diagnosis[] => {
    return diagnoses;
};

export default {
    getAllDiagnoses
};
