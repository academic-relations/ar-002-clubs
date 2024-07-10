import React, { useState } from "react";

import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PhoneInput from "@sparcs-clubs/web/common/components/Forms/PhoneInput";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { ChangeRepresentativeModalText } from "@sparcs-clubs/web/constants/changeRepresentative";

interface ChangeRepresentativeModalContentProps {
  needPhoneNumber: boolean;
  clubName: string;
  prevRepresentative: string;
  newRepresentative: string;
  phonePlaceholder?: string;
  phoneValue: string;
  onPhoneChange: (value: string) => void;
}

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ChangeRepresentativeModalContent: React.FC<
  ChangeRepresentativeModalContentProps
> = ({
  needPhoneNumber,
  clubName,
  prevRepresentative,
  newRepresentative,
  phonePlaceholder = "010-XXXX-XXXX",
  phoneValue,
  onPhoneChange,
}) => {
  const [errorPhone, setErrorPhone] = useState<boolean>(false);
  return (
    <FlexWrapper direction="column" gap={12}>
      <Typography
        ff="PRETENDARD"
        fw="MEDIUM"
        fs={16}
        lh={28}
        color="BLACK"
        style={{ whiteSpace: "pre-wrap", textAlign: "center" }}
      >
        {ChangeRepresentativeModalText(
          clubName,
          prevRepresentative,
          newRepresentative,
        )}
      </Typography>
      {needPhoneNumber && (
        <>
          <Typography
            ff="PRETENDARD"
            fw="MEDIUM"
            fs={16}
            lh={28}
            color="BLACK"
            style={{ whiteSpace: "pre-wrap", textAlign: "center" }}
          >
            전화번호를 입력해야 동아리 대표자 변경을 승인할 수 있습니다
          </Typography>
          <PhoneInput
            placeholder={phonePlaceholder}
            value={phoneValue}
            onChange={onPhoneChange}
            setErrorStatus={setErrorPhone}
          />
        </>
      )}
      <ButtonWrapper>
        <Button type="outlined">취소</Button>
        <FlexWrapper direction="row" gap={12}>
          <Button type="outlined">거절</Button>
          <Button
            type={errorPhone || phoneValue === "" ? "disabled" : "default"}
          >
            승인
          </Button>
        </FlexWrapper>
      </ButtonWrapper>
    </FlexWrapper>
  );
};

export default ChangeRepresentativeModalContent;
