import express, { Request, Response } from "express";
import cors from "cors";
import { randomBytes } from "crypto";
const app = express();
const port = process.env.PORT || 3000;
const posts = [];
// Middleware
app.use(cors());
app.use(express.json());
app.post("/api/posts", (req: Request, resp: Response) => {
  const title = req.body.title;
  if (!title) {
    resp.status(301).json({
      errors: {
        title: "Missing title",
      },
    });
    process.exit();
  }
  const post = {
    id: randomBytes(5).toString("hex"),
    title,
  };
  resp.status(201).json(post);
});
// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
