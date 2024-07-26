import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 5, // limit each IP to 10 requests per windowMs
  message:
    "Oops! It seems you’re making too many requests in a short time. Please wait a moment and try again later.", // message to send
});

app.use(cors());
app.use(limiter);
app.use(express.json());

app.use("*", (_: express.Request, res: express.Response) =>
  res.status(404).json({ error: "Route not found" }),
);

export default app;
