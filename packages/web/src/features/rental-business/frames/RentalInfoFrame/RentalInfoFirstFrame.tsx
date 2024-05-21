import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "@sparcs-clubs/web/common/components/Card";
import Select, {
  SelectItem,
} from "@sparcs-clubs/web/common/components/Forms/Select";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import PhoneInput from "@sparcs-clubs/web/common/components/Forms/PhoneInput";
import { RentalFrameProps } from "../RentalNoticeFrame";

const StyledCard = styled(Card)<{ outline: boolean }>`
  padding: 32px;
  gap: 40px;
  align-self: stretch;
`;

const RentalInfoFirstFrame: React.FC<
  RentalFrameProps & { setNextEnabled: (enabled: boolean) => void }
> = ({ setNextEnabled, rental, setRental }) => {
  const mockName = "스팍스";
  const mockPhone = "000-0000-0000";
  const mockClubList: SelectItem[] = [
    { label: "동아리", value: "동아리", selectable: true },
    { label: "또다른동아리", value: "또다른동아리", selectable: true },
    { label: "안되는동아리", value: "안되는동아리", selectable: false },
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
    setRental({
      ...rental,
      info: { clubName: selectedValue, applicant: mockName, phone },
    });
  }, [selectedValue, phone, setRental]);

  return (
    <StyledCard outline>
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

export default RentalInfoFirstFrame;
