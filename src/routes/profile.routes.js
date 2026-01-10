import express from "express";
import proxyController from "../controller/proxyController.js";

const router = express.Router();

router.get("/", proxyController.profile);
router.put("/", proxyController.profile);

export default router;
