"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { UserTypeEnum } from "@sparcs-clubs/interface/common/enum/user.enum";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Icon from "@sparcs-clubs/web/common/components/Icon";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Pagination from "@sparcs-clubs/web/common/components/Pagination";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";
import { MeetingNoticeItem } from "@sparcs-clubs/web/features/meeting/components/MeetingNoticeItem";
import {
  MEETING_LIST_PAGINATION_LIMIT,
  MEETING_PATH,
} from "@sparcs-clubs/web/features/meeting/constants";
import useGetMeetings from "@sparcs-clubs/web/features/meeting/services/useGetMeetings";
import {
  getMeetingEnumFromValue,
  meetingEnumToText,
  MeetingNoticeItemType,
} from "@sparcs-clubs/web/features/meeting/types/meeting";
import colors from "@sparcs-clubs/web/styles/themes/colors";

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

const IconWrapper = styled.div`
  margin-top: 2px;
`;

const StyledButton = styled(Button)`
  gap: 4px;
`;

const MeetingMainFrame: React.FC = () => {
  const { isLoggedIn, profile } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn !== undefined || profile !== undefined) {
      setAuthLoading(false);
    }
  }, [isLoggedIn, profile]);

  const meetingEnumId = getMeetingEnumFromValue(searchParams.get("type"));

  const { data, isLoading, isError } = useGetMeetings({
    meetingEnumId,
    pageOffset: page,
    itemCount: MEETING_LIST_PAGINATION_LIMIT,
  });

  // const {
  //   data: divisionHeadsData,
  //   isLoading: divisionHeadsIsLoading,
  //   isError: divisionHeadsIsError,
  // } = useGetDivisionHeads();

  const divisionHeadsData = {
    divisions: [
      { id: 1, name: "주영미", presidentStudentNumber: 20221234 },
      {
        id: 2,
        name: "하승종",
        presidentStudentNumber: 20223424,
      },
      {
        id: 3,
        name: "권혁원",
        presidentStudentNumber: 20228344,
      },
    ],
  };
  const divisionHeadsIsLoading = false;
  const divisionHeadsIsError = false;
  // TODO : API 호출의 문제를 해결하여 코드 대체

  const isDivisionHead = divisionHeadsData?.divisions.some(
    (head: { id: number; name: string; presidentStudentNumber: number }) =>
      head.presidentStudentNumber === profile?.id,
  ); // TODO : API 호출 결과는 학번이고, profile?.id는 고유 ID 아닌가?

  if (authLoading) {
    return <AsyncBoundary isLoading={authLoading} isError />;
  }

  return (
    <AsyncBoundary
      isLoading={isLoading || divisionHeadsIsLoading}
      isError={isError || divisionHeadsIsError}
    >
      <FlexWrapper gap={60} direction="column">
        <PageHead
          items={[
            {
              name: meetingEnumId
                ? meetingEnumToText(meetingEnumId.toString())
                : "전체 회의",
              path: MEETING_PATH(meetingEnumId),
            },
          ]}
          title={
            meetingEnumId
              ? meetingEnumToText(meetingEnumId.toString())
              : "전체 회의"
          }
          action={
            ((profile?.type === UserTypeEnum.Executive &&
              meetingEnumId !== 4) ||
              (isDivisionHead &&
                meetingEnumId !== 1 &&
                meetingEnumId !== 2 &&
                meetingEnumId !== 3)) && (
              <StyledButton>
                <IconWrapper>
                  <Icon type="add" size={16} color={colors.WHITE} />
                </IconWrapper>
                공고 생성
              </StyledButton>
            )
          }
        />
        <ListWithPaginationWrapper>
          <MeetingNoticeListWrapper>
            <MeetingNoticeHeaderWrapper>
              <MeetingNoticeHeader>
                <MeetingNoticeStatusHeader>
                  <Typography>상태</Typography>
                </MeetingNoticeStatusHeader>
                <MeetingNoticeContentHeader>
                  <Typography>회의</Typography>
                </MeetingNoticeContentHeader>
                <MeetingNoticeDateHeader>
                  <Typography>회의 일자</Typography>
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
            totalPage={
              data ? Math.ceil(data.total / MEETING_LIST_PAGINATION_LIMIT) : 0
            }
            currentPage={page}
            limit={MEETING_LIST_PAGINATION_LIMIT}
            setPage={setPage}
          />
        </ListWithPaginationWrapper>
      </FlexWrapper>
    </AsyncBoundary>
  );
};

export default MeetingMainFrame;
