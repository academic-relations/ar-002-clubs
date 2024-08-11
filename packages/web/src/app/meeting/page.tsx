"use client";

import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import {
  MeetingNoticeItem,
  MeetingNoticeTypeEnum,
} from "@sparcs-clubs/web/features/meeting/components/MeetingNoticeItem";

const MeetingMainFrame: React.FC = () => (
  <FlexWrapper gap={0} direction="column">
    <MeetingNoticeItem tag={MeetingNoticeTypeEnum.Notice} />
    <MeetingNoticeItem tag={MeetingNoticeTypeEnum.Agenda} />
    <MeetingNoticeItem tag={MeetingNoticeTypeEnum.Meeting} />
  </FlexWrapper>
);

export default MeetingMainFrame;
