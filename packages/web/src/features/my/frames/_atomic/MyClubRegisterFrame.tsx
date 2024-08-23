import React from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import MoreDetailTitle from "@sparcs-clubs/web/common/components/MoreDetailTitle";
import MyClubProfTable from "@sparcs-clubs/web/features/my/components/MyClubProfTable";
import MyClubTable from "@sparcs-clubs/web/features/my/components/MyClubTable";
import {
  mockClubRegister,
  mockProfClubRegister,
} from "@sparcs-clubs/web/features/my/services/_mock/mockMyRegister";
import { useGetMyClubRegistration } from "@sparcs-clubs/web/features/my/services/getMyClubRegistration";

const MyClubRegisterFrame: React.FC<{ profile: string }> = ({ profile }) => {
  const { data, isLoading, isError } = useGetMyClubRegistration();

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <FlexWrapper direction="column" gap={20}>
        <MoreDetailTitle title="동아리 등록" moreDetail="" moreDetailPath="" />
        {profile === "professor" ? (
          // TODO: reg022 구현 후 작업
          <MyClubProfTable
            clubProfRegisterList={
              mockProfClubRegister ?? { total: 0, items: [], offset: 0 }
            }
          />
        ) : (
          // TODO: reg012 수정 후 작업
          <MyClubTable clubRegisterList={mockClubRegister ?? data} />
        )}
      </FlexWrapper>
    </AsyncBoundary>
  );
};

export default MyClubRegisterFrame;
