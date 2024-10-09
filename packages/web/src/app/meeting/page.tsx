"use client";

import React, { useEffect, useState } from "react";

import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Pagination from "@sparcs-clubs/web/common/components/Pagination";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import {
  MeetingNoticeItem,
  MeetingNoticeTypeEnum,
} from "@sparcs-clubs/web/features/meeting/components/MeetingNoticeItem";
import mockUpMeetingNotice from "@sparcs-clubs/web/features/meeting/services/_mock/mockupMeetingNotice";

const MeetingNoticeListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-self: stretch;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
`;

const MeetingNoticeHeaderWrapper = styled.div`
  display: flex;
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
`;

const MeetingNoticeHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex: 1 0 0;
  opacity: 0.84;
`;

const MeetingNoticeStatusHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
`;

const MeetingNoticeContentHeader = styled.div`
  display: flex;
  flex: 1 0 0;
  justify-content: center;
  align-items: center;
`;

const MeetingNoticeDateHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 84px;
`;

const ListWithPaginationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex: 1;
  align-self: stretch;
`;

interface MeetingNoticeItemType {
  id: number;
  tag: MeetingNoticeTypeEnum;
  title: string;
  date: Date;
}

const MeetingMainFrame: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [mockUpData, setMockUpData] = useState<MeetingNoticeItemType[]>(
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
          <MeetingNoticeHeaderWrapper>
            <MeetingNoticeHeader>
              <MeetingNoticeStatusHeader>
                <Typography fw="REGULAR">상태</Typography>
              </MeetingNoticeStatusHeader>
              <MeetingNoticeContentHeader>
                <Typography fw="REGULAR">회의</Typography>
              </MeetingNoticeContentHeader>
              <MeetingNoticeDateHeader>
                <Typography fw="REGULAR">회의 일자</Typography>
              </MeetingNoticeDateHeader>
            </MeetingNoticeHeader>
          </MeetingNoticeHeaderWrapper>
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
