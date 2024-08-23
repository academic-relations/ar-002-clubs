import React, { useEffect, useState } from "react";

import { RegistrationDeadlineEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import { useGetRegistrationTerm } from "@sparcs-clubs/web/features/clubs/services/useGetRegistrationTerm";

import MyClubRegisterFrame from "./_atomic/MyClubRegisterFrame";
import MyMemberRegisterFrame from "./_atomic/MyMemberRegisterFrame";

const MyRegisterFrame: React.FC<{ profile: string }> = ({ profile }) => {
  const {
    data: termData,
    isLoading: isLoadingTerm,
    isError: isErrorTerm,
  } = useGetRegistrationTerm();

  const [registrationStatus, setRegistrationStatus] =
    useState<RegistrationDeadlineEnum>(RegistrationDeadlineEnum.Finish);

  useEffect(() => {
    if (termData) {
      const now = new Date();
      const currentEvents = termData.events.filter(
        event => now >= event.startTerm && now <= event.endTerm,
      );
      if (currentEvents.length === 0) {
        setRegistrationStatus(RegistrationDeadlineEnum.Finish);
        return;
      }
      const memberRegistrationEvent = currentEvents.filter(
        event =>
          event.registrationEventEnumId ===
          RegistrationDeadlineEnum.StudentRegistrationApplication,
      );
      if (memberRegistrationEvent.length > 0) {
        setRegistrationStatus(
          RegistrationDeadlineEnum.StudentRegistrationApplication,
        );
      }
      const clubRegistrationEvent = currentEvents.filter(
        event =>
          event.registrationEventEnumId ===
          RegistrationDeadlineEnum.ClubRegistrationApplication,
      );
      if (clubRegistrationEvent.length > 0) {
        setRegistrationStatus(
          RegistrationDeadlineEnum.ClubRegistrationApplication,
        );
      }
    }
  }, [termData]);

  return (
    registrationStatus !== RegistrationDeadlineEnum.Finish && (
      <FoldableSectionTitle title="동아리 신청 내역">
        <AsyncBoundary isLoading={isLoadingTerm} isError={isErrorTerm}>
          <FlexWrapper direction="column" gap={40}>
            {registrationStatus ===
              RegistrationDeadlineEnum.ClubRegistrationApplication && (
              <MyClubRegisterFrame profile={profile} />
            )}
            {registrationStatus ===
              RegistrationDeadlineEnum.StudentRegistrationApplication &&
              profile !== "professor" && <MyMemberRegisterFrame />}
          </FlexWrapper>
        </AsyncBoundary>
      </FoldableSectionTitle>
    )
  );
};

export default MyRegisterFrame;
