import { PostWithoutId } from "../type/app";

export async function savepost(post: PostWithoutId) {
  console.log(post);
}
export async function getPosts() {
  const respone = await fetch("http://localhost:3003/api/posts");
  if (!respone.ok) {
    throw new Error("Something went wrong! " + respone.status);
  }

  return (await respone.json()).data;
}
