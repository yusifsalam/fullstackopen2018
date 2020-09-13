import patientData from "../../data/patients";
import {
    PatientEntry,
    NonSensitivePatientEntry,
    NewPatientEntry,
    NewEntry,
    Entry,
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
    const id: string = uuid();
    const newPatientEntry = {
        id: id,
        ...entry,
    };
    patientData.push(newPatientEntry);
    return newPatientEntry;
};

const addEntryToPatient = (entry: NewEntry, patientId: string): Entry => {
    const id: string = uuid();
    const newEntry: Entry = {
        id: id,
        ...entry,
    };
    const patient = findById(patientId);
    if (patient) {
        const patientWithNewEntry: PatientEntry = {
            ...patient,
            entries: [...patient.entries, newEntry],
        };
        const index = patientData.findIndex((p) => p.id === patientId);
        patientData[index] = patientWithNewEntry;
    } else {
        throw new Error(`Patient id not found: ${patientId}`);
    }
    return newEntry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addEntry,
    findById,
    addEntryToPatient,
};
