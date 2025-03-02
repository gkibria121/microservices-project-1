import { PostType } from "../../../type/app";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
import Post from "./Post";

export default function Posts({ posts }: { posts: PostType[] }) {
  return (
    <>
      <h1 className="font-semibold text-3xl mb-2"> Posts</h1>
      <div className="flex gap-8 flex-wrap">
        {posts.map((post) => (
          <Post post={post} key={post.id}>
            <>
              <CommentList comments={post.comments ?? []} />
              <CommentCreate />
            </>
          </Post>
        ))}
      </div>
      {posts.length == 0 && <div>No posts available!</div>}
    </>
  );
}
