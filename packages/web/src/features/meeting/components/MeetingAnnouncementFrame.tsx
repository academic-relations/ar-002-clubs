import React from "react";

import { overlay } from "overlay-kit";

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
import { MeetingDetail } from "../types/meeting";

interface MeetingAnnouncementFrameProps {
  data?: MeetingDetail;
  onReset?: (defaultValue: string) => void;
}

const AlignEnd = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const MeetingAnnouncementFrame: React.FC<MeetingAnnouncementFrameProps> = ({
  data = undefined,
  onReset = _ => {},
}) => {
  const getTemplate = () => {
    if (data == null) return null;

    if (data?.meetingType === "분과회의") {
      return MeetingTemplate.SubcommitteeMeetingTemplate(data);
    }
    return MeetingTemplate.defaultTemplate(data);
  };

  const contentLength = getTemplate()?.content.split(/\r\n|\r|\n/).length;

  const openResetModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <CancellableModalContent
          onConfirm={() => {
            onReset(getTemplate()?.content ?? "");
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

  return (
    <FlexWrapper direction="column" gap={40}>
      <SectionTitle>최종 공고</SectionTitle>
      <Card outline gap={32} style={{ marginLeft: 24 }}>
        {data == null ? (
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
              name="title"
              required
              defaultValue={getTemplate()?.title}
              renderItem={props => (
                <TextInput
                  {...props}
                  label="제목"
                  placeholder=""
                  defaultValue={getTemplate()?.title}
                />
              )}
            />
            <FormController
              name="content"
              required
              defaultValue={getTemplate()?.content}
              renderItem={props => (
                <TextInput
                  {...props}
                  label="본문"
                  placeholder=""
                  defaultValue={getTemplate()?.content}
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
