"use client";

import React, { useState } from "react";

import styled from "styled-components";


import PageHead from "@sparcs-clubs/web/common/components/PageHead";


import {
  ActivityCertificateInterface,
  ActivityCertificateProgress,
  FirstErrorStatus,
  SecondErrorStatus,
} from "../types/activityCertificate";


import ActivityCertificateNoticeFrame from "./ActivityCertificateNoticeFrame";
import ActivityCertificateInfoFrame from "./ActivityCertificateInfoFrame";
import { useGetUserClubs } from "../services/getUserClubs";


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
  const { data, isLoading, isError } = useGetUserClubs();
  console.log(data);

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
      applicant: "스팍스",
      department: "전산학부",
      studentNumber: "20240000",
      krPhoneNumber: "000-0000-0000",
      issuedNumber: null,
      startMonth: "2023.02",
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

      <PageHead
        items={[{ name: "활동확인서 발급", path: "/activity-certificate" }]}
        title="활동확인서 발급"
      />
      {activityCertificateProgress.agreement ? (
        <ActivityCertificateInfoFrame {...props} />
      ) : (
        <ActivityCertificateNoticeFrame {...props} />
      )}

    </ActivityCertificatePageMainFrameInner>
  );
};

export default ActivityCertificateMainFrame;
