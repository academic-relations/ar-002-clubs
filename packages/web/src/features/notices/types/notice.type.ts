import { z } from "zod";

import apiNtc001 from "@sparcs-clubs/interface/api/notices/endpoints/apiNtc001";

// 인터페이스를 필요로 하실 경우 아래와 같이 추론하여 사용하는 것이 좋을 것 같습니다
type NoticePagination = z.infer<(typeof apiNtc001.responseBodyMap)[200]>;

// euxiliary interface of NoticePagination
// content of NoticePagination.notices
// interface NoticePagination = {
//   notices: Array<NoticeInfo>;
//   totalPosts: number;
// }
interface NoticeInfo {
  id: number;
  title: string;
  author: string;
  date: Date;
  link: string;
}

export type { NoticeInfo, NoticePagination };
