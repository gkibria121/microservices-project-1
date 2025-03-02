import { saveComment } from "../services/CommentService";

export const submitComment = async (formdata: FormData) => {
  const comment = formdata.get("comment") as string | null;
  if (!comment) {
    alert("comment is  missing");
    return;
  }

  await saveComment({ comment });
};
