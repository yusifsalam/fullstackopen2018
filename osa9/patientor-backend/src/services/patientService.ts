import patientData from "../../data/patients";
import {
    PatientEntry,
    NonSensitivePatientEntry,
    NewPatientEntry,
} from "../types";
import { v4 as uuid } from "uuid";

const getEntries = (): PatientEntry[] => {
    return patientData;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
    const id: string = uuid() as string;
    const newPatientEntry = {
        id: id,
        ...entry,
    };
    patientData.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addEntry,
};
