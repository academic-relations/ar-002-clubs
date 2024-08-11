"use client";

import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import {
  MeetingNoticeItem,
  MeetingNoticeTypeEnum,
} from "@sparcs-clubs/web/features/meeting/components/MeetingNoticeItem";

const MeetingMainFrame: React.FC = () => (
  <FlexWrapper direction="column">
    <MeetingNoticeItem tag={MeetingNoticeTypeEnum.Agenda} />
    <MeetingNoticeItem tag={MeetingNoticeTypeEnum.Meeting} />
    <MeetingNoticeItem tag={MeetingNoticeTypeEnum.Notice} />
  </FlexWrapper>
);

export default MeetingMainFrame;
