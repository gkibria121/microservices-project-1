import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
