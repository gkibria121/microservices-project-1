import { PostWithoutId } from "../../../type/app";

export async function savepost(post: PostWithoutId) {
  const response = await fetch("/api/posts/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  if (!response.ok) {
    throw new Error("something went wrong!");
  }
  return await response.json();
}
export async function getPosts() {
  const respone = await fetch("/api/posts");
  if (!respone.ok) {
    throw new Error("Something went wrong! " + respone.status);
  }

  return (await respone.json()).data;
}
