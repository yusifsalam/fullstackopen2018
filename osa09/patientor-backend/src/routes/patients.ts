import express from "express";
import patientService from "../services/patientService";
import utils from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
    const patient = patientService.findById(req.params.id);
    if (patient) res.send(patient);
    else res.sendStatus(404);
});

router.post("/", (req, res) => {
    try {
        const newPatientEntry = utils.toNewPatientEntry(req.body);
        const addedEntry = patientService.addEntry(newPatientEntry);
        res.json(addedEntry);
    } catch (e) {
        if (e instanceof Error) res.status(400).send(e.message);
    }
});

router.post("/:id/entries", (req, res) => {
    try {
        const newEntry = utils.toNewEntry(req.body);
        if (newEntry) {
            const addedEntry = patientService.addEntryToPatient(
                newEntry,
                req.params.id
            );
            res.json(addedEntry);
        } else {
            throw new Error(
                "Something went really wrong when adding patient entry"
            );
        }
    } catch (e) {
        if (e instanceof Error) res.status(400).send(e.message);
    }
});

export default router;
