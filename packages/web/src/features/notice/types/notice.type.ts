// 공지에 대한 간단한 정보를 포함하는 인터페이스입니다.
// 날짜는 그대로 출력할 일밖에 없어서 그대로 문자열로 두었습니다.
// 링크는 아라처럼 아카이빙 하는 방식으로 바뀌기 전까지 임시로 넣어두었습니다.
interface NoticePagination {
  notices: Array<NoticeInfo>;
  totalNotices: number;
}

interface NoticeInfo {
  id: number;
  title: string;
  author: string;
  date: string;
  link: string;
}

// 목업 데이터를 인터페이스로 매핑해주는 임시 함수입니다.
const fromObj = (noticeObj: NoticeInfo) => {
  const notice: NoticeInfo = {
    id: noticeObj.id,
    title: noticeObj.title,
    author: noticeObj.author,
    date: noticeObj.date,
    link: noticeObj.link,
  };

  return notice;
};

export type { NoticeInfo, NoticePagination };
export { fromObj };
