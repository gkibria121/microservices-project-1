import PostCreate from "./Components/PostCreate";
import Posts from "./Components/Posts";
import { PostType } from "./type/app";

const posts: PostType[] = [
  { id: "humba", title: "A second Post" },
  { id: "humba", title: "A third post" },
];
function App() {
  return (
    <div className="mx-10 mt-4">
      <div className="border-b pb-4 border-slate-300  mb-2">
        <h1 className="text-3xl mb-1 font-semibold">Create Post</h1>
        <PostCreate />
      </div>
      <Posts posts={posts} />
    </div>
  );
}

export default App;
