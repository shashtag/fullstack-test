// sets database connection when required, sets up environment variables and starts the server

import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
