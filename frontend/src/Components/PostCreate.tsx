import Input from "./Input";
import Button from "./Button";
import { submitPost } from "../actions/post";

function PostCreate() {
  return (
    <form className="flex flex-col gap-y-2" action={submitPost}>
      <label htmlFor="post" className="mb-1 font-semibold">
        Title
      </label>
      <Input name="title" />

      <Button type="submit" />
    </form>
  );
}

export default PostCreate;
