"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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
import { formatDateTime } from "@sparcs-clubs/web/utils/Date/formatDate";
import useGetSemesterNow from "@sparcs-clubs/web/utils/getSemesterNow";

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

const RegisterClubFrame = () => {
  enum RegistrationType {
    renewalRegistration = "renewalRegistration",
    promotionalRegistration = "promotionalRegistration",
    provisionalRegistration = "provisionalRegistration",
  }

  const [selectedType, setSelectedType] = useState<RegistrationType | null>(
    null,
  );

  const {
    data: myClubRegistrationData,
    isLoading,
    isError,
  } = useGetMyClubRegistration();
  const hasMyClubRegistration = useMemo<boolean>(
    () =>
      myClubRegistrationData
        ? myClubRegistrationData.registrations.length > 0
        : false,
    [myClubRegistrationData],
  );

  const {
    data: termData,
    isLoading: isLoadingTerm,
    isError: isErrorTerm,
  } = useGetRegistrationTerm();
  const [isRegistrationPeriod, setIsRegistrationPeriod] = useState<boolean>();
  const [clubRegistrationPeriodEnd, setClubRegistrationPeriodEnd] =
    useState<Date>(new Date());

  useEffect(() => {
    if (termData) {
      const now = new Date();
      const currentEvents = termData.events.filter(
        event => now >= event.startTerm && now <= event.endTerm,
      );
      if (currentEvents.length === 0) {
        setIsRegistrationPeriod(false);
        return;
      }
      const registrationEvent = currentEvents.filter(
        event =>
          event.registrationEventEnumId ===
          RegistrationDeadlineEnum.ClubRegistrationApplication,
      );
      if (registrationEvent.length > 0) {
        setIsRegistrationPeriod(true);
        setClubRegistrationPeriodEnd(registrationEvent[0].endTerm);
      } else {
        setIsRegistrationPeriod(false);
      }
    }
  }, [termData]);

  const router = useRouter();
  const onClick = () => {
    if (selectedType === RegistrationType.renewalRegistration)
      router.push(`register-club/renewal`);
    else if (selectedType === RegistrationType.promotionalRegistration)
      router.push(`register-club/promotional`);
    else if (selectedType === RegistrationType.provisionalRegistration)
      router.push(`register-club/provisional`);
  };

  const {
    semester: semesterInfo,
    isLoading: semesterLoading,
    isError: semesterError,
  } = useGetSemesterNow();

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      {/* TODO: (@dora) fix loading boundary to enhance ux */}
      <FlexWrapper direction="column" gap={60}>
        <PageHead
          items={[{ name: "동아리 등록", path: "/register-club" }]}
          title="동아리 등록"
        />
        {hasMyClubRegistration && (
          <WarningInfo
            linkText="동아리 등록 신청 내역 바로가기"
            onClickLink={() =>
              router.push(
                `my/register-club/${myClubRegistrationData?.registrations[0].id}`,
              )
            }
          >
            <Typography fs={16} fw="REGULAR" lh={24}>
              동아리 등록 신청 내역이 이미 존재하여 추가로 신청할 수 없습니다
            </Typography>
          </WarningInfo>
        )}
        <AsyncBoundary
          isLoading={isLoadingTerm || semesterLoading}
          isError={isErrorTerm || semesterError}
        >
          {isRegistrationPeriod ? (
            <Info
              text={`현재는 ${semesterInfo?.year}년 ${semesterInfo?.name}학기 동아리 등록 기간입니다 (신청 마감 : ${formatDateTime(clubRegistrationPeriodEnd)})`}
            />
          ) : (
            <Info text="현재는 동아리 등록 기간이 아닙니다" />
          )}
        </AsyncBoundary>
        <ClubButtonWrapper>
          <ClubButton
            title="재등록"
            buttonText={[
              "직전 학기에 정동아리 지위를 유지했던 동아리만 등록 가능",
            ]}
            selected={selectedType === RegistrationType.renewalRegistration}
            onClick={() =>
              setSelectedType(RegistrationType.renewalRegistration)
            }
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
            selectedType === null || hasMyClubRegistration
              ? "disabled"
              : "default"
          }
          onClick={() => onClick()}
          style={{ alignSelf: "end" }}
        >
          등록 신청
        </Button>
      </FlexWrapper>
    </AsyncBoundary>
  );
};

export default RegisterClubFrame;
