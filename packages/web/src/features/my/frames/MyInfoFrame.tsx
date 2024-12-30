import React, { useEffect, useState } from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import PhoneInput from "@sparcs-clubs/web/common/components/Forms/PhoneInput";
import useUserPhoneNumber from "@sparcs-clubs/web/common/services/getUserPhoneNumber";
import usePatchMyPhoneNumber from "@sparcs-clubs/web/features/my/services/usePatchMyPhoneNumber";

const MyInfoFrame: React.FC<{ profile: string }> = ({ profile }) => {
  const {
    data: myInfo,
    isLoading: infoLoading,
    isError: infoError,
    refetch,
  } = useUserPhoneNumber({ profile });

  const myPhone = myInfo?.phoneNumber;

  const [phone, setPhone] = useState<string>(myPhone ?? "");
  const [errorPhone, setErrorPhone] = useState<boolean>(false);

  const OnPhoneChange = async () => {
    await usePatchMyPhoneNumber({ phoneNumber: phone, profile });
    await refetch();
  };

  useEffect(() => {
    if (myInfo) {
      setPhone(myPhone ?? "");
    }
  }, [myInfo, myPhone]);

  const buttonType = phone === myPhone || errorPhone ? "disabled" : "default";
  return (
    <FoldableSectionTitle title="나의 정보">
      <AsyncBoundary isLoading={infoLoading} isError={infoError}>
        <Card outline gap={32} style={{ flex: 1 }}>
          <PhoneInput
            label="전화번호"
            placeholder="010-XXXX-XXXX"
            value={phone}
            onChange={setPhone}
            setErrorStatus={setErrorPhone}
          />
          <Button
            type={buttonType}
            style={{ width: "max-content", alignSelf: "flex-end" }}
            onClick={OnPhoneChange}
          >
            저장
          </Button>
        </Card>
      </AsyncBoundary>
    </FoldableSectionTitle>
  );
};

export default MyInfoFrame;
