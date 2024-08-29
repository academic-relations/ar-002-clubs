import React, { useEffect, useState } from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";

import Card from "@sparcs-clubs/web/common/components/Card";
import PhoneInput from "@sparcs-clubs/web/common/components/Forms/PhoneInput";

import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Select from "@sparcs-clubs/web/common/components/Select";

import useGetUserProfile from "@sparcs-clubs/web/common/services/getUserProfile";
import { CommonSpaceInfoProps } from "@sparcs-clubs/web/features/common-space/types/commonSpace";

const CommonSpaceInfoFirstFrame: React.FC<
  CommonSpaceInfoProps & { setNextEnabled: (enabled: boolean) => void }
> = ({ setNextEnabled, body, setBody }) => {
  const { data, isLoading, isError } = useGetUserProfile();

  const [hasSelectError, setHasSelectError] = useState(false);

  useEffect(() => {
    setBody({ ...body, email: data?.email });
  }, [data]);

  useEffect(() => {
    const allConditionsMet =
      Boolean(body.clubId) && Boolean(body.email) && !hasSelectError;
    setNextEnabled(allConditionsMet);
  }, [body, hasSelectError]);

  const [phoneNumber, setPhoneNumber] = useState(data?.phoneNumber || "");

  return (
    <Card outline gap={40}>
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        <Select
          items={
            data?.clubs.map(club => ({
              label: club.name_kr,
              value: club.id.toString(),
              selectable: true,
            })) || []
          }
          value={body.clubId?.toString()}
          onChange={value => setBody({ ...body, clubId: Number(value) })}
          label="동아리 이름"
          setErrorStatus={setHasSelectError}
        />
        <TextInput
          label="신청자 이름"
          placeholder={data?.name || ""}
          disabled
        />
        <PhoneInput
          label="신청자 전화번호"
          value={phoneNumber}
          placeholder={data?.phoneNumber || ""}
          onChange={setPhoneNumber}
          disabled
        />
      </AsyncBoundary>
    </Card>
  );
};

export default CommonSpaceInfoFirstFrame;
