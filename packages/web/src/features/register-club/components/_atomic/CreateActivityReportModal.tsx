import React from "react";

import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import FileUpload from "@sparcs-clubs/web/common/components/FileUpload";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import Select from "@sparcs-clubs/web/common/components/Select";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { mockParticipantData } from "@sparcs-clubs/web/features/manage-club/activity-report/_mock/mock";
import SelectParticipant from "@sparcs-clubs/web/features/manage-club/activity-report/components/SelectParticipant";

interface CreateActivityReportModalProps {
  isOpen: boolean;
  close: VoidFunction;
}

const HorizontalPlacer = styled.div`
  display: flex;
  gap: 32px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CreateActivityReportModal: React.FC<CreateActivityReportModalProps> = ({
  isOpen,
  close,
}) => (
  <Modal isOpen={isOpen}>
    <FlexWrapper direction="column" gap={32}>
      <TextInput label="활동명" placeholder="활동명을 입력해주세요" />
      <HorizontalPlacer>
        <Select
          label="활동 분류"
          items={[
            {
              value: "internal",
              label: "동아리 성격에 합치하는 내부 활동",
              selectable: true,
            },
            {
              value: "external",
              label: "동아리 성격에 합치하는 외부 활동",
              selectable: true,
            },
            {
              value: "none",
              label: "동아리 성격에 합치하지 않는 활동",
              selectable: true,
            },
          ]}
        />
        {/* <DateRangeInput label="활동 기간" /> */}
      </HorizontalPlacer>
      <TextInput label="활동 장소" placeholder="활동 장소를 입력해주세요" />
      <TextInput label="활동 목적" placeholder="활동 목적을 입력해주세요" />
      <TextInput
        area
        label="활동 내용"
        placeholder="활동 내용을 입력해주세요"
      />
      <FlexWrapper direction="column" gap={4}>
        <Typography fs={16} lh={20} fw="MEDIUM" color="BLACK">
          활동 인원
        </Typography>
        <SelectParticipant data={mockParticipantData} />
      </FlexWrapper>
      <FlexWrapper direction="column" gap={4}>
        <Typography fs={16} lh={20} fw="MEDIUM" color="BLACK">
          활동 증빙
        </Typography>
        <TextInput
          area
          placeholder="(선택) 활동 증빙에 대해서 작성하고 싶은 것이 있다면 입력해주세요"
        />
        <FileUpload />
      </FlexWrapper>
      <ButtonWrapper>
        <Button type="outlined" onClick={close}>
          취소
        </Button>
        <Button
          onClick={() => {
            // TODO. 저장 로직 추가
            close();
          }}
        >
          저장
        </Button>
      </ButtonWrapper>
    </FlexWrapper>
  </Modal>
);

export default CreateActivityReportModal;
