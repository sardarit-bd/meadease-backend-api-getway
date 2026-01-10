import express from "express";
import proxyController from "../controller/proxyController.js";
import { checkAuth } from '../middlewares/checkAuth.js';
const router = express.Router();

router.post("/ocr", checkAuth('patient', 'doctor'), proxyController.patient);

// -------------------- -------------------------------------Prescription Routs -----------------------------------------
// Get all prescriptions
router.get('/prescriptions', checkAuth('patient', 'doctor'), proxyController.patient);

// Get single prescription with medicines
router.get('/prescription/:id', checkAuth('patient', 'doctor'), proxyController.patient);

// Create new prescription
router.post('/prescription', checkAuth('patient', 'doctor'), proxyController.patient);

// Add medicine to prescription
router.post('/prescription/:id/medicines', checkAuth('patient', 'doctor'), proxyController.patient);

// Get expiring prescriptions
router.get('/prescription/expiring/soon', checkAuth('patient', 'doctor'), proxyController.patient);

// ---------------------------------------------------------------Medecines Routes -------------------------------------------------------

router.get('/medecines', checkAuth('patient', 'doctor'), proxyController.patient);


// --------------------------------------------------- Stock Routes ----------------------------------------------

// Get all stock items with medicine and prescription info
router.get('/stock/', checkAuth('patient', 'doctor'), proxyController.patient);

// Add stock for a medicine
router.post('/stock/', checkAuth('patient', 'doctor'), proxyController.patient);

// Get medicines for dropdown (active medicines without stock)
router.get('/stock/medicines-for-dropdown', checkAuth('patient', 'doctor'), proxyController.patient);

// Update stock quantity
router.put('/stock/:id/quantity', checkAuth('patient', 'doctor'), proxyController.patient);

// Deduct from stock (when dose taken)
router.post('/stock/:id/deduct', checkAuth('patient', 'doctor'), proxyController.patient);

// Get low stock medicines
router.get('/stock/low-stock', checkAuth('patient', 'doctor'), proxyController.patient);



// ---------------------------------------------------------------------- Doses Routes ----------------------------------------------
router.get('/doses', checkAuth('patient', 'doctor'), proxyController.patient);
router.post('/doses/:id/take', checkAuth('patient', 'doctor'), proxyController.patient);

// Get doses by prescription
router.get('/prescription/:prescriptionId/doses', proxyController.patient);
// Get adherence stats by prescription
router.get('/stats/prescription/:prescriptionId', proxyController.patient)

router.get('/dashboard/summary', checkAuth('patient', 'doctor'), proxyController.patient);

export default router;
