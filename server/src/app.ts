import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import ocrRouter from "./Routes/ocr";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 5, // limit each IP to 10 requests per windowMs
    message:
      "Oops! It seems you’re making too many requests in a short time. Please wait a moment and try again later.", // message to send
  }),
);

app.use(ocrRouter);

app.use("*", (_: express.Request, res: express.Response) =>
  res.status(404).json({ error: "Route not found" }),
);

export default app;
