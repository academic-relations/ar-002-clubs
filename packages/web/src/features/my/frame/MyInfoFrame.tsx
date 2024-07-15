import React, { useEffect, useState } from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import PhoneInput from "@sparcs-clubs/web/common/components/Forms/PhoneInput";
import useGetUserProfile from "@sparcs-clubs/web/features/common-space/service/getUserProfile";

const MyInfoFrame: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(true);

  const {
    data: myInfo,
    isLoading: infoLoading,
    isError: infoError,
  } = useGetUserProfile();

  const myPhone = myInfo?.phoneNumber;

  const [phone, setPhone] = useState<string>(myPhone ?? "");
  const [errorPhone, setErrorPhone] = useState<boolean>(false);

  useEffect(() => {
    if (myInfo) {
      setPhone(myPhone ?? "");
    }
  }, [myInfo, myPhone]);

  const buttonType = phone === myPhone || errorPhone ? "disabled" : "default";

  return (
    <FlexWrapper direction="column" gap={40}>
      <FoldableSectionTitle
        title="나의 정보"
        toggle={toggle}
        toggleHandler={() => setToggle(!toggle)}
      >
        <AsyncBoundary isLoading={infoLoading} isError={infoError}>
          <Card outline gap={32} style={{ flex: 1 }}>
            <PhoneInput
              label="전화번호"
              placeholder="전화번호를 입력하세요"
              value={phone}
              onChange={setPhone}
              setErrorStatus={setErrorPhone}
            />
            <Button
              type={buttonType}
              style={{ width: "max-content", alignSelf: "flex-end" }}
              onClick={() => {}} // TODO: 실제 전화번호 수정 기능 연결
            >
              저장
            </Button>
          </Card>
        </AsyncBoundary>
      </FoldableSectionTitle>
    </FlexWrapper>
  );
};

export default MyInfoFrame;
