import patientData from "../../data/patients";
import { PatientEntry, NonSensitivePatientEntry } from "../types";

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

const addEntry = (): null => {
    return null;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addEntry,
};
