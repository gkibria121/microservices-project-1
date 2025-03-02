import express, { Request, Response } from "express";
import cors from "cors";
import { randomBytes } from "crypto";
import { Comment } from "./type/app";
const app = express();
const port = process.env.PORT || 3000;

const comments: Comment[] = [];
// Middleware
app.use(cors());
app.use(express.json());

app.post("/api/comments", (req: Request, res: Response) => {
  const { comment } = req.body;

  if (!comment) {
    res.status(422).json({
      errors: {
        comment: "Comment is required",
      },
    });
    return;
  }
  const newComment: Comment = {
    id: randomBytes(3).toString("hex"),
    comment: comment,
  };
  comments.push(newComment);
  res.status(200).json(newComment);
});
// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
