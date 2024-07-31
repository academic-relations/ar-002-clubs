import React from "react";

import { overlay } from "overlay-kit";

import TextButton from "@sparcs-clubs/web/common/components/Buttons/TextButton";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";

import Typography from "@sparcs-clubs/web/common/components/Typography";

import { MeetingDetail } from "../types/meeting";

interface MeetingAnnouncementFrameProps {
  data?: MeetingDetail;
}

const MeetingAnnouncementFrame: React.FC<MeetingAnnouncementFrameProps> = ({
  data = undefined,
}) => {
  const openResetModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <CancellableModalContent
          onConfirm={() => {
            // TODO. 초기화 로직 추가
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
      <Card outline gap={32} style={{ marginLeft: 24, alignItems: "end" }}>
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
            <TextInput label="제목" placeholder="" value={data.title} />
            <TextInput
              label="본문"
              placeholder=""
              value={data.content}
              area
              style={{
                height: 596,
                whiteSpace: "pre-line",
              }}
            />
            <TextButton text="초기화" onClick={openResetModal} />
          </>
        )}
      </Card>
    </FlexWrapper>
  );
};

export default MeetingAnnouncementFrame;
