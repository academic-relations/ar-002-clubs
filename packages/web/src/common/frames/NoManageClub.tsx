"use client";

import ErrorPageTemplate from "@sparcs-clubs/web/common/frames/ErrorPageTemplate";

import type { NextPage } from "next";

const NoManageClub: NextPage = () => (
  // ToDo : 버튼 onClick 연결
  <ErrorPageTemplate
    message="이번 학기에 대표자 / 대의원으로\r\n관리하는 동아리가 없습니다"
    buttons={[
      { text: "메인 바로가기", onClick: () => {} },
      { text: "나의 동아리 바로가기", onClick: () => {} },
    ]}
  />
);

export default NoManageClub;
