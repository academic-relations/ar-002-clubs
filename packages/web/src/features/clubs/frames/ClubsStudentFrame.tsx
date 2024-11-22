"use client";

import React, { useEffect, useState } from "react";

import { RegistrationDeadlineEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Info from "@sparcs-clubs/web/common/components/Info";
import useGetSemesters from "@sparcs-clubs/web/common/services/getSemesters";
import ClubsListFrame from "@sparcs-clubs/web/features/clubs/frames/ClubsListFrame";
import { useGetRegistrationTerm } from "@sparcs-clubs/web/features/clubs/services/useGetRegistrationTerm";
import { formatDateTime } from "@sparcs-clubs/web/utils/Date/formatDate";

const ClubsStudentFrame: React.FC = () => {
  const {
    data: termData,
    isLoading: isLoadingTerm,
    isError: isErrorTerm,
  } = useGetRegistrationTerm();
  const [isRegistrationPeriod, setIsRegistrationPeriod] =
    useState<boolean>(false);
  const [memberRegistrationPeriodEnd, setMemberRegistrationPeriodEnd] =
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
          RegistrationDeadlineEnum.StudentRegistrationApplication,
      );
      if (registrationEvent.length > 0) {
        setIsRegistrationPeriod(true);
        setMemberRegistrationPeriodEnd(registrationEvent[0].endTerm);
      } else {
        setIsRegistrationPeriod(false);
      }
    }
  }, [termData]);

  const {
    data: semesterInfo,
    isLoading: semesterLoading,
    isError: semesterError,
  } = useGetSemesters({
    pageOffset: 1,
    itemCount: 1,
  });

  return (
    <>
      <AsyncBoundary
        isLoading={isLoadingTerm || semesterLoading}
        isError={isErrorTerm || semesterError}
      >
        {isRegistrationPeriod && (
          <Info
            text={`현재는 ${semesterInfo?.semesters[0].year}년 ${semesterInfo?.semesters[0].name}학기 동아리 신청 기간입니다 (신청 마감 : ${formatDateTime(memberRegistrationPeriodEnd)})`}
          />
        )}
      </AsyncBoundary>
      <ClubsListFrame isRegistrationPeriod={isRegistrationPeriod} />
    </>
  );
};

export default ClubsStudentFrame;
