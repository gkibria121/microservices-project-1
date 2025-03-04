import express, { Request, Response } from "express";
import cors from "cors";
import { randomBytes } from "crypto";
import { Comment, PostType } from "../type/app";
const app = express();
const port = process.env.PORT || 3000;
const posts: PostType[] = [];
const flags = ["orange"];
// Middleware
app.use(cors());
app.use(express.json());
app.post("/api/events", async (req: Request, res: Response) => {
  const event = req.body;
  if (event.type === "CommentCreated") {
    const comment = event.data as Comment;
    const updatedComment: Comment = {
      ...event.data,
      status: flags.reduce(
        (acc, flag) => (comment.comment.includes(flag) ? "rejected" : "accepted"),
        ""
      ),
    };
    propagateEvent("CommentModerated", updatedComment);
  }
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
