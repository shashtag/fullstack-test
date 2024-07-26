import { Request, Response } from "express";
import { OCR } from "../Services/ocr";
import { logger } from "../config";

async function recognizeText(req: Request, res: Response) {
  try {
    const { image } = req.body;

    if (!image) {
      logger.error("Kindly upload an image to proceed.");
      return res
        .status(400)
        .json({ error: "Kindly upload an image to proceed." });
    }

    const ocr = new OCR({ image });
    const text = await ocr.readTextFromImage();

    res.json({ message: text });
  } catch (e) {
    logger.error(e.message);
    res.status(500).json({ error: e.message });
  }
}

export default { recognizeText };
