/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import React, { useState } from "react";

import { overlay } from "overlay-kit";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";
import ClubDetailCard from "@sparcs-clubs/web/features/clubDetails/components/ClubDetailCard";
import ClubInfoCard from "@sparcs-clubs/web/features/clubDetails/components/ClubInfoCard";
import PersonInfoCard from "@sparcs-clubs/web/features/clubDetails/components/PersonInfoCard";

import { useIsInClub } from "../services/getMyClub";

import { useRegisterClub } from "../services/registerClub";

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

const ResisterInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  flex: 1 0 0;
  align-items: center;
`;

const ClubDetailMainFrame: React.FC<ClubDetailMainFrameProps> = ({
  club,
  isRegistrationPeriod,
}) => {
  const [isInclub, clubError, clubLoading] = useIsInClub(club.id);

  const { isLoggedIn } = useAuth();

  const [isRegistered, setIsRegistered] = useState(false);

  const ToggleRegistered = async (close: () => void) => {
    // TODO : 회원가입 승인 or 취소 로직 추가
    await useRegisterClub(club.id);
    close();
  };

  const submitHandler = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} onClose={close}>
        {isInclub ? (
          <CancellableModalContent
            onClose={close}
            onConfirm={() => {
              ToggleRegistered(close);
            }}
          >
            2024학년도 봄학기 {club.type === 1 ? "정동아리" : "가동아리"}{" "}
            {club.name}의<br />
            회원 등록을 취소합니다.
          </CancellableModalContent>
        ) : (
          <CancellableModalContent
            onClose={close}
            onConfirm={async () => {
              toggleRegistered(close);
            }}
          >
            2024학년도 봄학기 {club.type === 1 ? "정동아리" : "가동아리"}{" "}
            {club.name}의<br />
            회원 등록 신청을 진행합니다.
          </CancellableModalContent>
        )}
      </Modal>
    ));
  };

  return (
    <AsyncBoundary isLoading={clubLoading} isError={clubError}>
      <FlexWrapper direction="column" gap={60}>
        <PageHead
          items={[
            { name: "동아리 목록", path: "/clubs" },
            { name: club.name, path: `/clubs/${club.id}` },
          ]}
          title={club.name}
          action={
            isLoggedIn &&
            (isRegistrationPeriod ? (
              <ResisterInfoWrapper>
                <Typography fs={16} color="GRAY.600" fw="REGULAR">
                  등록 신청 {club.totalMemberCnt}명
                </Typography>
                <Button type="default" onClick={submitHandler}>
                  {isInclub ? "회원 등록 취소" : "회원 등록 신청"}
                </Button>
              </ResisterInfoWrapper>
            ) : (
              isInclub && <Button type="disabled">회원 승인 대기</Button>
            ))
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

          <FlexWrapper direction="column" gap={20}>
            <SectionTitle size="lg">동아리 설명</SectionTitle>
            <CardWrapper>
              <ClubDetailCard club={club} />
            </CardWrapper>
          </FlexWrapper>
        </MoreInfoWrapper>
      </FlexWrapper>
    </AsyncBoundary>
  );
};

export default ClubDetailMainFrame;
