import { savepost } from "../services/PostService";

export const submitPost = async (formdata: FormData) => {
  const title = formdata.get("title") as string | null;
  if (!title) {
    alert("Title missing");
    return;
  }
  try {
    await savepost({ title });
  } catch (error) {
    console.log(error);
  }
};
