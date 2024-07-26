import { Request, Response } from "express";
import { OCR } from "../Services/ocr";

async function recognizeText(req: Request, res: Response) {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).send("Image is required");
    }

    const ocr = new OCR({ image });
    const text = await ocr.readTextFromImage();

    res.send({ message: text });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
}

export default { recognizeText };
