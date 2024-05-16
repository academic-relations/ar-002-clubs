"use client";

import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";
import React, { useState } from "react";
import styled from "styled-components";
import {
  ActivityCertificateInterface,
  ActivityCertificateProgress,
  FirstErrorStatus,
  SecondErrorStatus,
} from "../types/activityCertificate";
import ActivityCertificateNoticeFrame from "./ActivityCertificateNoticeFrame";
import ActivityCertificateInfoFrame from "./ActivityCertificateInfoFrame";

const ActivityCertificatePageMainFrameInner = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 60px;
  display: inline-flex;
`;

const ActivityCertificateMainFrame: React.FC = () => {
  const [activityCertificateProgress, setActivityCertificateProgress] =
    useState<ActivityCertificateProgress>({
      agreement: false,
      firstFilled: false,
      firstNoError: false,
      secondFilled: false,
      secondNoError: false,
    });
  const [activityCertificate, setActivityCertificate] =
    useState<ActivityCertificateInterface>({
      clubId: null,
      applicant: null,
      department: null,
      studentNumber: null,
      krPhoneNumber: "",
      issuedNumber: null,
      startMonth: "2024.02",
      endMonth: "2024.04",
      detail: [
        {
          key: 0,
          startMonth: "",
          endMonth: "",
          description: "",
        },
      ],
    });
  const [firstErrorStatus, setFirstErrorStatus] = useState<FirstErrorStatus>({
    hasClubIdError: false,
    hasIssuedNumberError: false,
    hasKrPhoneNumberError: false,
  });
  const [secondErrorStatus, setSecondErrorStatus] = useState<
    Array<SecondErrorStatus>
  >([
    {
      key: 0,
      hasStartEndMonthError: false,
      hasDescriptionError: false,
    },
  ]);

  const props = {
    activityCertificate,
    setActivityCertificate,
    activityCertificateProgress,
    setActivityCertificateProgress,
    firstErrorStatus,
    setFirstErrorStatus,
    secondErrorStatus,
    setSecondErrorStatus,
  };

  return (
    <ActivityCertificatePageMainFrameInner>
      <PageTitle>활동확인서 발급</PageTitle>
      {activityCertificateProgress.agreement ? (
        <ActivityCertificateInfoFrame {...props} />
      ) : (
        <ActivityCertificateNoticeFrame {...props} />
      )}
    </ActivityCertificatePageMainFrameInner>
  );
};

export default ActivityCertificateMainFrame;
