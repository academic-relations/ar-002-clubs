import Card from "@sparcs-clubs/web/common/components/Card";
import PhoneInput from "@sparcs-clubs/web/common/components/Forms/PhoneInput";
import Select from "@sparcs-clubs/web/common/components/Forms/Select";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import React, { useEffect, useState } from "react";
import useGetUserProfile from "@sparcs-clubs/web/features/common-space/service/getUserProfile";
import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";

import type { CommonSpaceFrameProps } from "../CommonSpaceNoticeFrame";

const CommonSpaceInfoFirstFrame: React.FC<
  CommonSpaceFrameProps & { setNextEnabled: (enabled: boolean) => void }
> = ({ setNextEnabled, commonSpace, setCommonSpace }) => {
  const { data, isLoading, isError } = useGetUserProfile();

  const [selectedValue, setSelectedValue] = useState("");
  const [hasSelectError, setHasSelectError] = useState(false);

  useEffect(() => {
    const allConditionsMet = Boolean(selectedValue) && !hasSelectError;
    setNextEnabled(allConditionsMet);
  }, [selectedValue, hasSelectError, setNextEnabled]);

  useEffect(() => {
    const club = data?.clubs.find(item => item.id.toString() === selectedValue);
    if (club)
      setCommonSpace({
        ...commonSpace,
        body: {
          clubdId: club.id,
          email: data?.email || "",
        },
        userInfo: {
          name: data?.name || "",
          phoneNumber: data?.phoneNumber || "",
          clubName: club.name,
        },
      });
  }, [selectedValue, setCommonSpace]);

  return (
    <Card outline gap={40}>
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        <Select
          items={
            data?.clubs.map(club => ({
              label: club.name,
              value: club.id.toString(),
              selectable: true,
            })) || []
          }
          selectedValue={selectedValue}
          onSelect={setSelectedValue}
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
          value={data?.phoneNumber || ""}
          placeholder={data?.phoneNumber || ""}
          disabled
          onChange={() => {}}
        />
      </AsyncBoundary>
    </Card>
  );
};

export default CommonSpaceInfoFirstFrame;
