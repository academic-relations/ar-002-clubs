"use client";

import React from "react";

import {
  MeetingNoticeItem,
  MeetingNoticeTypeEnum,
} from "@sparcs-clubs/web/features/meeting/components/MeetingNoticeItem";

const MeetingMainFrame: React.FC = () => (
  <MeetingNoticeItem tag={MeetingNoticeTypeEnum.Notice} />
);

export default MeetingMainFrame;
