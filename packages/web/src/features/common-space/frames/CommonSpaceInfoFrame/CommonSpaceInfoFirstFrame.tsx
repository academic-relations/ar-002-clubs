import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "@sparcs-clubs/web/common/components/Card";
import Select, {
  SelectItem,
} from "@sparcs-clubs/web/common/components/Forms/Select";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import PhoneInput from "@sparcs-clubs/web/common/components/Forms/PhoneInput";
import { CommonSpaceFrameProps } from "../CommonSpaceNoticeFrame";

const StyledCard = styled(Card)<{ type: string }>`
  padding: 32px;
  gap: 40px;
  align-self: stretch;
`;

const CommonSpaceInfoFirstFrame: React.FC<
  CommonSpaceFrameProps & { setNextEnabled: (enabled: boolean) => void }
> = ({ setNextEnabled, commonSpace, setCommonSpace }) => {
  const mockName = "스팍스";
  const mockPhone = "000-0000-0000";
  const mockClubList: SelectItem[] = [
    { label: "동아리", value: "1", selectable: true },
    { label: "또다른동아리", value: "2", selectable: true },
    { label: "안되는동아리", value: "3", selectable: false },
  ];

  // TODO: 이름 전화번호 동아리 목록 백에서 받아오기

  const [phone, setPhone] = useState(mockPhone);
  const [hasPhoneError, setHasPhoneError] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [hasSelectError, setHasSelectError] = useState(false);

  useEffect(() => {
    const allConditionsMet =
      Boolean(selectedValue) &&
      Boolean(phone) &&
      !hasPhoneError &&
      !hasSelectError;
    setNextEnabled(allConditionsMet);
  }, [selectedValue, phone, hasPhoneError, hasSelectError, setNextEnabled]);

  useEffect(() => {
    setCommonSpace({
      ...commonSpace,
      info: { clubName: selectedValue, applicant: mockName, phone },
    });
  }, [selectedValue, phone, setCommonSpace]);

  return (
    <StyledCard type="outline">
      <Select
        items={mockClubList}
        selectedValue={selectedValue}
        onSelect={setSelectedValue}
        label="동아리 이름"
        setErrorStatus={setHasSelectError}
      />
      <TextInput label="신청자 이름" placeholder={mockName} disabled />
      <PhoneInput
        label="신청자 전화번호"
        value={phone}
        onChange={setPhone}
        placeholder={mockPhone}
        setErrorStatus={setHasPhoneError}
      />
    </StyledCard>
  );
};

export default CommonSpaceInfoFirstFrame;
