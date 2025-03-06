import { CommentWithoutId } from "../../../type/app";

export async function saveComment(comment: CommentWithoutId) {
  const respone = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(comment),
  });

  if (!respone.ok) {
    throw new Error("something went wrong!");
  }
  return await respone.json();
}
