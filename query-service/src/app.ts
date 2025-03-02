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
      },
      {
        id: 2,
        comment: "adwasdwawsdwwe",
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

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
