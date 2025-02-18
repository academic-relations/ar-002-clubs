"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { RegistrationDeadlineEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Info from "@sparcs-clubs/web/common/components/Info";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import WarningInfo from "@sparcs-clubs/web/common/components/WarningInfo";
import { useGetRegistrationTerm } from "@sparcs-clubs/web/features/clubs/services/useGetRegistrationTerm";
import { useGetMyClubRegistration } from "@sparcs-clubs/web/features/my/services/getMyClubRegistration";
import ClubButton from "@sparcs-clubs/web/features/register-club/components/_atomic/ClubButton";
import useGetSemesterNow from "@sparcs-clubs/web/utils/getSemesterNow";

import {
  registerClubDeadlineInfoText,
  registerClubOptions,
} from "../constants";
import { RegistrationType } from "../types/registerClub";

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

const RegisterClubFrame: React.FC = () => {
  const router = useRouter();

  const [selectedType, setSelectedType] = useState<RegistrationType | null>(
    null,
  );
  const [clubRegistrationPeriodEnd, setClubRegistrationPeriodEnd] =
    useState<Date | null>(null);

  const {
    data: myClubRegistrationData,
    isLoading,
    isError,
  } = useGetMyClubRegistration();

  const {
    data: termData,
    isLoading: isLoadingTerm,
    isError: isErrorTerm,
  } = useGetRegistrationTerm();

  const {
    semester: semesterInfo,
    isLoading: semesterLoading,
    isError: semesterError,
  } = useGetSemesterNow();

  const hasMyClubRegistration = useMemo<boolean>(
    () =>
      myClubRegistrationData
        ? myClubRegistrationData.registrations.length > 0
        : false,
    [myClubRegistrationData],
  );

  useEffect(() => {
    if (termData) {
      const now = new Date();
      const currentEvents = termData.events.filter(
        event => now >= event.startTerm && now <= event.endTerm,
      );

      if (currentEvents.length === 0) return;

      const registrationEvent = currentEvents.filter(
        event =>
          event.registrationEventEnumId ===
          RegistrationDeadlineEnum.ClubRegistrationApplication,
      );
      if (registrationEvent.length > 0) {
        setClubRegistrationPeriodEnd(registrationEvent[0].endTerm);
      }
    }
  }, [termData]);

  const onClickRegisterClub = useCallback(() => {
    if (selectedType === RegistrationType.Renewal)
      router.push(`register-club/renewal`);
    else if (selectedType === RegistrationType.Promotional)
      router.push(`register-club/promotional`);
    else if (selectedType === RegistrationType.Provisional)
      router.push(`register-club/provisional`);
  }, [selectedType]);

  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[{ name: "동아리 등록", path: "/register-club" }]}
        title="동아리 등록"
      />
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        {hasMyClubRegistration && (
          <WarningInfo
            linkText="동아리 등록 신청 내역 바로가기"
            onClickLink={() =>
              router.push(
                `my/register-club/${myClubRegistrationData?.registrations[0].id}`,
              )
            }
          >
            <Typography fs={16} lh={24}>
              동아리 등록 신청 내역이 이미 존재하여 추가로 신청할 수 없습니다
            </Typography>
          </WarningInfo>
        )}
      </AsyncBoundary>
      <AsyncBoundary
        isLoading={isLoadingTerm || semesterLoading}
        isError={isErrorTerm || semesterError}
      >
        {clubRegistrationPeriodEnd != null ? (
          <Info
            text={registerClubDeadlineInfoText(
              clubRegistrationPeriodEnd,
              semesterInfo,
            )}
          />
        ) : (
          <Info text="현재는 동아리 등록 기간이 아닙니다" />
        )}
      </AsyncBoundary>
      <ClubButtonWrapper>
        {registerClubOptions.map(({ type, title, buttonText }) => (
          <ClubButton
            key={type}
            title={title}
            buttonText={buttonText}
            selected={selectedType === type}
            onClick={() => setSelectedType(type)}
          />
        ))}
      </ClubButtonWrapper>
      <Button
        type={
          selectedType === null || hasMyClubRegistration
            ? "disabled"
            : "default"
        }
        onClick={onClickRegisterClub}
        style={{ alignSelf: "end" }}
      >
        등록 신청
      </Button>
    </FlexWrapper>
  );
};

export default RegisterClubFrame;
