"use client";

import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";
import React from "react";
import styled from "styled-components";
import { ActivityCertificateInterface } from "../types/activityCertificate";
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
  const [activityCertificate, setActivityCertificate] =
    React.useState<ActivityCertificateInterface>({
      agreement: false,
    });
  const props = { activityCertificate, setActivityCertificate };
  return (
    <ActivityCertificatePageMainFrameInner>
      <PageTitle>활동확인서 발급</PageTitle>
      {activityCertificate.agreement ? (
        <ActivityCertificateInfoFrame {...props} />
      ) : (
        <ActivityCertificateNoticeFrame {...props} />
      )}
    </ActivityCertificatePageMainFrameInner>
  );
};

export default ActivityCertificateMainFrame;
