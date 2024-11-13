import React, { useEffect, useState } from "react";

import Card from "@sparcs-clubs/web/common/components/Card";
import PhoneInput from "@sparcs-clubs/web/common/components/Forms/PhoneInput";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Select from "@sparcs-clubs/web/common/components/Select";

import type { StorageFormProps } from ".";

import type { SelectItem } from "@sparcs-clubs/web/common/components/Select";

type StorageFormFirstProps = Pick<
  StorageFormProps,
  "username" | "clubs" | "requestForm" | "setRequestForm"
> & { setFormError: React.Dispatch<React.SetStateAction<boolean>> };

const StorageFormFirst: React.FC<StorageFormFirstProps> = ({
  username,
  clubs,
  requestForm,
  setRequestForm,
  setFormError,
}) => {
  const clubSelection: Array<SelectItem<string>> = clubs.map(club => ({
    label: club.name_kr,
    value: club.id.toString(),
    selectable: true,
  }));

  const [clubId, setClubId] = useState<string>(
    String(requestForm.clubId) ?? "0",
  );
  const [studentPhoneNumber, setStudentPhoneNumberNumber] = useState<string>(
    requestForm.studentPhoneNumber ?? "'010-5105-4707",
  );

  const [clubIdSelectionError, setClubIdSelectionError] =
    useState<boolean>(false);
  const [usernameError, setUserNameError] = useState<boolean>(false);
  const [studentPhoneNumberError, setPhoneNumberError] =
    useState<boolean>(false);

  useEffect(() => {
    setRequestForm({ ...requestForm });
  }, [clubId, studentPhoneNumber, requestForm, setRequestForm]);

  useEffect(() => {
    setFormError(
      clubIdSelectionError || usernameError || studentPhoneNumberError,
    );
  }, [
    clubIdSelectionError,
    usernameError,
    studentPhoneNumberError,
    setFormError,
  ]);

  return (
    <Card outline gap={20}>
      <Select
        items={clubSelection}
        label="동아리 이름"
        value={clubId}
        onChange={setClubId}
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
        value={studentPhoneNumber}
        onChange={setStudentPhoneNumberNumber}
        setErrorStatus={setPhoneNumberError}
      />
    </Card>
  );
};

export default StorageFormFirst;
