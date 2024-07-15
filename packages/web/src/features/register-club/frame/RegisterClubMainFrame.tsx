import React from "react";

import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";

import Info from "@sparcs-clubs/web/common/components/Info";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import AdvancedInformFrame from "../components/AdvancedInformFrame";
import BasicInformFrame from "../components/BasicInformFrame";
import ClubRulesFrame from "../components/ClubRulesFrame";
import { RegisterClubType } from "../types/registerClub";

interface RegisterClubMainFrameProps {
  type: RegisterClubType;
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

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
    {/* TODO. 등록 기간, 신청마감 동적처리  */}
    <Info text="현재는 2024년 봄학기 동아리 등록 기간입니다 (신청 마감 : 2024년 3월 10일 23:59)" />
    <BasicInformFrame type={type} />
    <AdvancedInformFrame type={type} />
    <ClubRulesFrame isProvisional={type === RegisterClubType.provisional} />
    <ButtonWrapper>
      <Button
        type="outlined"
        onClick={() => {
          // TODO. 취소 로직 추가
        }}
      >
        취소
      </Button>
      <Button
        onClick={() => {
          // TODO. 신청 로직 추가
        }}
      >
        신청
      </Button>
    </ButtonWrapper>
  </FlexWrapper>
);

export default RegisterClubMainFrame;
