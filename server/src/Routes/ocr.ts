import { Router } from "express";
import ocrController from "../Controllers/ocr";

const router = Router();

router.post("/ocr", ocrController.recognizeText);

export default router;
