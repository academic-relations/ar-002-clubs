import React from "react";
import styled from "styled-components";

import { RegistrationApplicationStudentStatusEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import { MemTagList } from "@sparcs-clubs/web/constants/tableTagList";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

interface StatusInfoFrameProps {
  statusInfo: { Regular: number; NonRegular: number; Total: number };
  status: RegistrationApplicationStudentStatusEnum;
}

const StatusWrapper = styled.div`
  padding-left: 28px;
`;

const TotalCountContainer = styled.div`
  width: 120px;
  height: 24px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const StatusCountContainer = styled.div`
  width: 160px;
  height: 24px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const StatusContentsContainer = styled.div`
  width: 60px;
  height: 24px;
  justify-content: center;
  align-items: center;
  display: flex;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
`;

export const TotalContentsContainer = styled.div`
  flex: 1;
  height: 24px;
  justify-content: center;
  align-items: center;
  display: flex;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
`;

const StatusInfoFrame: React.FC<StatusInfoFrameProps> = ({
  statusInfo,
  status,
}) => {
  const { color, text } = getTagDetail(status, MemTagList);

  return (
    <StatusWrapper>
      <FlexWrapper gap={40} direction="row">
        <TotalCountContainer>
          <Tag color={color}>{text}</Tag>
          <TotalContentsContainer>{statusInfo.Total}명</TotalContentsContainer>
        </TotalCountContainer>
        <StatusCountContainer>
          <Tag color="BLUE">정회원</Tag>
          <StatusContentsContainer>
            {statusInfo.Regular}명
          </StatusContentsContainer>
        </StatusCountContainer>
        <StatusCountContainer>
          <Tag color="GRAY">준회원</Tag>
          <StatusContentsContainer>
            {statusInfo.NonRegular}명
          </StatusContentsContainer>
        </StatusCountContainer>
      </FlexWrapper>
    </StatusWrapper>
  );
};

export default StatusInfoFrame;
