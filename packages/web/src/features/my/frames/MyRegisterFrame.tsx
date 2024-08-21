import React from "react";

import { RegistrationDeadlineEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import MoreDetailTitle from "@sparcs-clubs/web/common/components/MoreDetailTitle";
import MyClubProfTable from "@sparcs-clubs/web/features/my/components/MyClubProfTable";
import MyClubTable from "@sparcs-clubs/web/features/my/components/MyClubTable";
import MyMemberTable from "@sparcs-clubs/web/features/my/components/MyMemberTable";
import {
  mockClubRegister,
  mockMemberRegister,
  mockProfClubRegister,
  mockRegisterPeriod,
} from "@sparcs-clubs/web/features/my/services/_mock/mockMyRegister";

const MyRegisterFrame: React.FC<{ isStudent: boolean }> = ({ isStudent }) =>
  (mockRegisterPeriod.includes(
    RegistrationDeadlineEnum.ClubRegistrationApplication,
  ) ||
    mockRegisterPeriod.includes(
      RegistrationDeadlineEnum.StudentRegistrationApplication,
    )) && (
    <FoldableSectionTitle title="동아리 신청 내역">
      <AsyncBoundary isLoading={false} isError={false}>
        <FlexWrapper direction="column" gap={40}>
          {mockRegisterPeriod.includes(
            RegistrationDeadlineEnum.ClubRegistrationApplication,
          ) && (
            <FlexWrapper direction="column" gap={20}>
              <MoreDetailTitle
                title="동아리 등록"
                moreDetail=""
                moreDetailPath=""
              />
              <AsyncBoundary isLoading={false} isError={false}>
                {isStudent ? (
                  <MyClubTable
                    clubRegisterList={
                      mockClubRegister ?? { total: 0, items: [], offset: 0 }
                    }
                  />
                ) : (
                  <MyClubProfTable
                    clubProfRegisterList={
                      mockProfClubRegister ?? { total: 0, items: [], offset: 0 }
                    }
                  />
                )}
              </AsyncBoundary>
            </FlexWrapper>
          )}
          {mockRegisterPeriod.includes(
            RegistrationDeadlineEnum.StudentRegistrationApplication,
          ) &&
            isStudent && (
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

export default MyRegisterFrame;
