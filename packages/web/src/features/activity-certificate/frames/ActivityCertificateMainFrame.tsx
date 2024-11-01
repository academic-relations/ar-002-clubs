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
  // const { data, isLoading, isError } = useGetUserClubs();
  // console.log(data);

  // TODO. 디폴트 정보 프로필에서 가져오기, 활동기간 api 연결
  const formCtx = useForm<ActivityCertificateInfo>({
    mode: "all",
    defaultValues: {
      isAgreed: false,
      issuedNumber: 1,
      activityDuration: "2021년 9월 ~ 2023년 6월, 2024년 3월 ~",
      applicantName: "이지윤",
      applicantDepartment: "전산학부",
      applicantStudentNumber: "20200510",
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
