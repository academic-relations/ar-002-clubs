"use client";

import React, { useState } from "react";

import styled from "styled-components";

import Typography from "@sparcs-clubs/web/common/components/Typography";
import { singleSemesterFundingListSectionTitleText } from "@sparcs-clubs/web/constants/manageClubFunding";

import PastFundingListTable from "./PastFundingListTable";

const PastSingleSemesterFundingListSectionInner = styled.div`
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  width: 100%;

  /* Inside auto layout */
  /* flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  z-index: 2; */
`;

const SingleSemesterTitleRow = styled.div`
  /* layout from FoldableSectionTitleInner */
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  width: 100%;
`;

const MoreInfo = styled.div`
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 14px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme }) => theme.colors.BLACK};
  text-decoration-line: underline;
  cursor: pointer;
`;

const mockData: {
  name: string;
  fundings: Array<{
    id: number;
    status: string;
    activityName: string;
    contentName: string;
    expenditureAmount: number;
    approvedAmount?: number;
  }>;
} = {
  name: "2023년 가을학기",
  fundings: [
    {
      id: 1,
      status: "작성중",
      activityName: "개발개발한 어떠한 활동",
      contentName: "모니터",
      expenditureAmount: 300000,
    },
    {
      id: 2,
      status: "작성중",
      activityName: "개발개발한 어떠한 활동",
      contentName: "모니터",
      expenditureAmount: 300000,
    },
    {
      id: 3,
      status: "신청 완료",
      activityName: "개발개발한 어떠한 활동",
      contentName: "모니터",
      expenditureAmount: 300000,
    },
    {
      id: 4,
      status: "신청 반려",
      activityName: "개발개발한 어떠한 활동",
      contentName: "모니터",
      expenditureAmount: 300000,
    },
    {
      id: 5,
      status: "승인 완료",
      activityName: "개발개발한 어떠한 활동",
      contentName: "모니터",
      expenditureAmount: 300000,
      approvedAmount: 300000,
    },
    {
      id: 6,
      status: "승인 완료",
      activityName: "개발개발한 어떠한 활동",
      contentName: "모니터",
      expenditureAmount: 300000,
      approvedAmount: 0,
    },
  ],
};

const PastSingleSemesterFundingListSection: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(true);
  return (
    <PastSingleSemesterFundingListSectionInner>
      <SingleSemesterTitleRow>
        <Typography ff="PRETENDARD" fw="MEDIUM" fs={20} lh={24}>
          {singleSemesterFundingListSectionTitleText(
            mockData.name,
            mockData.fundings.length,
          )}
        </Typography>
        <MoreInfo onClick={() => setToggle(!toggle)}>
          {toggle ? `접기` : `펼치기`}
        </MoreInfo>
      </SingleSemesterTitleRow>
      {toggle ? <PastFundingListTable /> : null}
    </PastSingleSemesterFundingListSectionInner>
  );
};

export default PastSingleSemesterFundingListSection;
