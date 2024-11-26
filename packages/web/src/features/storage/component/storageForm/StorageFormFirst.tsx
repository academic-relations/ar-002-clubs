// import React, { useEffect, useState } from "react";

import Card from "@sparcs-clubs/web/common/components/Card";
import FormController from "@sparcs-clubs/web/common/components/FormController";
import PhoneInput from "@sparcs-clubs/web/common/components/Forms/PhoneInput";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Select from "@sparcs-clubs/web/common/components/Select";

// eslint-disable-next-line no-restricted-imports
import type { StorageFormProps } from "../../frame/StorageForm";

import type { SelectItem } from "@sparcs-clubs/web/common/components/Select";

type StorageFormFirstProps = Pick<
  StorageFormProps,
  "username" | "clubs" | "formCtx"
>;

const StorageFormFirst: React.FC<StorageFormFirstProps> = ({
  username,
  clubs,
  formCtx,
}: StorageFormFirstProps) => {
  const { control } = formCtx;

  const clubSelection: Array<SelectItem<string>> = clubs.map(club => ({
    label: club.name_kr,
    value: club.id.toString(),
    selectable: true,
  }));

  return (
    <Card outline gap={20}>
      <FormController
        name="clubId"
        required
        control={control}
        renderItem={props => (
          <Select {...props} items={clubSelection} label="동아리 이름" />
        )}
      />

      <TextInput
        placeholder="신청인의 이름이 자동으로 입력됩니다. 이 안내가 보일 경우 관리자에게 연락해 주세요"
        label="신청자 이름"
        disabled
        value={username}
      />

      <FormController
        name="studentPhoneNumber"
        required
        control={control}
        renderItem={props => (
          <PhoneInput
            {...props}
            placeholder="신청자 전화번호"
            label="신청자 전화번호"
          />
        )}
      />
    </Card>
  );
};

export default StorageFormFirst;