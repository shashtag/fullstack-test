import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import ocrRouter from "./Routes/ocr";

const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Secure the app by setting various HTTP headers
app.use(helmet());

// Parse incoming JSON requests with a size limit of 50MB
app.use(express.json({ limit: "50mb" }));

// Apply rate limiting to all requests
app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute window
    max: 4, // limit each IP to 10 requests per windowMs
    message: {
      message:
        "Oops! It seems you’re making too many requests in a short time. Please wait a moment and try again later.",
    }, // message to send when rate limit is exceeded
  }),
);

// Use the OCR router for handling OCR-related routes
app.use(ocrRouter);

// Handle undefined routes with a 404 error
app.use("*", (_: express.Request, res: express.Response) =>
  res.status(404).json({ error: "Route not found" }),
);

export default app;
