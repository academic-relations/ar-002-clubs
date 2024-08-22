import React from "react";

import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Tag from "@sparcs-clubs/web/common/components/Tag";

interface StatusInfoFrameProps {
  statusInfo: { Regular: number; NonRegular: number; Total: number };
}

const StatusWrapper = styled.div`
  padding-left: 28px;
`;

const TotalCountContationer = styled.div`
  width: 120px;
  height: 24px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const StatusCountContationer = styled.div`
  width: 160px;
  height: 24px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const StatusContentsContationer = styled.div`
  width: 60px;
  height: 24px;
  justify-content: center;
  align-items: center;
  display: flex;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
`;

const TotalContentsContationer = styled.div`
  width: 40px;
  height: 24px;
  justify-content: center;
  align-items: center;
  display: flex;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
`;

const TotalTitleContatiner = styled.div`
  width: fit-content;
  padding: 4px 12px;
  height: 24px;
  justify-content: center;
  align-items: center;
  display: flex;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
`;

const TotalInfoFrame: React.FC<StatusInfoFrameProps> = ({ statusInfo }) => (
  <StatusWrapper>
    <FlexWrapper gap={40} direction="row">
      <TotalCountContationer>
        <TotalTitleContatiner>전체</TotalTitleContatiner>
        <TotalContentsContationer>
          {statusInfo.Total}명
        </TotalContentsContationer>
      </TotalCountContationer>
      <StatusCountContationer>
        <Tag color="BLUE">정회원</Tag>
        <StatusContentsContationer>
          {statusInfo.Regular}명
        </StatusContentsContationer>
      </StatusCountContationer>
      <StatusCountContationer>
        <Tag color="GRAY">준회원</Tag>
        <StatusContentsContationer>
          {statusInfo.NonRegular}명
        </StatusContentsContationer>
      </StatusCountContationer>
    </FlexWrapper>
  </StatusWrapper>
);

export default TotalInfoFrame;