import React from "react";

import Image from "next/image";

import styled from "styled-components";

import logoSvg from "@sparcs-clubs/web/assets/logo-icon.svg";
import Icon from "@sparcs-clubs/web/common/components/Icon";
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

const ClubsLogoWrapper = styled.div`
  display: flex;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ArrowLogoWrapper = styled.div`
  display: flex;
  width: 32px;
  height: 32px;
  padding-top: 4px;
  justify-content: flex-end;
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
}) => {
  const tagColor = () => {
    switch (tag) {
      case MeetingNoticeTypeEnum.Agenda:
        return "GREEN";
      case MeetingNoticeTypeEnum.Meeting:
        return "BLUE";
      default:
        return "YELLOW";
    }
  };

  const tagText = () => {
    switch (tag) {
      case MeetingNoticeTypeEnum.Agenda:
        return "안건";
      case MeetingNoticeTypeEnum.Meeting:
        return "회의";
      default:
        return "공고";
    }
  };

  return (
    <MeetingNoticeItemWrapper>
      <LogoWithTagAndTitleWrapper>
        {tag === MeetingNoticeTypeEnum.Notice ? (
          <ClubsLogoWrapper>
            <Image src={logoSvg} alt="clubs-logo" />
          </ClubsLogoWrapper>
        ) : (
          <ArrowLogoWrapper>
            <Icon type="subdirectory_arrow_right" size={20} />
          </ArrowLogoWrapper>
        )}
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

export { MeetingNoticeTypeEnum, MeetingNoticeItem };
