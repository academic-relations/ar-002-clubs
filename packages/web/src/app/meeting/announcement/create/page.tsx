"use client";

import React, { useCallback, useMemo, useState } from "react";

import { ApiMee001RequestBody } from "@sparcs-clubs/interface/api/meeting/apiMee001";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import MeetingAnnouncementFrame from "@sparcs-clubs/web/features/meeting/components/MeetingAnnouncementFrame";
import MeetingInformationFrame from "@sparcs-clubs/web/features/meeting/components/MeetingInformationFrame";
import useCreateMeeting from "@sparcs-clubs/web/features/meeting/services/useCreateMeeting";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CreateMeetingPage: React.FC = () => {
  const router = useRouter();
  const formCtx = useForm<ApiMee001RequestBody>({
    mode: "all",
  });

  const {
    resetField,
    getValues,
    handleSubmit,
    watch,
    formState: { isValid },
  } = formCtx;

  const announcementTitle = watch("announcementTitle");
  const announcementContent = watch("announcementContent");

  const [isTemplateVisible, setIsTemplateVisible] = useState(false);

  const { mutate: createMeeting, isPending: isCreateLoading } =
    useCreateMeeting();

  const isFormValid = useMemo(
    () => isValid && announcementTitle != null && announcementContent != null,
    [announcementContent, announcementTitle, isValid],
  );

  const submitHandler = useCallback(() => {
    createMeeting(
      { body: { ...getValues() } },
      {
        onSuccess: () => {
          router.replace("/meeting");
        },
      },
    );
  }, [createMeeting, getValues, router]);

  return (
    <FormProvider {...formCtx}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <FlexWrapper direction="column" gap={60}>
          <PageHead
            items={[
              {
                name: `의결기구`,
                path: `/meeting`,
              },
              {
                name: `공고 작성`,
                path: `/meeting/announcement/create`,
              },
            ]}
            title="공고 작성"
          />
          <MeetingInformationFrame
            onCreateTemplate={() => {
              setIsTemplateVisible(true);
            }}
          />
          <MeetingAnnouncementFrame
            isTemplateVisible={isTemplateVisible}
            onReset={defaultValue => {
              resetField("announcementContent", { defaultValue });
            }}
          />
          <ButtonWrapper>
            <Link href="/meeting">
              <Button type={isCreateLoading ? "disabled" : "outlined"}>
                취소
              </Button>
            </Link>
            <Button
              buttonType="submit"
              type={isFormValid && !isCreateLoading ? "default" : "disabled"}
            >
              저장
            </Button>
          </ButtonWrapper>
        </FlexWrapper>
      </form>
    </FormProvider>
  );
};

export default CreateMeetingPage;
