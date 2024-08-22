"use client";

import ErrorPageTemplate from "@sparcs-clubs/web/common/frames/ErrorPageTemplate";

import type { NextPage } from "next";

const LoginRequired: NextPage = () => (
  // ToDo : 버튼 onClick 연결
  <ErrorPageTemplate
    message="현재 접근한 페이지는\r\n로그인해야 볼 수 있습니다"
    buttons={[{ text: "로그인 바로가기", onClick: () => {} }]}
  />
);

export default LoginRequired;
