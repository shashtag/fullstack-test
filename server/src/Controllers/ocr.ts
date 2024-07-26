import { Request, Response } from "express";
import { OCR } from "../Services/ocr";
import { error } from "console";

async function recognizeText(req: Request, res: Response) {
  try {
    const { image } = req.body;

    console.log(image.split(";base64,").pop());
    if (!image) {
      return res
        .status(400)
        .json({ error: "Kindly upload an image to proceed." });
    }

    const ocr = new OCR({ image });
    const text = await ocr.readTextFromImage();

    res.json({ message: text });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export default { recognizeText };
