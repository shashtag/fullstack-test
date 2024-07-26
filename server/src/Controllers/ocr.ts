import { Request, Response } from "express";
import { OCR } from "../Services/ocr";
import { logger } from "../config";

// Controller function to handle text recognition requests
async function recognizeText(req: Request, res: Response) {
  try {
    // Extract image data from the request body
    const { image } = req.body;

    // Initialize OCR service with the provided image
    const ocr = new OCR({ image });

    // Validate the image before processing
    await ocr.validateImage();

    // Perform OCR to extract text from the image
    const text = await ocr.readTextFromImage();

    // Send the extracted text as a JSON response
    res.json({ message: text });
  } catch (e) {
    // Log the error message
    logger.error(e.message);

    // Send an error response with status code 500
    res.status(500).json({ error: e.message });
  }
}

export default { recognizeText };
