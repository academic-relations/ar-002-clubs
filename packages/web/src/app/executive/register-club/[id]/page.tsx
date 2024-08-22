"use client";

import Link from "next/link";

import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import ClubRegisterApproveFrame from "@sparcs-clubs/web/features/executive/register-club/frames/ClubRegisterApproveFrame";
import ClubRegisterDetailFrame from "@sparcs-clubs/web/features/executive/register-club/frames/ClubRegisterDetailFrame";
import { mockClubRegisterDetial } from "@sparcs-clubs/web/features/executive/register-club/services/_mock/mockClubRegisterDetail";

const RegisterClubDetail: React.FC = () => (
  <FlexWrapper gap={40} direction="column">
    <PageHead
      items={[
        { name: "집행부원 대시보드", path: "/executive" },
        { name: "동아리 등록 신청 내역", path: "/executive/register-club" },
      ]}
      title="동아리 등록 신청 내역"
      enableLast
    />
    <ClubRegisterDetailFrame {...mockClubRegisterDetial} />
    <ClubRegisterApproveFrame
      canApprove
      rejectReasonList={[
        {
          date: new Date(2024, 5, 25, 9, 16),
          reason:
            "대충 어떤 기이이이이ㅣ이이이ㅣ이이이ㅣ이이ㅣ이이ㅣㅣㅣ이이이ㅣ이이ㅣ이이ㅣ이이ㅣ이이ㅣ이이ㅣ이이이이ㅣ이이이이이이ㅣ이이이이이이이이이ㅣ이이이ㅣ이이이ㅣ이이이이ㅣ이이ㅣ이인 반려 사유",
        },
        {
          date: new Date(2024, 5, 25, 8, 16),
          reason: "대충 어떤 반려 사유",
        },
      ]}
    />
    <Link href="/executive/register-club">
      <Button>목록으로 돌아가기</Button>
    </Link>
  </FlexWrapper>
);

export default RegisterClubDetail;
