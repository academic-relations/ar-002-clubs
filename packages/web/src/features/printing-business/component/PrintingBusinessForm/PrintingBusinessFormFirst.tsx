import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "@sparcs-clubs/web/common/components/Card";

import Select from "@sparcs-clubs/web/common/components/Forms/Select";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import PhoneInput from "@sparcs-clubs/web/common/components/Forms/PhoneInput";

import type { SelectItem } from "@sparcs-clubs/web/common/components/Forms/Select";

import type { PrintingBusinessFormProps } from ".";

interface PrintingBusinessFormFirstProps {
  username: PrintingBusinessFormProps["username"];
  clubs: PrintingBusinessFormProps["clubs"];
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

const PrintingBusinessFormFirst: React.FC<PrintingBusinessFormFirstProps> = ({
  username,
  clubs,
  requestParam,
  setRequestParam,
  requestForm,
  setRequestForm,
}) => {
  const clubSelection: Array<SelectItem> = clubs.map(club => ({
    label: club.name,
    value: club.id.toString(),
    selectable: true,
  }));

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
        items={clubSelection}
        label="동아리 이름"
        selectedValue={clubId}
        onSelect={setClubId}
      />
      <TextInput
        placeholder="신청인의 이름이 자동으로 입력됩니다. 이 안내가 보일 경우 관리자에게 연락해 주세요"
        label="신청자 이름"
        disabled
        value={username}
      />
      <PhoneInput
        placeholder="신청자 전화번호"
        label="신청자 전화번호"
        value={phoneNumber}
        onChange={setPhoneNumber}
      />
    </StyledCard>
  );
};

export default PrintingBusinessFormFirst;
