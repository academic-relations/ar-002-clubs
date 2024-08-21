"use client";

import React, { useEffect, useState } from "react";

import { overlay } from "overlay-kit";

import styled, { useTheme } from "styled-components";

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

import type { ApiClb002ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";

interface ClubDetailMainFrameProps {
  club: ApiClb002ResponseOK;
  isRegistrationPeriod: boolean;
}

const CardWrapper = styled.div`
  padding-left: 20px;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    padding-left: 16px;
  }
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

const ResponsiveWrapper = styled(FlexWrapper)`
  gap: 60px;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    gap: 40px;
  }
`;

const ClubDetailMainFrame: React.FC<ClubDetailMainFrameProps> = ({
  club,
  isRegistrationPeriod,
}) => {
  // TODO : 해당 동아리 등록 신청 여부 받아오기
  const [isRegistered, setIsRegistered] = useState(false);

  const { isLoggedIn } = useAuth();

  const toggleRegistered = (close: () => void) => {
    // TODO : 회원가입 승인 or 취소 로직 추가
    setIsRegistered(prev => !prev);
    close();
  };

  const theme = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${theme.responsive.BREAKPOINT.sm})`,
    );

    // Check the initial state
    setIsMobile(mediaQuery.matches);

    // Set up an event listener to update the state when the window resizes
    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);

    // Clean up the event listener on component unmount
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, [theme]);

  const submitHandler = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} onClose={close}>
        {isRegistered ? (
          <CancellableModalContent
            onClose={close}
            onConfirm={() => {
              toggleRegistered(close);
            }}
          >
            2024학년도 봄학기 {club.type === 1 ? "정동아리" : "가동아리"}{" "}
            {club.name_kr}의<br />
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
            {club.name_kr}의<br />
            회원 등록 신청을 진행합니다.
          </CancellableModalContent>
        )}
      </Modal>
    ));
  };

  return (
    <ResponsiveWrapper gap={60} direction="column">
      <PageHead
        items={[
          { name: "동아리 목록", path: "/clubs" },
          { name: club.name_kr, path: `/clubs/${club.id}` },
        ]}
        title={club.name_kr}
        action={
          isLoggedIn &&
          (isRegistrationPeriod ? (
            <ResisterInfoWrapper>
              {isMobile ? null : (
                <Typography fs={16} color="GRAY.600" fw="REGULAR">
                  등록 신청 {club.totalMemberCnt}명
                </Typography>
              )}
              <Button type="default" onClick={submitHandler}>
                {isRegistered ? "회원 등록 취소" : "회원 등록 신청"}
              </Button>
            </ResisterInfoWrapper>
          ) : (
            isRegistered && <Button type="disabled">회원 승인 대기</Button>
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
    </ResponsiveWrapper>
  );
};

export default ClubDetailMainFrame;
