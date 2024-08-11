"use client";

import React, { useEffect, useState } from "react";

import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Pagination from "@sparcs-clubs/web/common/components/Pagination";
import {
  MeetingNoticeItem,
  MeetingNoticeTypeEnum,
} from "@sparcs-clubs/web/features/meeting/components/MeetingNoticeItem";
import mockUpMeetingNotice from "@sparcs-clubs/web/features/meeting/services/_mock/mockupMeetingNotice";

const MeetingNoticeListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
  border-top: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
`;

const ListWithPaginationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex: 1 0 0;
  align-self: stretch;
`;

interface MockUpDataType {
  id: number;
  tag: MeetingNoticeTypeEnum;
  title: string;
  date: Date;
}

const MeetingMainFrame: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [mockUpData, setMockUpData] = useState<MockUpDataType[]>(
    mockUpMeetingNotice.items.slice(0, 12),
  );

  useEffect(() => {
    setMockUpData(mockUpMeetingNotice.items.slice((page - 1) * 12, page * 12));
  }, [page]);

  return (
    <FlexWrapper gap={60} direction="column">
      <PageHead
        items={[{ name: "전체 회의", path: "/meeting" }]}
        title="전체 회의"
      />
      <ListWithPaginationWrapper>
        <MeetingNoticeListWrapper>
          {mockUpData.map(e => (
            <MeetingNoticeItem
              key={e.id}
              tag={e.tag}
              title={e.title}
              date={e.date}
            />
          ))}
        </MeetingNoticeListWrapper>
        <Pagination
          totalPage={Math.ceil(mockUpMeetingNotice.items.length / 12)}
          currentPage={page}
          limit={10}
          setPage={setPage}
        />
      </ListWithPaginationWrapper>
    </FlexWrapper>
  );
};

export default MeetingMainFrame;
