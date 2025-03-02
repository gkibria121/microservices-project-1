export type PostWithoutId = {
  title: string;
};

export type CommentWithoutId = {
  comment: string;
};
export type Comment = CommentWithoutId & {
  id: string | number;
};

export type PostType = {
  id: string | number;
  title: string;
  comments?: Comment[];
};
