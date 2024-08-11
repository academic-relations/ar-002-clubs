"use client";

import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import { MeetingNoticeItem } from "@sparcs-clubs/web/features/meeting/components/MeetingNoticeItem";
import mockUpMeetingNotice from "@sparcs-clubs/web/features/meeting/services/_mock/mockupMeetingNotice";

const MeetingMainFrame: React.FC = () => (
  <FlexWrapper gap={0} direction="column">
    {mockUpMeetingNotice.items.map(e => (
      <MeetingNoticeItem key={e.id} tag={e.tag} title={e.title} date={e.date} />
    ))}
  </FlexWrapper>
);

export default MeetingMainFrame;
