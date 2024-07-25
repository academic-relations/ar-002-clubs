"use client";

import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import ClubButton from "@sparcs-clubs/web/features/register-club/components/ClubButton";

const RegisterClub = () => (
  <FlexWrapper direction="column" gap={60}>
    <PageHead
      items={[{ name: "동아리 등록", path: "/register-club" }]}
      title="동아리 등록"
    />
    <ClubButton
      title="재등록"
      buttonText="  •  직전 학기에 정동아리 지위를 유지했던 동아리만 등록 가능"
      selected={false}
    />
    <ClubButton
      title="신규 등록"
      buttonText={`  •  2개 정규학기 이상 가등록 지위를 유지한 동아리 등록 가능  
  •  등록 취소 이후 3개 정규학기 이상 지나지 않은 단체 등록 가능`}
      selected
    />
    <ClubButton
      title="가등록"
      buttonText={`  •  새로 동아리를 만들려는 학부 총학생회 정회원 등록 가능  
  •  직전 학기에 가등록 지위를 유지한 동아리 등록 가능`}
      selected={false}
    />
  </FlexWrapper>
);

export default RegisterClub;
