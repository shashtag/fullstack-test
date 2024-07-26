// sets database connection when required, sets up environment variables and starts the server

import app from "./app";
import { PORT, baseUrl } from "./config";

app.listen(PORT, () => console.log("Server is running on " + baseUrl));
