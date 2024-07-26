import { Router } from "express";
import ocrController from "../Controllers/ocr";

// Create a new router instance
const router = Router();

// Define a POST route for OCR text recognition
router.post("/ocr", ocrController.recognizeText);

export default router;
