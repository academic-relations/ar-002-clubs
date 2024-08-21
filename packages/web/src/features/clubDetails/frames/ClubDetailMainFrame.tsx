"use client";

import React, { useEffect, useState } from "react";

import { RegistrationApplicationStudentStatusEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import { overlay } from "overlay-kit";

import styled, { useTheme } from "styled-components";

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

import { useIsInClub } from "@sparcs-clubs/web/hooks/isInClub";

import { useRegisterClub } from "../services/registerClub";

import type { ApiClb002ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";

interface ClubDetailMainFrameProps {
  club: ApiClb002ResponseOK;
  isRegistrationPeriod: boolean;
}

const CardWrapper = styled.div`
  width: 100%;
  padding-left: 20px;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    padding-left: 16px;
  }
`;

const MoreInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 60px;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.lg}) {
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
  const { isLoggedIn } = useAuth();

  const [isInClubFromHook, clubLoading] = useIsInClub(club.id);

  const [isInClub, setIsInclub] = useState(
    RegistrationApplicationStudentStatusEnum.Rejected,
  );
  const localError = false;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 초기값 설정
    if (!clubLoading) {
      setIsInclub(isInClubFromHook);
      setLoading(clubLoading);
    }
  }, [isInClubFromHook, clubLoading]);

  const ToggleRegistered = async (close: () => void) => {
    close();
    await useRegisterClub(club.id);
    setIsInclub(RegistrationApplicationStudentStatusEnum.Pending);
  };

  const ToggleUnregistered = async (close: () => void) => {
    // await useRegisterClub(club.id);
    close();
    setIsInclub(RegistrationApplicationStudentStatusEnum.Rejected);
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
        {isInClub === RegistrationApplicationStudentStatusEnum.Pending ? (
          <CancellableModalContent
            onClose={close}
            onConfirm={async () => {
              /* TODO : 가입 취소 API 구현 시 연결 */
              ToggleUnregistered(close);
            }}
          >
            2024학년도 봄학기 {club.type === 1 ? "정동아리" : "가동아리"}{" "}
            {club.name_kr}의<br />
            회원 등록을 취소합니다.
          </CancellableModalContent>
        ) : (
          <CancellableModalContent
            onClose={close}
            onConfirm={async () => {
              ToggleRegistered(close);
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

  const renderButton = () => {
    if (isInClub === RegistrationApplicationStudentStatusEnum.Pending) {
      return (
        <Button type="default" onClick={submitHandler}>
          회원 등록 취소
        </Button>
      );
    }
    if (isInClub === RegistrationApplicationStudentStatusEnum.Approved) {
      return (
        <Button type="disabled" onClick={submitHandler}>
          회장 승인 완료
        </Button>
      );
    }
    return (
      <Button type="default" onClick={submitHandler}>
        회원 등록 신청
      </Button>
    );
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
              {!isMobile ?? (
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

          <FlexWrapper direction="column" gap={20} style={{ flex: "1 0 0" }}>
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
