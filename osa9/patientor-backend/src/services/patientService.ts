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

const findById = (id: string): PatientEntry | undefined => {
    const entry = patientData.find((p) => p.id === id);
    return entry;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patientData.map(
        ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
            entries,
        })
    );
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
    findById,
};
