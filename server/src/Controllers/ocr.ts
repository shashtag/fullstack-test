import { Request, Response } from "express";

async function recognizeText(req: Request, res: Response) {
  try {
    res.send("dsndsnsnsn");
  } catch (e) {
    res.status(500).send(e.message);
  }
}

export default { recognizeText };
