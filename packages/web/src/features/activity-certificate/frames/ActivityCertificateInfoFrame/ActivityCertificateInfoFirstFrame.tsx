import React, { useState } from "react";
import styled from "styled-components";
import Card from "@sparcs-clubs/web/common/components/Card";

import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";

import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";

import Select from "@sparcs-clubs/web/common/components/Forms/Select";
import { ActivityCertificateFrameProps } from "../ActivityCertificateNoticeFrame";

const StyledCard = styled(Card)<{ type: string }>`
  padding: 32px;
  gap: 40px;
  align-self: stretch;
`;

const ActivityCertificateInfoFirstFrame: React.FC<
  ActivityCertificateFrameProps
> = () => {
  const [itemNumber, setItemNumber] = useState("");
  return (
    <StyledCard type="outline">
      <Select label="동아리 이름" items={[]} />
      <TextInput label="활동 기간" placeholder="" />
      <ItemNumberInput
        label="발급 매수"
        placeholder=""
        onNumberChange={changedNumber => {
          setItemNumber(changedNumber);
          console.log(itemNumber); // TODO - 이 줄 지우기
        }}
      />
      <TextInput label="신청자 이름" placeholder="" />
      <TextInput label="신청자 학과" placeholder="" />
      <TextInput label="신청자 학번" placeholder="" />
      <TextInput label="신청자 전화번호" placeholder="" />
    </StyledCard>
  );
};

export default ActivityCertificateInfoFirstFrame;
