import React from "react";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import PhoneInput from "@sparcs-clubs/web/common/components/Forms/PhoneInput";

const MyInfoFrame: React.FC = () => {
  const [mockPhone, setMockPhone] = React.useState<string>("01000000000");

  const [toggle, setToggle] = React.useState<boolean>(true);

  const [phone, setPhone] = React.useState<string>(mockPhone);
  const [errorPhone, setErrorPhone] = React.useState<boolean>(false);

  const buttonType = phone === mockPhone || errorPhone ? "disabled" : "default";

  return (
    <FlexWrapper direction="column" gap={40}>
      <FoldableSectionTitle
        title="나의 정보"
        toggle={toggle}
        toggleHandler={() => setToggle(!toggle)}
      />
      {toggle && (
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
            onClick={() => setMockPhone(phone)} // TODO: 실제 전화번호 수정 기능 연결
          >
            저장
          </Button>
        </Card>
      )}
    </FlexWrapper>
  );
};

export default MyInfoFrame;
