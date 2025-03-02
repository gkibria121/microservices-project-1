import express, { Request, Response } from "express";
import cors from "cors";
import { randomBytes } from "crypto";
import { PostType } from "./type/app";
const app = express();
const port = process.env.PORT || 3000;
const posts: PostType[] = [];
// Middleware
app.use(cors());
app.use(express.json());
app.post("/api/posts", (req: Request, res: Response) => {
  console.log(req.body);
  const { title } = req.body;
  if (!title) {
    res.status(422).json({
      errors: {
        title: "Missing title",
      },
    });

    return;
  }
  const post = {
    id: randomBytes(5).toString("hex"),
    title,
  };

  posts.push(post);
  res.status(201).json(post);
});
// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
