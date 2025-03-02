import { PostType } from "../type/app";
import Button from "./Button";
import Input from "./Input";
import Post from "./Post";

export default function Posts({ posts }: { posts: PostType[] }) {
  return (
    <div className="">
      <h1 className="font-semibold text-3xl mb-2"> Posts</h1>
      <div className="flex gap-8 flex-wrap">
        {posts.map((post) => (
          <Post post={post}>
            <>
              <ul className="flex flex-col list-disc pl-5 text-sm mt-2 mb-2">
                <li> a seccond comment</li>
                <li>adwasdwawsdwwe</li>
              </ul>
              <div>
                <label htmlFor="comment">New Comment</label>
                <Input name="comment" />
                <Button type="submit" className="mt-2" />
              </div>
            </>
          </Post>
        ))}
      </div>
    </div>
  );
}
