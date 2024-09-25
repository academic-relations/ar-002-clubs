import React, { useEffect, useMemo } from "react";

import { ApiMee001RequestBody } from "@sparcs-clubs/interface/api/meeting/apiMee001";
import { MeetingEnum } from "@sparcs-clubs/interface/common/enum/meeting.enum";
import { overlay } from "overlay-kit";

import { useFormContext } from "react-hook-form";
import styled from "styled-components";

import TextButton from "@sparcs-clubs/web/common/components/Buttons/TextButton";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FormController from "@sparcs-clubs/web/common/components/FormController";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";

import Typography from "@sparcs-clubs/web/common/components/Typography";

import { MeetingTemplate } from "../constants/meetingTemplate";

interface MeetingAnnouncementFrameProps {
  isTemplateVisible: boolean;
  onReset?: (defaultValue: string) => void;
}

const AlignEnd = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const MeetingAnnouncementFrame: React.FC<MeetingAnnouncementFrameProps> = ({
  isTemplateVisible = false,
  onReset = _ => {},
}) => {
  const formCtx = useFormContext<ApiMee001RequestBody>();
  const { getValues, control, watch, resetField } = formCtx;

  const meetingEnumId = watch("meetingEnumId");

  const template = useMemo(() => {
    if (meetingEnumId == null) return null;

    if (meetingEnumId === MeetingEnum.divisionMeeting) {
      return MeetingTemplate.divisionMeetingTemplate();
    }
    return MeetingTemplate.defaultTemplate({ ...getValues(), count: 1 });
  }, [getValues, meetingEnumId]);

  const contentLength = template?.content.split(/\r\n|\r|\n/).length;

  const openResetModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <CancellableModalContent
          onConfirm={() => {
            onReset(template?.content ?? "");
            close();
          }}
          onClose={close}
        >
          공고 템플릿에 수정사항이 있을 경우 모두 초기화됩니다.
          <br />
          ㄱㅊ?
        </CancellableModalContent>
      </Modal>
    ));
  };

  useEffect(() => {
    if (template != null) {
      resetField("announcementTitle", { defaultValue: template.title });
      resetField("announcementContent", { defaultValue: template.content });
    }
  }, [resetField, template]);

  return (
    <FlexWrapper direction="column" gap={40}>
      <SectionTitle>최종 공고</SectionTitle>
      <Card outline gap={32} style={{ marginLeft: 24 }}>
        {!isTemplateVisible || template == null ? (
          <Typography
            fs={16}
            lh={24}
            fw="REGULAR"
            color="GRAY.300"
            style={{ textAlign: "center" }}
          >
            공고 템플릿을 생성해주세요
          </Typography>
        ) : (
          <>
            <FormController
              name="announcementTitle"
              required
              control={control}
              defaultValue={template?.title}
              renderItem={props => (
                <TextInput {...props} label="제목" placeholder="" />
              )}
            />
            <FormController
              name="announcementContent"
              required
              control={control}
              defaultValue={template?.content}
              renderItem={props => (
                <TextInput
                  {...props}
                  label="본문"
                  placeholder=""
                  area
                  style={{
                    height: contentLength ? contentLength * 25 : 100,
                    whiteSpace: "pre-line",
                  }}
                />
              )}
            />
            <AlignEnd>
              <TextButton text="초기화" onClick={openResetModal} />
            </AlignEnd>
          </>
        )}
      </Card>
    </FlexWrapper>
  );
};

export default MeetingAnnouncementFrame;
