"use client";

import React from "react";

import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";

import PageHead from "@sparcs-clubs/web/common/components/PageHead";

// import { useGetUserClubs } from "../services/getUserClubs";

import { ActivityCertificateInfo } from "../types/activityCertificate";

import ActivityCertificateInfoFrame from "./ActivityCertificateInfoFrame";
import ActivityCertificateNoticeFrame from "./ActivityCertificateNoticeFrame";

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
  const formCtx = useForm<ActivityCertificateInfo>({
    mode: "all",
    defaultValues: {
      isAgreed: false,
      issuedNumber: 1,
      applicantPhoneNumber: "",
      histories: [],
    },
  });

  const { watch } = formCtx;

  const isAgreed = watch("isAgreed");

  return (
    <FormProvider {...formCtx}>
      <form>
        <ActivityCertificatePageMainFrameInner>
          <PageHead
            items={[{ name: "활동확인서 발급", path: "/activity-certificate" }]}
            title="활동확인서 발급"
          />
          {isAgreed ? (
            <ActivityCertificateInfoFrame />
          ) : (
            <ActivityCertificateNoticeFrame />
          )}
        </ActivityCertificatePageMainFrameInner>
      </form>
    </FormProvider>
  );
};

export default ActivityCertificateMainFrame;
