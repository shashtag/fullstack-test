import { Request, Response } from "express";
import { OCR } from "../Services/ocr";

async function recognizeText(req: Request, res: Response) {
  try {
    const { image } = req.body;

    if (!image) {
      return res
        .status(400)
        .json({ message: "Kindly upload an image to proceed." });
    }

    const ocr = new OCR({ image });
    const text = await ocr.readTextFromImage();

    res.json({ message: text });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export default { recognizeText };
