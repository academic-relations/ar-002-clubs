import Card from "@sparcs-clubs/web/common/components/Card";
import PhoneInput from "@sparcs-clubs/web/common/components/Forms/PhoneInput";
import Select, {
  SelectItemProps,
} from "@sparcs-clubs/web/common/components/Select";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import React, { useEffect, useState } from "react";
import type { CommonSpaceFrameProps } from "../CommonSpaceNoticeFrame";

const CommonSpaceInfoFirstFrame: React.FC<
  CommonSpaceFrameProps & { setNextEnabled: (enabled: boolean) => void }
> = ({ setNextEnabled, commonSpace, setCommonSpace }) => {
  const mockName = "스팍스";
  const mockPhone = "000-0000-0000";
  const mockClubList: SelectItemProps[] = [
    { label: "동아리", value: "1", selectable: true },
    { label: "또다른동아리", value: "2", selectable: true },
    { label: "안되는동아리", value: "3", selectable: false },
  ];

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
      info: {
        clubName:
          mockClubList.find(item => item.value === selectedValue)?.label || "",
        applicant: mockName,
        phone,
      },
    });
  }, [selectedValue, phone, setCommonSpace]);

  return (
    <Card outline gap={40}>
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
    </Card>
  );
};

export default CommonSpaceInfoFirstFrame;
