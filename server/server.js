const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // This is to handle Cross-Origin Resource Sharing (CORS).
app.use(express.json()); // This is to parse JSON bodies.

// This route will handle the upload of data to the server
app.post("/upload", (req, res) => {
  // For now, just log the received data
  console.log(req.body);
  // Send back a response
  res.status(200).send("Data received");
});

// This route will handle sending data back to the client
app.get("/download", (req, res) => {
  // For now, send back a dummy response
  res.status(200).json({ data: "Sample data" });
});

const PORT = process.env.PORT || 3001; // Use the environment variable for PORT or default to 3001
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
