"use client";

import React, { useEffect, useState } from "react";

import {
  RegistrationApplicationStudentStatusEnum,
  RegistrationDeadlineEnum,
} from "@sparcs-clubs/interface/common/enum/registration.enum";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import { useGetRegistrationTerm } from "@sparcs-clubs/web/features/clubs/services/useGetRegistrationTerm";

import { ClubDetailProps } from "../components/ClubDetailCard";
import { RegisterInfo } from "../components/RegisterInfo";
import { useGetMyMemberRegistration } from "../services/getMyMemberRegistration";
import ClubDetailInfoFrame from "./ClubDetailInfoFrame";

const ClubDetailStudentFrame: React.FC<ClubDetailProps> = ({ club }) => {
  const {
    data: myRegistrationList,
    isLoading,
    isError,
    refetch,
  } = useGetMyMemberRegistration();

  const {
    data: termData,
    isLoading: isLoadingTerm,
    isError: isErrorTerm,
  } = useGetRegistrationTerm();
  const [isRegistrationPeriod, setIsRegistrationPeriod] =
    useState<boolean>(false);

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
          RegistrationDeadlineEnum.StudentRegistrationApplication,
      );
      if (registrationEvent.length > 0) {
        setIsRegistrationPeriod(true);
      } else {
        setIsRegistrationPeriod(false);
      }
    }
  }, [termData]);

  let isInClub = RegistrationApplicationStudentStatusEnum.Rejected;
  let isRegistered = false;
  if (myRegistrationList && myRegistrationList.applies.length > 0) {
    const thisRegistration = myRegistrationList.applies.find(
      apply => apply.clubId === club.id,
    );
    if (thisRegistration) {
      isInClub = thisRegistration.applyStatusEnumId;
      isRegistered = true;
    } else {
      isRegistered = false;
    }
  }

  return (
    <AsyncBoundary
      isLoading={isLoading || isLoadingTerm}
      isError={isError || isErrorTerm}
    >
      <FlexWrapper direction="column" gap={60}>
        <PageHead
          items={[
            { name: "동아리 목록", path: "/clubs" },
            { name: club.name_kr, path: `/clubs/${club.id}` },
          ]}
          title={club.name_kr}
          action={
            isRegistrationPeriod && (
              <RegisterInfo
                club={club}
                isInClub={isInClub}
                isRegistered={isRegistered}
                refetch={refetch}
                myRegistrationList={myRegistrationList ?? { applies: [] }}
              />
            )
          }
        />
        <ClubDetailInfoFrame
          club={club}
          isRegistrationPeriod={isRegistrationPeriod}
        />
      </FlexWrapper>
    </AsyncBoundary>
  );
};

export default ClubDetailStudentFrame;
