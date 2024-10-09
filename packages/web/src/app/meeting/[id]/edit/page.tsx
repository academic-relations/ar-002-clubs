"use client";

import React, { useEffect, useMemo } from "react";

import apiMee002 from "@sparcs-clubs/interface/api/meeting/apiMee002";
import { ApiMee003RequestBody } from "@sparcs-clubs/interface/api/meeting/apiMee003";

import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import { errorHandler } from "@sparcs-clubs/web/common/components/Modal/ErrorModal";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import { withAuthorization } from "@sparcs-clubs/web/common/components/withAuthorization";
import MeetingAnnouncementFrame from "@sparcs-clubs/web/features/meeting/components/MeetingAnnouncementFrame";
import MeetingInformationFrame from "@sparcs-clubs/web/features/meeting/components/MeetingInformationFrame";
import useGetMeetingDetail from "@sparcs-clubs/web/features/meeting/services/useGetMeetingDetail";
import useUpdateMeeting from "@sparcs-clubs/web/features/meeting/services/useUpdateMeeting";
import { UserType } from "@sparcs-clubs/web/utils/getUserType";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EditMeetingPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const formCtx = useForm<ApiMee003RequestBody>({
    mode: "all",
  });

  const {
    getValues,
    watch,
    reset,
    formState: { isValid },
  } = formCtx;

  const announcementTitle = watch("announcementTitle");
  const announcementContent = watch("announcementContent");

  const { data, isLoading, isError, isSuccess } = useGetMeetingDetail(+id);
  const { mutate: updateMeeting, isPending: isUpdateLoading } =
    useUpdateMeeting();

  const isFormValid = useMemo(
    () => isValid && announcementTitle != null && announcementContent != null,
    [announcementContent, announcementTitle, isValid],
  );

  const submitHandler = () => {
    updateMeeting(
      {
        requestParam: { announcementId: +id },
        body: {
          ...getValues(),
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [apiMee002.url(+id)] });
          router.replace(`/meeting/${id}`);
        },
        onError: () => errorHandler("수정에 실패하였습니다"),
      },
    );
  };

  useEffect(() => {
    if (isSuccess) {
      reset(data);
    }
  }, [data, isSuccess, reset]);

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <FormProvider {...formCtx}>
        <form>
          <FlexWrapper direction="column" gap={60}>
            <PageHead
              items={[
                {
                  name: `의결기구`,
                  path: `/meeting`,
                },
                {
                  name: `공고 수정`,
                  path: `/meeting/${id}/edit`,
                },
              ]}
              title="공고 수정"
            />
            <MeetingInformationFrame />
            <MeetingAnnouncementFrame isTemplateVisible isEditMode />
            <ButtonWrapper>
              <Button
                type={isUpdateLoading ? "disabled" : "default"}
                onClick={() => router.replace(`/meeting/${id}`)}
              >
                취소
              </Button>
              <Button
                type={
                  isFormValid && !isLoading && !isUpdateLoading
                    ? "default"
                    : "disabled"
                }
                // submit 재확인 모달 추가되면 form handleSubmit으로 관리
                onClick={submitHandler}
              >
                저장
              </Button>
            </ButtonWrapper>
          </FlexWrapper>
        </form>
      </FormProvider>
    </AsyncBoundary>
  );
};

export default withAuthorization(EditMeetingPage, [UserType.executive], -1);
