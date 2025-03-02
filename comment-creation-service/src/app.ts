import express, { Request, Response } from "express";
import cors from "cors";
import { randomBytes } from "crypto";
import { Comment } from "../src/type/app";
const app = express();
const port = process.env.PORT || 3000;

const comments: Comment[] = [];
// Middleware
app.use(cors());
app.use(express.json());

app.post("/api/comments", (req: Request, res: Response) => {
  const { comment, postId } = req.body;

  if (!comment) {
    res.status(422).json({
      errors: {
        comment: "Comment is required",
      },
    });
    return;
  }
  if (!postId) {
    res.status(422).json({
      errors: {
        comment: "postId is required",
      },
    });
    return;
  }
  const newComment: Comment = {
    id: randomBytes(3).toString("hex"),
    postId,
    comment,
  };
  comments.push(newComment);
  res.status(200).json(newComment);
  propagateEvent("CommentCreated", newComment);
});
// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

async function propagateEvent(type: string, data: any) {
  try {
    await fetch(`http://event-bus:3000/api/events`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        data,
      }),
    });
  } catch (e) {
    console.log(e);
  }
}
