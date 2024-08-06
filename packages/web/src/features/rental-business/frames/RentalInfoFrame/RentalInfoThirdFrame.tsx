"use client";

import React, { useEffect, useState } from "react";

import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import {
  ListContainer,
  ListItem,
} from "@sparcs-clubs/web/common/components/ListItem";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import RentalList from "@sparcs-clubs/web/features/rental-business/components/RentalList";
import { formatDate } from "@sparcs-clubs/web/utils/Date/formatDate";

import { RentalFrameProps } from "../RentalNoticeFrame";

const CardInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

const RentalPeriodInner = styled.div`
  display: flex;
`;

const RentalInfoThirdFrame: React.FC<
  RentalFrameProps & { setNextEnabled: (enabled: boolean) => void }
> = ({ rental, setRental, setNextEnabled }) => {
  const [purpose, setPurpose] = useState(rental.purpose || "");
  const [noPurposeError, setNoPurposeError] = useState("");
  const [purposeTouched, setPurposeTouched] = useState(false);

  const handlePurposeTouched = () => {
    if (!purposeTouched) {
      setPurposeTouched(true);
    }
  };

  useEffect(() => {
    setRental({
      ...rental,
      purpose,
    });
  }, [purpose, setRental]);

  useEffect(() => {
    const enableNext = !!rental.purpose;
    if (enableNext || !purposeTouched) {
      setNoPurposeError("");
    } else {
      setNoPurposeError("대여 목적을 입력하세요");
    }
    setNextEnabled(enableNext);
  }, [rental, purposeTouched, setNextEnabled, setNoPurposeError]);

  return (
    <Card outline gap={20}>
      <CardInner>
        <Typography fs={16} lh={20} fw="MEDIUM">
          신청자 정보
        </Typography>
        <ListContainer>
          <ListItem>동아리: {rental.info?.clubName}</ListItem>
          <ListItem>담당자: {rental.info?.applicant}</ListItem>
          <ListItem>연락처: {rental.info?.phone}</ListItem>
        </ListContainer>
        <FlexWrapper direction="row" gap={16}>
          <Typography fs={16} lh={20} fw="MEDIUM">
            대여 기간
          </Typography>
          <RentalPeriodInner>
            {formatDate(rental.date?.start || new Date())} ~
            {formatDate(rental.date?.end || new Date())}
            {/* new Date() 넣어도 되는 이유: thirdFrame에서는 rental date가 둘 다 not null인 상태로 넘어옴 */}
          </RentalPeriodInner>
        </FlexWrapper>
        <Typography fs={16} lh={20} fw="MEDIUM">
          대여 물품
        </Typography>
        <RentalList rental={rental} />
      </CardInner>
      <TextInput
        placeholder="내용"
        area
        label="대여 목적"
        value={purpose}
        handleChange={setPurpose}
        errorMessage={noPurposeError}
        onBlur={handlePurposeTouched}
      />
    </Card>
  );
};

export default RentalInfoThirdFrame;
