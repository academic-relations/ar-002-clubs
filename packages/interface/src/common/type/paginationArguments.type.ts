import { z } from "zod";

/**
 * 페이지네이션이 많이짐에 따라,
 * query arguments를 통일하기 위해 만든
 * 페이지네이션 인자 zod 객체입니다
 */

const zPaginationArguments = z.object({
  pageOffset: z.coerce.number().int().min(1),
  itemCount: z.coerce.number().int().min(1),
});

export { zPaginationArguments };
