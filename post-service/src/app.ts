import express, { Request, Response } from "express";
import cors from "cors";
import { randomBytes } from "crypto";
import { PostType } from "../type/app";
import axios from 'axios'
const app = express();
const port = process.env.PORT || 3000;
const posts: PostType[] = [];
// Middleware
app.use(cors());
app.use(express.json());
app.post("/api/posts/create", async (req: Request, res: Response) => {
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
  propagateEvent("PostCreated", post);
});

// Start server
app.listen(port, async() => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  const {data} = await axios.get('http://event-bus:3000/api/events');
  console.log(data)
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
