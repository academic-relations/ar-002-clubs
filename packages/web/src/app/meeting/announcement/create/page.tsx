"use client";

import React, { useCallback, useEffect, useState } from "react";

import { ApiMee001RequestBody } from "@sparcs-clubs/interface/api/meeting/apiMee001";
import { UserType } from "@sparcs-clubs/interface/common/enum/user.enum";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import { errorHandler } from "@sparcs-clubs/web/common/components/Modal/ErrorModal";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import { withAuthorization } from "@sparcs-clubs/web/common/components/withAuthorization";
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
    defaultValues: {
      announcementTitle: "",
      announcementContent: "",
    },
  });

  const {
    watch,
    getValues,
    formState: { isValid },
  } = formCtx;

  const meetingEnumId = watch("meetingEnumId");

  const [isTemplateVisible, setIsTemplateVisible] = useState(false);
  const { mutate: createMeeting, isPending: isCreateLoading } =
    useCreateMeeting();

  const submitHandler = useCallback(() => {
    createMeeting(
      { body: { ...getValues() } },
      {
        onSuccess: () => {
          router.replace("/meeting");
        },
        onError: () => errorHandler("생성에 실패하였습니다"),
      },
    );
  }, [createMeeting, getValues, router]);

  useEffect(() => {
    if (meetingEnumId != null) {
      setIsTemplateVisible(false);
    }
  }, [meetingEnumId]);

  return (
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
          <MeetingAnnouncementFrame isTemplateVisible={isTemplateVisible} />
          <ButtonWrapper>
            <Link href="/meeting">
              <Button type={isCreateLoading ? "disabled" : "outlined"}>
                취소
              </Button>
            </Link>
            <Button
              type={
                isValid && !isCreateLoading && isTemplateVisible
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
  );
};

export default withAuthorization(CreateMeetingPage, [UserType.executive]);
