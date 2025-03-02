import { submitComment } from "../actions/comments";
import Button from "./Button";
import Input from "./Input";

function CommentCreate() {
  return (
    <form action={submitComment}>
      <label htmlFor="comment">New Comment</label>
      <Input name="comment" />
      <Button type="submit" className="mt-2" />
    </form>
  );
}

export default CommentCreate;
