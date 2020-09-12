/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
    NewPatientEntry,
    Gender,
    EntryType,
    Entry,
    NewHospitalEntry,
    Discharge,
    NewHealthCheckEntry,
    NewOccupationalEntry,
    HealthCheckRating,
    NewEntry,
    DiagnoseEntry,
} from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatientEntry = (object: any): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: parseEntries(object.entries),
    };

    return newEntry;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewHospitalEntry = (object: any): NewHospitalEntry => {
    const newEntry: NewHospitalEntry = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        type: parseHospitalType(object.type),
        specialist: parseSpecialist(object.specialist),
        discharge: parseDischarge(object.discharge),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    };

    return newEntry;
};

const toNewHealthCheckEntry = (object: any): NewHealthCheckEntry => {
    const newEntry: NewHealthCheckEntry = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        type: parseHealthCheckType(object.type),
        specialist: parseSpecialist(object.specialist),
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    };

    return newEntry;
};

const toNewOccupationalEntry = (object: any): NewOccupationalEntry => {
    const newEntry: NewOccupationalEntry = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        type: parseOccupationalType(object.type),
        specialist: parseSpecialist(object.specialist),
        employerName: parseEmployerName(object.employerName),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    };

    return newEntry;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewEntry = (object: any): NewEntry | undefined => {
    switch (object.type) {
        case EntryType.Hospital:
            return toNewHospitalEntry(object);
        case EntryType.HealthCheck:
            return toNewHealthCheckEntry(object);
        case EntryType.OccupationalHealthcare:
            return toNewOccupationalEntry(object);
        default:
            return undefined;
    }
};

const isString = (text: any): text is string => {
    return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const isEntryType = (param: any): param is EntryType => {
    return Object.values(EntryType).includes(param);
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing name: ${name as string}`);
    }

    return name;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing date: ${date as string}`);
    }
    return date;
};

const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`Incorrect or missing SSN: ${ssn as string}`);
    }
    return ssn;
};

const parseGender = (gender: any): string => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender as string}`);
    }
    return gender;
};

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error(
            `Incorrect or missing occupation: ${occupation as string}`
        );
    }
    return occupation;
};

const parseEntries = (entries: [any]): Entry[] => {
    if (!entries)
        throw new Error(
            `Incorrect or missing entries haha: ${entries as string}`
        );
    else {
        const invalidEntries = entries.filter((e) => !isEntryType(e.type));
        if (invalidEntries.length !== 0) {
            throw new Error(
                `Incorrect or missing entries: ${entries.toString()}`
            );
        }
    }

    return entries;
};

const parseDescription = (description: any): string => {
    if (!description || !isString(description)) {
        throw new Error(
            `Incorrect or missing description: ${description as string}`
        );
    }
    return description;
};

const parseSpecialist = (specialist: any): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error(
            `Incorrect or missing specialist: ${specialist as string}`
        );
    }
    return specialist;
};

const parseHospitalType = (type: any): EntryType.Hospital => {
    if (!type || !isEntryType(type) || type !== EntryType.Hospital) {
        throw new Error(`Incorrect or missing entry type: ${type as string}`);
    }
    return type;
};

const parseHealthCheckType = (type: any): EntryType.HealthCheck => {
    if (!type || !isEntryType(type) || type !== EntryType.HealthCheck) {
        throw new Error(`Incorrect or missing entry type: ${type as string}`);
    }
    return type;
};

const parseOccupationalType = (type: any): EntryType.OccupationalHealthcare => {
    if (
        !type ||
        !isEntryType(type) ||
        type !== EntryType.OccupationalHealthcare
    ) {
        throw new Error(`Incorrect or missing entry type: ${type as string}`);
    }
    return type;
};

const isDischarge = (discharge: any): discharge is Discharge => {
    if (
        discharge.date &&
        isDate(discharge.date) &&
        discharge.criteria &&
        isString(discharge.criteria)
    )
        return true;
    return false;
};

const parseDischarge = (discharge: any): Discharge => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error(
            `Incorrect or missing discharge: ${discharge as string}`
        );
    }
    return discharge;
};

const parseEmployerName = (employerName: any): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error(
            `Incorrect or missing employer name: ${employerName as string}`
        );
    }
    return employerName;
};

const isHealthCheckRating = (
    healthCheckRating: any
): healthCheckRating is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
        throw new Error(
            `Incorrect or missing healthcheck rating: ${
                healthCheckRating as string
            }`
        );
    }

    return healthCheckRating;
};

const parseDiagnosisCodes = (codes: [any]): Array<DiagnoseEntry["code"]> => {
    if (!codes) return [];
    else {
        const invalidCodes = codes.filter((c) => !isString(c));
        if (invalidCodes.length !== 0) {
            throw new Error(
                `Incorrect or missing entries: ${codes.toString()}`
            );
        }
    }
    return codes;
};

export default { toNewPatientEntry, toNewEntry };
