import React from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import MoreDetailTitle from "@sparcs-clubs/web/common/components/MoreDetailTitle";
import { useGetMyMemberRegistration } from "@sparcs-clubs/web/features/clubDetails/services/getMyMemberRegistration";
import MyMemberTable from "@sparcs-clubs/web/features/my/components/MyMemberTable";
import { mockMemberRegister } from "@sparcs-clubs/web/features/my/services/_mock/mockMyRegister";

const MyMemberRegisterFrame: React.FC = () => {
  // TODO: reg006 수정 후 작업
  const { data, isLoading, isError } = useGetMyMemberRegistration();
  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <FlexWrapper direction="column" gap={20}>
        <MoreDetailTitle title="회원 등록" moreDetail="" moreDetailPath="" />
        <MyMemberTable memberRegisterList={mockMemberRegister ?? data} />
      </FlexWrapper>
    </AsyncBoundary>
  );
};

export default MyMemberRegisterFrame;
