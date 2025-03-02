import { saveComment } from "../services/CommentService";

export const submitComment = async (formdata: FormData) => {
  const comment = formdata.get("comment") as string | null;
  const postId = formdata.get("postId") as string | null;
  if (!comment) {
    alert("comment is  missing");
    return;
  }
  if (!postId) {
    alert("postId is  missing");
    return;
  }
  try {
    await saveComment({ comment, postId });
  } catch (e) {
    console.log(e);
  }
};
