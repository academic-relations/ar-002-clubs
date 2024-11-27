import React from "react";

import styled from "styled-components";

import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { formatDotDate } from "@sparcs-clubs/web/utils/Date/formatDate";

const enum MeetingNoticeTypeEnum {
  Agenda = "Agenda",
  Meeting = "Meeting",
  Notice = "Notice",
}

interface MeetingNoticeItemProps {
  tag: MeetingNoticeTypeEnum;
  title: string;
  date: Date;
  onClick?: VoidFunction;
}

const MeetingNoticeItemWrapper = styled.div`
  display: flex;
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex: 1;
  align-self: stretch;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
`;

const TagWithTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

const LogoWithTagAndTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const MeetingNoticeItem: React.FC<MeetingNoticeItemProps> = ({
  tag,
  title,
  date,
  onClick = () => {},
}) => {
  const tagColor = () => {
    switch (tag) {
      case MeetingNoticeTypeEnum.Agenda:
        return "BLUE";
      case MeetingNoticeTypeEnum.Meeting:
        return "GRAY";
      default:
        return "YELLOW";
    }
  };

  const tagText = () => {
    switch (tag) {
      case MeetingNoticeTypeEnum.Agenda:
        return "안건 공개";
      case MeetingNoticeTypeEnum.Meeting:
        return "회의 종료";
      default:
        return "공고 게시";
    }
  };

  return (
    <MeetingNoticeItemWrapper onClick={onClick}>
      <LogoWithTagAndTitleWrapper>
        <TagWithTitleWrapper>
          <Tag color={tagColor()}>{tagText()}</Tag>
          <Typography
            fs={16}
            lh={24}
            fw="MEDIUM"
            style={{ textOverflow: "ellipsis", overflow: "hidden" }}
          >
            {title}
          </Typography>
        </TagWithTitleWrapper>
      </LogoWithTagAndTitleWrapper>
      <Typography fs={16} lh={24}>
        {formatDotDate(date)}
      </Typography>
    </MeetingNoticeItemWrapper>
  );
};

export { MeetingNoticeItem, MeetingNoticeTypeEnum };
