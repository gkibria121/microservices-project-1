import express, { Request, Response } from "express";
import { randomBytes } from "crypto";
import cors from "cors";
import { PostType } from "./type/app";
const app = express();
const port = process.env.PORT || 3000;
const posts: PostType[] = [
  {
    id: "humba1",
    title: "A second Post",
    comments: [
      {
        id: 1,
        comment: "a seccond comment",
        status: "accepted",
      },
      {
        id: 2,
        comment: "adwasdwawsdwwe",
        status: "accepted",
      },
    ],
  },
  { id: "humba", title: "A third post" },
];
// Middleware
app.use(cors());
app.use(express.json());

//routes
app.get("/api/posts", (req: Request, resp: Response) => {
  resp.status(200).json({
    data: posts,
  });
});

app.post("/api/events", (req: Request, resp: Response) => {
  const { type, data } = req.body;
  console.log(type, data);
  if (type === "PostCreated") {
    posts.push(data as PostType);
  }
  if (type === "CommentCreated") {
    const comment = data;
    const post = posts.find((e) => {
      console.log(e);
      return e.id === comment.postId;
    });
    if (!post) {
      throw new Error("no post avilable!");
    }
    post.comments = [...(post?.comments || []), comment];
  }
  if (type === "CommentUpdated") {
    const newComment = data;

    const post = posts.find((e) => {
      return e.id === newComment.postId;
    });
    if (!post) {
      throw new Error("no post avilable!");
    }

    post.comments = post.comments?.map((com) => {
      if (com.id !== data.id) return com;
      return data;
    });
  }
  resp.status(200);
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
