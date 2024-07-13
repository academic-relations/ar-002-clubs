import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";

import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import BasicInformSection from "../components/BasicInformSection";
import { RegisterClubType } from "../types/registerClub";

interface RegisterClubMainFrameProps {
  type: RegisterClubType;
}

const RegisterClubMainFrame: React.FC<RegisterClubMainFrameProps> = ({
  type,
}) => (
  <FlexWrapper direction="column" gap={60}>
    <PageHead
      items={[
        {
          name: `동아리 등록`,
          path: `/register-club`,
        },
      ]}
      title={`동아리 ${type} 신청`}
      enableLast
    />
    <BasicInformSection
      isFirstApply={type === RegisterClubType.provisional}
      isReapply={type === RegisterClubType.renewal}
    />
  </FlexWrapper>
);

export default RegisterClubMainFrame;
