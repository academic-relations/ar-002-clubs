import React, { useCallback, useEffect } from "react";

import { ApiAct003RequestBody } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct003";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import { useGetActivityReport } from "@sparcs-clubs/web/features/manage-club/activity-report/services/useGetActivityReport";

import ActivityReportForm from "@sparcs-clubs/web/features/register-club/components/_atomic/ActivityReportForm";
import usePutActivityReportForNewClub from "@sparcs-clubs/web/features/register-club/services/usePutActivityReportForNewClub";

const ActivityReportMainFrameInner = styled.div`
  align-items: flex-start;
  gap: 60px;
  width: 100%;
`;

// TODO. 활동기간 리스트 추가, 파일업로드 추가
const ActivityReportEditFrame: React.FC<{ id: string }> = ({ id }) => {
  const formCtx = useForm<ApiAct003RequestBody>({ mode: "all" });

  const { data, isLoading, isError } = useGetActivityReport(
    "undergraduate",
    Number(id),
  );

  const router = useRouter();

  useEffect(() => {
    if (data) {
      /* NOTE: (@dora) request body of put should not include clubId */
      formCtx.reset({
        name: data.name,
        activityTypeEnumId: data.activityTypeEnumId,
        durations: data.durations,
        location: data.location,
        purpose: data.purpose,
        detail: data.detail,
        evidence: data.evidence,
        evidenceFiles: data.evidenceFiles,
        participants: data.participants,
      });
      /* TODO: (@dora) refactor to use lodash */
      // formCtx.reset(_.omit(activityReportData, "clubId"));
    }
  }, [data, formCtx]);

  const { mutate } = usePutActivityReportForNewClub();

  const submitHandler = useCallback(
    (_data: ApiAct003RequestBody, e: React.BaseSyntheticEvent) => {
      e.preventDefault();
      mutate(
        {
          params: { activityId: Number(id) },
          body: {
            ..._data,
            durations: _data.durations.map(({ startTerm, endTerm }) => ({
              startTerm,
              endTerm,
            })),
            participants: _data.participants.map(({ studentId }) => ({
              studentId,
            })),
          },
        },
        {
          onSuccess: () => {
            router.push("/manage-club/activity-report");
          },
        },
      );
    },
    [id, router, mutate],
  );

  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    formCtx.handleSubmit(_data => submitHandler(_data, e))();
  };

  if (!data) return null;

  return (
    <ActivityReportMainFrameInner>
      <PageHead
        items={[
          { name: "대표 동아리 관리", path: "/manage-club" },
          { name: "활동 보고서", path: "/manage-club/activity-report" },
        ]}
        title="활동 보고서 작성"
        enableLast
      />
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        <ActivityReportForm
          /* eslint-disable  @typescript-eslint/no-explicit-any */
          clubId={data.clubId}
          formCtx={formCtx as any}
          onCancel={() => {}}
          onSubmit={handleSubmit}
          asModal={false}
        />
      </AsyncBoundary>
    </ActivityReportMainFrameInner>
  );
};

export default ActivityReportEditFrame;
