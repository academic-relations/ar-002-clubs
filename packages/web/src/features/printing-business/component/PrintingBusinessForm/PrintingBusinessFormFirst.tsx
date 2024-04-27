import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "@sparcs-clubs/web/common/components/Card";

import Select from "@sparcs-clubs/web/common/components/Forms/Select";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import PhoneInput from "@sparcs-clubs/web/common/components/Forms/PhoneInput";

import type { SelectItem } from "@sparcs-clubs/web/common/components/Forms/Select";

import type { PrintingBusinessFormProps } from ".";

interface PrintingBusinessFormFirstProps {
  requestParam: PrintingBusinessFormProps["requestParam"];
  setRequestParam: PrintingBusinessFormProps["setRequestParam"];
  requestForm: PrintingBusinessFormProps["requestForm"];
  setRequestForm: PrintingBusinessFormProps["setRequestForm"];
}

const StyledCard = styled(Card)<{ type: string }>`
  padding: 32px;
  gap: 20px;
  align-self: stretch;
`;

// 아직 useGetMyClub 서비스가 안정되지 않아, 목업 리스트를 두었습니다
// 후에 requestParam으로 대체되어야 합니다
const mockClubSelection: Array<SelectItem> = [
  { label: "club 1", value: "1", selectable: true },
  { label: "club 2", value: "2", selectable: true },
  { label: "club 3", value: "3", selectable: false },
];

const PrintingBusinessFormFirst: React.FC<PrintingBusinessFormFirstProps> = ({
  requestParam,
  setRequestParam,
  requestForm,
  setRequestForm,
}) => {
  const [clubId, setClubId] = useState<string>(
    String(requestParam.clubId) ?? "",
  );
  const [phoneNumber, setPhoneNumber] = useState<string>(
    requestForm.krPhoneNumber ?? "",
  );
  useEffect(() => {
    // console.log("[PrintingBusinessFormFirst] state changed to", clubId, phoneNumber);
    setRequestParam({ clubId: Number(clubId) });
    setRequestForm({ ...requestForm, krPhoneNumber: phoneNumber });
  }, [clubId, phoneNumber]);

  return (
    <StyledCard type="outline">
      <Select
        items={mockClubSelection}
        label="동아리 이름"
        selectedValue={clubId}
        onSelect={setClubId}
      />
      <TextInput
        placeholder="신청인의 이름이 자동으로 입력됩니다. 이 안내가 보일 경우 관리자에게 연락해 주세요"
        label="신청자 이름"
        disabled
        value="홍길동"
      />
      <PhoneInput
        placeholder="신청자 전화번호"
        value={phoneNumber}
        onChange={setPhoneNumber}
      />
    </StyledCard>
  );
};

export default PrintingBusinessFormFirst;
