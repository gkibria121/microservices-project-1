import { PropsWithChildren } from "react";
import { PostType } from "../type/app";

function Post({
  children,
  post,
}: PropsWithChildren & {
  post: PostType;
}) {
  return (
    <div className="border border-slate-300 p-4 rounded-sm w-60">
      <h1 className="font-bold">{post.title}</h1>
      {children}
    </div>
  );
}

export default Post;
