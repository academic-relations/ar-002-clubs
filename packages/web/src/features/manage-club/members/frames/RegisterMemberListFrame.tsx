import React, { useEffect, useState } from "react";

import { RegistrationDeadlineEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import Info from "@sparcs-clubs/web/common/components/Info";
import useGetSemesters from "@sparcs-clubs/web/common/services/getSemesters";
import { newMemberListSectionInfoText } from "@sparcs-clubs/web/constants/manageClubMembers";

import { useGetRegistrationTerm } from "@sparcs-clubs/web/features/clubs/services/useGetRegistrationTerm";

import RegisterMemberList from "../components/RegisterMemberList";

const RegisterMemberListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RegisterMemberListFrame = () => {
  const {
    data: termData,
    isLoading: isLoadingTerm,
    isError: isErrorTerm,
  } = useGetRegistrationTerm();
  const [isRegistrationPeriod, setIsRegistrationPeriod] = useState<boolean>();
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

  if (!isRegistrationPeriod) return null;

  return (
    <FoldableSectionTitle title="신청 회원 명단" childrenMargin="20px">
      <RegisterMemberListWrapper>
        <AsyncBoundary
          isLoading={isLoadingTerm || semesterLoading}
          isError={isErrorTerm || semesterError}
        >
          {isRegistrationPeriod && (
            <Info
              text={newMemberListSectionInfoText(
                `${semesterInfo?.semesters[0].year}년 ${semesterInfo?.semesters[0].name}`,
                memberRegistrationPeriodEnd,
              )}
            />
          )}
        </AsyncBoundary>

        <RegisterMemberList />
      </RegisterMemberListWrapper>
    </FoldableSectionTitle>
  );
};

export default RegisterMemberListFrame;
