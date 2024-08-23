import React, { useEffect, useState } from "react";

import { RegistrationDeadlineEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import MoreDetailTitle from "@sparcs-clubs/web/common/components/MoreDetailTitle";
import { useGetRegistrationTerm } from "@sparcs-clubs/web/features/clubs/services/useGetRegistrationTerm";
import MyClubProfTable from "@sparcs-clubs/web/features/my/components/MyClubProfTable";
import MyClubTable from "@sparcs-clubs/web/features/my/components/MyClubTable";
import MyMemberTable from "@sparcs-clubs/web/features/my/components/MyMemberTable";
import {
  mockClubRegister,
  mockMemberRegister,
  mockProfClubRegister,
} from "@sparcs-clubs/web/features/my/services/_mock/mockMyRegister";

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
    <FoldableSectionTitle title="동아리 신청 내역">
      <AsyncBoundary isLoading={isLoadingTerm} isError={isErrorTerm}>
        <FlexWrapper direction="column" gap={40}>
          {registrationStatus ===
            RegistrationDeadlineEnum.ClubRegistrationApplication && (
            <FlexWrapper direction="column" gap={20}>
              <MoreDetailTitle
                title="동아리 등록"
                moreDetail=""
                moreDetailPath=""
              />
              <AsyncBoundary isLoading={false} isError={false}>
                {profile === "professor" ? (
                  <MyClubProfTable
                    clubProfRegisterList={
                      mockProfClubRegister ?? {
                        total: 0,
                        items: [],
                        offset: 0,
                      }
                    }
                  />
                ) : (
                  <MyClubTable
                    clubRegisterList={
                      mockClubRegister ?? { total: 0, items: [], offset: 0 }
                    }
                  />
                )}
              </AsyncBoundary>
            </FlexWrapper>
          )}
          {registrationStatus ===
            RegistrationDeadlineEnum.StudentRegistrationApplication &&
            profile !== "professor" && (
              <FlexWrapper direction="column" gap={20}>
                <MoreDetailTitle
                  title="회원 등록"
                  moreDetail=""
                  moreDetailPath=""
                />
                <AsyncBoundary isLoading={false} isError={false}>
                  <MyMemberTable
                    memberRegisterList={
                      mockMemberRegister ?? { total: 0, items: [], offset: 0 }
                    }
                  />
                </AsyncBoundary>
              </FlexWrapper>
            )}
        </FlexWrapper>
      </AsyncBoundary>
    </FoldableSectionTitle>
  );
};

export default MyRegisterFrame;
