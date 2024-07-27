"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Info from "@sparcs-clubs/web/common/components/Info";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import ClubButton from "@sparcs-clubs/web/features/register-club/components/ClubButton";

const ClubButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const RegisterClub = () => {
  enum RegistrationType {
    renewalRegistration = "renewalRegistration",
    promotionalRegistration = "promotionalRegistration",
    provisionalRegistration = "provisionalRegistration",
  }

  const [selectedType, setSelectedType] = useState<RegistrationType | null>(
    null,
  );

  const router = useRouter();
  const onClick = () => {
    if (selectedType === RegistrationType.renewalRegistration)
      router.push(`register-club/renewal`);
    else if (selectedType === RegistrationType.promotionalRegistration)
      router.push(`register-club/promotional`);
    else if (selectedType === RegistrationType.provisionalRegistration)
      router.push(`register-club/provisional`);
  };

  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[{ name: "동아리 등록", path: "/register-club" }]}
        title="동아리 등록"
      />
      <Info
        text="현재는 2024년 봄학기 동아리 등록 기간입니다 (신청 마감 : 2024년 3월 10일 23:59)"
        style={{ textAlign: "center" }}
      />
      <ClubButtonWrapper>
        <ClubButton
          title="재등록"
          buttonText="  •  직전 학기에 정동아리 지위를 유지했던 동아리만 등록 가능"
          selected={selectedType === RegistrationType.renewalRegistration}
          onClick={() => setSelectedType(RegistrationType.renewalRegistration)}
        />
        <ClubButton
          title="신규 등록"
          buttonText={`  •  2개 정규학기 이상 가등록 지위를 유지한 동아리 등록 가능  
  •  등록 취소 이후 3개 정규학기 이상 지나지 않은 단체 등록 가능`}
          selected={selectedType === RegistrationType.promotionalRegistration}
          onClick={() =>
            setSelectedType(RegistrationType.promotionalRegistration)
          }
        />
        <ClubButton
          title="가등록"
          buttonText={`  •  새로 동아리를 만들려는 학부 총학생회 정회원 등록 가능  
  •  직전 학기에 가등록 지위를 유지한 동아리 등록 가능`}
          selected={selectedType === RegistrationType.provisionalRegistration}
          onClick={() =>
            setSelectedType(RegistrationType.provisionalRegistration)
          }
        />
      </ClubButtonWrapper>
      <Button
        type={selectedType === null ? "disabled" : "default"}
        onClick={() => onClick()}
      >
        등록 신청
      </Button>
    </FlexWrapper>
  );
};

export default RegisterClub;
