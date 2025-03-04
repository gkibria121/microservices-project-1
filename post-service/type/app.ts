export type PostWithoutId = {
  title: string;
};

export type CommentWithoutId = {
  comment: string;
};
export type Comment = CommentWithoutId & {
  id: string | number;
  status: "pending" | "accepted" | "rejected";
};

export type PostType = {
  id: string | number;
  title: string;
  comments?: Comment[];
};
