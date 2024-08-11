import React from "react";

import Image from "next/image";

import styled from "styled-components";

import logoSvg from "@sparcs-clubs/web/assets/logo-icon.svg";
import arrowSvg from "@sparcs-clubs/web/assets/subdir-arrow-right.svg";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";

const enum MeetingNoticeTypeEnum {
  Agenda = "Agenda",
  Meeting = "Meeting",
  Notice = "Notice",
}

interface MeetingNoticeItemProps {
  tag: MeetingNoticeTypeEnum;
}

const MeetingNoticeItemWrapper = styled.div`
  display: flex;
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex: 1 0 0;
  align-self: stretch;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
`;

const TagWithTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
`;

const LogoWrapper = styled.div`
  display: flex;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const LogoWithTagAndTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex: 1 0 0;
`;

const MeetingNoticeItem: React.FC<MeetingNoticeItemProps> = ({ tag }) => {
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

  const logoType = () => {
    switch (tag) {
      case MeetingNoticeTypeEnum.Notice:
        return logoSvg;
      default:
        return arrowSvg;
    }
  };

  return (
    <MeetingNoticeItemWrapper>
      <LogoWithTagAndTitleWrapper>
        <LogoWrapper>
          <Image src={logoType()} />
        </LogoWrapper>
        <TagWithTitleWrapper>
          <Tag color={tagColor()}>{tagText()}</Tag>
          <Typography
            fs={16}
            lh={24}
            fw="MEDIUM"
            style={{ textOverflow: "ellipsis", overflow: "hidden" }}
          >
            2024년 제11차 운영위원회 (8월, 임시회)
          </Typography>
        </TagWithTitleWrapper>
      </LogoWithTagAndTitleWrapper>
      <Typography fs={16} lh={24}>
        2024.07.22
      </Typography>
    </MeetingNoticeItemWrapper>
  );
};

export { MeetingNoticeTypeEnum, MeetingNoticeItem };
