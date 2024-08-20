import React from "react";

import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { MemTagList } from "@sparcs-clubs/web/constants/tableTagList";
import { MemberStatusEnum } from "@sparcs-clubs/web/features/manage-club/services/_mock/mockManageClub";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

interface StatusInfoFrameProps {
  statusInfo: { Regular: number; NonRegular: number; Total: number };
  status: MemberStatusEnum;
}

const StatusWrapper = styled.div`
  padding-left: 28px;
`;

const TotalCountContationer = styled.div`
  width: 40px;
  height: 24px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const StatusCountContationer = styled.div`
  width: 60px;
  height: 24px;
  align-items: center;
  justify-content: center;
  display: flex;
`;
const StatusInfoFrame: React.FC<StatusInfoFrameProps> = ({
  statusInfo,
  status,
}) => {
  const { color, text } = getTagDetail(status, MemTagList);

  return (
    <StatusWrapper>
      <FlexWrapper gap={40} direction="row">
        <FlexWrapper gap={20} direction="row">
          <Tag color={color}>{text}</Tag>
          <TotalCountContationer>
            <Typography fs={16} lh={20}>
              {statusInfo.Total}명
            </Typography>
          </TotalCountContationer>
        </FlexWrapper>
        <FlexWrapper gap={20} direction="row">
          <Tag color="BLUE">정회원</Tag>
          <StatusCountContationer>
            <Typography fs={16} lh={20}>
              {statusInfo.Regular}명
            </Typography>
          </StatusCountContationer>
        </FlexWrapper>
        <FlexWrapper gap={20} direction="row">
          <Tag color="GRAY">준회원</Tag>
          <StatusCountContationer>
            <Typography fs={16} lh={20}>
              {statusInfo.NonRegular}명
            </Typography>
          </StatusCountContationer>
        </FlexWrapper>
      </FlexWrapper>
    </StatusWrapper>
  );
};

export default StatusInfoFrame;
