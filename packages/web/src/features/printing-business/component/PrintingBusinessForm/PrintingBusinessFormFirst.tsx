import React, { useEffect, useState } from "react";

import Card from "@sparcs-clubs/web/common/components/Card";
import PhoneInput from "@sparcs-clubs/web/common/components/Forms/PhoneInput";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Select from "@sparcs-clubs/web/common/components/Select";

import type { PrintingBusinessFormProps } from ".";
import type { SelectItem } from "@sparcs-clubs/web/common/components/Select";

type PrintingBusinessFormFirstProps = Pick<
  PrintingBusinessFormProps,
  | "username"
  | "clubs"
  | "requestParam"
  | "setRequestParam"
  | "requestForm"
  | "setRequestForm"
> & { setFormError: React.Dispatch<React.SetStateAction<boolean>> };

const PrintingBusinessFormFirst: React.FC<PrintingBusinessFormFirstProps> = ({
  username,
  clubs,
  requestParam,
  setRequestParam,
  requestForm,
  setRequestForm,
  setFormError,
}) => {
  const clubSelection: Array<SelectItem> = clubs.map(club => ({
    label: club.name,
    value: club.id.toString(),
    selectable: true,
  }));

  const [clubId, setClubId] = useState<string>(
    String(requestParam.clubId) ?? "0",
  );
  const [phoneNumber, setPhoneNumber] = useState<string>(
    requestForm.krPhoneNumber ?? "",
  );

  const [clubIdSelectionError, setClubIdSelectionError] =
    useState<boolean>(false);
  const [usernameError, setUserNameError] = useState<boolean>(false);
  const [phoneNumberError, setPhoneNumberError] = useState<boolean>(false);

  useEffect(() => {
    // console.log("[PrintingBusinessFormFirst] state changed to", clubId, phoneNumber);
    setRequestParam({ clubId: Number(clubId) });
    setRequestForm({ ...requestForm, krPhoneNumber: phoneNumber });
  }, [clubId, phoneNumber]);

  useEffect(() => {
    setFormError(clubIdSelectionError || usernameError || phoneNumberError);
  }, [clubIdSelectionError, usernameError, phoneNumberError]);

  return (
    <Card outline gap={20}>
      <Select
        items={clubSelection}
        label="동아리 이름"
        selectedValue={clubId}
        onSelect={setClubId}
        setErrorStatus={setClubIdSelectionError}
      />
      <TextInput
        placeholder="신청인의 이름이 자동으로 입력됩니다. 이 안내가 보일 경우 관리자에게 연락해 주세요"
        label="신청자 이름"
        disabled
        value={username}
        setErrorStatus={setUserNameError}
      />
      <PhoneInput
        placeholder="신청자 전화번호"
        label="신청자 전화번호"
        value={phoneNumber}
        onChange={setPhoneNumber}
        setErrorStatus={setPhoneNumberError}
      />
    </Card>
  );
};

export default PrintingBusinessFormFirst;
