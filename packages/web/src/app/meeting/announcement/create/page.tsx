"use client";

import React, { useMemo, useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import MeetingAnnouncementFrame from "@sparcs-clubs/web/features/meeting/components/MeetingAnnouncementFrame";
import MeetingInformationFrame from "@sparcs-clubs/web/features/meeting/components/MeetingInformationFrame";
import {
  CreateMeetingModel,
  MeetingInform,
} from "@sparcs-clubs/web/features/meeting/types/meeting";
import { parseDotDate } from "@sparcs-clubs/web/utils/Date/parseDate";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CreateMeetingPage: React.FC = () => {
  const router = useRouter();
  const formCtx = useForm<MeetingInform>({
    mode: "all",
    defaultValues: {
      isRegular: false,
    },
  });

  const {
    resetField,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = formCtx;

  const [isTemplateVisible, setIsTemplateVisible] = useState(false);

  const meetingDetail: CreateMeetingModel | undefined = useMemo(() => {
    if (!isValid || !isTemplateVisible) return undefined;

    const values = getValues();

    if (values.date != null && values.time != null) {
      const [year, month, day] = values.date.split(".").map(part => +part);
      const [hours, minutes] = values.time.split(":").map(part => +part);

      return {
        ...values,
        startDate: new Date(year, month - 1, day, hours, minutes),
        endDate: undefined,
      };
    }
    return {
      ...values,
      startDate: parseDotDate(values.startDate),
      endDate: values.endDate ? parseDotDate(values.endDate) : undefined,
    };
  }, [getValues, isTemplateVisible, isValid]);

  const submitHandler = () => {
    // TODO. 저장 로직 추가
    // const values = meetingDetail ?? getValues();
    // const data = {
    //   meetingType: values.meetingType,
    //   title: getValues().title,
    //   content: getValues().content,
    //   startDate: values.startDate,
    //   isRegular: values.isRegular,
    //   location: values.location,
    // };

    router.replace("/meeting");
  };

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
            readOnly={isTemplateVisible}
            onCreateTemplate={() => {
              setIsTemplateVisible(true);
            }}
          />
          <MeetingAnnouncementFrame
            data={meetingDetail}
            onReset={defaultValue => {
              resetField("content", { defaultValue });
            }}
          />
          <ButtonWrapper>
            <Link href="/meeting">
              <Button type="outlined">취소</Button>
            </Link>
            <Button buttonType="submit" type={isValid ? "default" : "disabled"}>
              저장
            </Button>
          </ButtonWrapper>
        </FlexWrapper>
      </form>
    </FormProvider>
  );
};

export default CreateMeetingPage;
