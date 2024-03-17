"use client";

import { UseClientProvider } from "@sparcs-clubs/web/common/providers/UseClientProvider";

import NoticePageMainFrame from "@sparcs-clubs/web/features/notice/frames/NoticePageMainFrame";

const Clubs = () => (
  <main>
    <UseClientProvider>
      <NoticePageMainFrame />
    </UseClientProvider>
  </main>
);

export default Clubs;
