"use client";

import MainPageMainFrame from "../features/landing/frames/MainPageMainFrame";
import mockupNoticePagination from "../features/notice/types/mockupNoticeList";

const Home = () => (
  <MainPageMainFrame
    noticeList={mockupNoticePagination.notices
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 6)}
  />
);
export default Home;
