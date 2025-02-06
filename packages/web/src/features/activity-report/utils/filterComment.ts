import { Comment } from "../types/activityReport";

const filterActivityComments = (comments: Comment[]): Comment[] =>
  comments.filter(comment => comment.content !== "활동이 승인되었습니다");

export { filterActivityComments };
