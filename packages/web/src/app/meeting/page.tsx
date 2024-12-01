"use client";

import React, { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Pagination from "@sparcs-clubs/web/common/components/Pagination";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { MeetingNoticeItem } from "@sparcs-clubs/web/features/meeting/components/MeetingNoticeItem";
import useGetMeetings from "@sparcs-clubs/web/features/meeting/services/useGetMeetings";
import {
  getMeetingEnumFromValue,
  meetingEnumToText,
  MeetingNoticeItemType,
} from "@sparcs-clubs/web/features/meeting/types/meeting";

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

const MeetingMainFrame: React.FC = () => {
  const limit = 10;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const meetingEnumId = getMeetingEnumFromValue(searchParams.get("type"));

  const { data, isLoading, isError } = useGetMeetings({
    meetingEnumId,
    pageOffset: page,
    itemCount: limit,
  });

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <FlexWrapper gap={60} direction="column">
        <PageHead
          items={[
            {
              name: meetingEnumId
                ? meetingEnumToText(meetingEnumId.toString())
                : "전체 회의",
              path: `/meeting?type=${meetingEnumId}`,
            },
          ]}
          title={
            meetingEnumId
              ? meetingEnumToText(meetingEnumId.toString())
              : "전체 회의"
          }
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
            {data?.items.map((e: MeetingNoticeItemType) => (
              <MeetingNoticeItem
                key={e.id}
                data={e}
                onClick={() => router.push(`/meeting/${e.id}`)}
              />
            ))}
          </MeetingNoticeListWrapper>
          <Pagination
            totalPage={data ? Math.ceil(data.total / limit) : 0}
            currentPage={page}
            limit={limit}
            setPage={setPage}
          />
        </ListWithPaginationWrapper>
      </FlexWrapper>
    </AsyncBoundary>
  );
};

export default MeetingMainFrame;
