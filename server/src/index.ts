import app from "./app";
import { PORT, baseUrl } from "./config";

// Start the server and listen on the specified port
// Log a message to the console when the server is running
app.listen(PORT, () => console.log("Server is running on " + baseUrl));
