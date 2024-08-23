"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Icon from "@sparcs-clubs/web/common/components/Icon";
import Info from "@sparcs-clubs/web/common/components/Info";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import ClubButton from "@sparcs-clubs/web/features/register-club/components/ClubButton";

import { mockMyRegistration } from "@sparcs-clubs/web/features/register-club/service/_mock/mockMyRegistration";
import colors from "@sparcs-clubs/web/styles/themes/colors";

const ClubButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  flex: 1 0 0;
  gap: 20px;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.lg}) {
    flex-direction: column;
  }
`;

const WarningWrapper = styled.div`
  display: flex;
  max-height: 300px;
  padding: 12px 16px;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.RED[600]};
  opacity: 1;
  background: ${({ theme }) => theme.colors.RED[100]};
`;

const WarningIconWrapper = styled.div`
  display: flex;
  height: 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  opacity: 1;
`;

const WarningTextsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex: 1 0 0;
  opacity: 1;
`;

const WarningLink: React.FC<{ id: number }> = ({ id }) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`my/register-club/${id}`);
  };

  const AnchorTypography = styled(Typography)`
    cursor: pointer;
    text-decoration: underline;
  `;

  return (
    <AnchorTypography fs={16} fw="REGULAR" lh={24} onClick={onClick}>
      동아리 등록 신청 내역 바로가기
    </AnchorTypography>
  );
};

const WarningArea: React.FC<{ id: number }> = ({ id }) => (
  <WarningWrapper>
    <WarningIconWrapper>
      <Icon type="error" color={colors.RED["600"]} size={20} />
    </WarningIconWrapper>
    <WarningTextsWrapper>
      <Typography fs={16} fw="REGULAR" lh={24}>
        동아리 등록 신청 내역이 이미 존재하여 추가로 신청할 수 없습니다
      </Typography>
      <WarningLink id={id} />
    </WarningTextsWrapper>
  </WarningWrapper>
);

const RegisterClub = () => {
  enum RegistrationType {
    renewalRegistration = "renewalRegistration",
    promotionalRegistration = "promotionalRegistration",
    provisionalRegistration = "provisionalRegistration",
  }

  const [selectedType, setSelectedType] = useState<RegistrationType | null>(
    null,
  );

  const myRegistration = mockMyRegistration; // ToDo: 실제 데이터 연결

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
    <FlexWrapper
      direction="column"
      gap={60}
      style={{ alignItems: "flex-end", alignSelf: "stretch" }}
    >
      <PageHead
        items={[{ name: "동아리 등록", path: "/register-club" }]}
        title="동아리 등록"
      />
      {myRegistration.registrations.length > 0 && (
        <WarningArea id={myRegistration.registrations[0].id} />
      )}
      <Info text="현재는 2024년 봄학기 동아리 등록 기간입니다 (신청 마감 : 2024년 3월 10일 23:59)" />
      <ClubButtonWrapper>
        <ClubButton
          title="재등록"
          buttonText={[
            "직전 학기에 정동아리 지위를 유지했던 동아리만 등록 가능",
          ]}
          selected={selectedType === RegistrationType.renewalRegistration}
          onClick={() => setSelectedType(RegistrationType.renewalRegistration)}
        />
        <ClubButton
          title="신규 등록"
          buttonText={[
            "2개 정규학기 이상 가등록 지위를 유지한 동아리 등록 가능",
            "등록 취소 이후 3개 정규학기 이상 지나지 않은 단체 등록 가능",
          ]}
          selected={selectedType === RegistrationType.promotionalRegistration}
          onClick={() =>
            setSelectedType(RegistrationType.promotionalRegistration)
          }
        />
        <ClubButton
          title="가등록"
          buttonText={[
            "새로 동아리를 만드려는 학부 총학생회 정회원 등록 가능",
            "직전 학기에 가등록 지위를 유지한 동아리 등록 가능",
          ]}
          selected={selectedType === RegistrationType.provisionalRegistration}
          onClick={() =>
            setSelectedType(RegistrationType.provisionalRegistration)
          }
        />
      </ClubButtonWrapper>
      <Button
        type={
          selectedType === null || myRegistration.registrations.length > 0
            ? "disabled"
            : "default"
        }
        onClick={() => onClick()}
      >
        등록 신청
      </Button>
    </FlexWrapper>
  );
};

export default RegisterClub;
