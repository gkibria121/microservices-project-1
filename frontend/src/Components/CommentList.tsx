import { Comment } from "../../../type/app";

export default function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <ul className="flex flex-col list-disc pl-5 text-sm mt-2 mb-2">
      {comments.map((comment: Comment) => (
        <li key={comment.id}>
          {comment.status === "accepted" && comment.comment}
          {comment.status === "pending" && "pending"}
          {comment.status === "rejected" && "Comment rejected"}
        </li>
      ))}
    </ul>
  );
}
