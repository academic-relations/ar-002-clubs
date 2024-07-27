/* eslint-disable react/jsx-no-useless-fragment */

"use client";

import React, { useState } from "react";

import { overlay } from "overlay-kit";

import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import ClubDetailCard from "@sparcs-clubs/web/features/clubDetails/components/ClubDetailCard";
import ClubInfoCard from "@sparcs-clubs/web/features/clubDetails/components/ClubInfoCard";
import PersonInfoCard from "@sparcs-clubs/web/features/clubDetails/components/PersonInfoCard";

import type { ApiClb002ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";

interface ClubDetailMainFrameProps {
  club: ApiClb002ResponseOK;
  isRegistrationPeriod: boolean;
}

const CardWrapper = styled.div`
  padding-left: 20px;
`;

const MoreInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 60px;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.md}) {
    flex-direction: column;
  }
`;

const ClubDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1 0 0;
`;

const StyledText = styled.span`
  color: ${({ theme }) => theme.colors.GRAY[600]};
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-weight: 400;
`;

const ResisterInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  flex: 1 0 0;
  align-items: center;
`;

const ModalBody = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ClubDetailMainFrame: React.FC<ClubDetailMainFrameProps> = ({
  club,
  isRegistrationPeriod,
}) => {
  // 임의로 등록 여부를 확인하는 변수를 만들었어요.
  const [isRegistered, setIsRegistered] = useState(false);

  const toggleRegistered = (close: () => void) => {
    // 여기에 회원 등록을 취소 or 승인 하는 코드를 짜야해요.
    setIsRegistered(prev => !prev);
    close();
  };

  const submitHandler = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} onClose={close}>
        <ModalBody>
          {isRegistered ? (
            <CancellableModalContent
              onClose={close}
              onConfirm={() => {
                toggleRegistered(close);
              }}
            >
              2024학년도 봄학기 {club.type === 1 ? "정동아리" : "가동아리"}{" "}
              {club.name}의<br />
              회원 등록을 취소합니다.
            </CancellableModalContent>
          ) : (
            <CancellableModalContent
              onClose={close}
              onConfirm={() => {
                toggleRegistered(close);
              }}
            >
              2024학년도 봄학기 {club.type === 1 ? "정동아리" : "가동아리"}{" "}
              {club.name}의<br />
              회원 등록 신청을 진행합니다.
            </CancellableModalContent>
          )}
        </ModalBody>
      </Modal>
    ));
  };

  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[
          { name: "동아리 목록", path: "/clubs" },
          { name: club.name, path: `/clubs/${club.id}` },
        ]}
        title={club.name}
        action={
          isRegistrationPeriod ? (
            <ResisterInfoWrapper>
              <StyledText>등록 신청 {club.totalMemberCnt}명</StyledText>
              <Button
                type="default"
                onClick={submitHandler}
                style={{ fontWeight: 500, lineHeight: 1.25 }}
              >
                {isRegistered ? "회원 등록 취소" : "회원 등록 신청"}
              </Button>
            </ResisterInfoWrapper>
          ) : (
            <Button
              type="disabled"
              style={{ fontWeight: 500, lineHeight: 1.25 }}
            >
              회원 승인 대기
            </Button>
          )
        }
      />

      <FlexWrapper direction="column" gap={20}>
        <SectionTitle size="lg">동아리 정보</SectionTitle>
        <CardWrapper>
          <ClubInfoCard club={club} />
        </CardWrapper>
      </FlexWrapper>

      <MoreInfoWrapper>
        <FlexWrapper direction="column" gap={20}>
          <SectionTitle size="lg">인적 사항 </SectionTitle>
          <CardWrapper>
            <PersonInfoCard club={club} />
          </CardWrapper>
        </FlexWrapper>

        <ClubDetailWrapper>
          <SectionTitle size="lg">동아리 설명</SectionTitle>
          <CardWrapper>
            <ClubDetailCard club={club} />
          </CardWrapper>
        </ClubDetailWrapper>
      </MoreInfoWrapper>
    </FlexWrapper>
  );
};

export default ClubDetailMainFrame;
