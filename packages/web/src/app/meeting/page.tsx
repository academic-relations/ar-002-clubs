"use client";

import React from "react";

import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import { MeetingNoticeItem } from "@sparcs-clubs/web/features/meeting/components/MeetingNoticeItem";
import mockUpMeetingNotice from "@sparcs-clubs/web/features/meeting/services/_mock/mockupMeetingNotice";

const MeetingNoticeListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
  border-top: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
`;

const MeetingMainFrame: React.FC = () => (
  <FlexWrapper gap={60} direction="column">
    <PageHead
      items={[{ name: "전체 회의", path: "/meeting" }]}
      title="전체 회의"
    />
    <MeetingNoticeListWrapper>
      {mockUpMeetingNotice.items.map(e => (
        <MeetingNoticeItem
          key={e.id}
          tag={e.tag}
          title={e.title}
          date={e.date}
        />
      ))}
    </MeetingNoticeListWrapper>
  </FlexWrapper>
);

export default MeetingMainFrame;
