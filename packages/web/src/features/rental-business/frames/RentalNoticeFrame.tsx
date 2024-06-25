"use client";

import React, { useState } from "react";

import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import Checkbox from "@sparcs-clubs/web/common/components/Checkbox";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import type { RentalInterface } from "../types/rental";

export interface RentalFrameProps {
  rental: RentalInterface;
  setRental: React.Dispatch<React.SetStateAction<RentalInterface>>;
}

export interface RentalLimitProps {
  rentalDate: Date;
  returnDate: Date;
  rental: RentalInterface;
  setRental: React.Dispatch<React.SetStateAction<RentalInterface>>;
  setHasError: React.Dispatch<React.SetStateAction<boolean>>;
}

const RentalNoticeFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const StyledTypography = styled(Typography)`
  line-height: 32px;
`;

const StyledBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const StyledCheckboxOuter = styled.div`
  display: flex;
  padding-left: 4px;
  align-items: center;
  gap: 12px;
`;

const RentalNoticeFrame: React.FC<RentalFrameProps> = ({
  rental,
  setRental,
}) => {
  const [checked, setChecked] = useState(false);
  // TODO: 동의하고 돌아왔을 때 체크된 상태로 두기
  const handleNextClick = () => {
    if (checked) {
      setRental({ ...rental, agreement: true });
    }
  };

  return (
    <RentalNoticeFrameInner>
      <Card outline gap={16}>
        <Typography type="h3">안내사항</Typography>
        <StyledTypography type="p">
          모든 대여 사업은 동연 소속 동아리를 대상으로 하며, 신청은 각 동아리의
          대표자 또는 대의원만 가능합니다
          <br />
          기타 등등 안내 내용 -{">"} 이건 동연 측에서 준비해주겠죠?
        </StyledTypography>
      </Card>
      <StyledBottom>
        <StyledCheckboxOuter>
          <Checkbox
            checked={checked}
            onClick={() => setChecked(prev => !prev)}
          />
          <Typography type="p">
            위의 안내사항을 모두 숙지하였으며, 이에 동의합니다
          </Typography>
        </StyledCheckboxOuter>
        <Button
          type={checked ? "default" : "disabled"}
          onClick={handleNextClick}
        >
          다음
        </Button>
      </StyledBottom>
    </RentalNoticeFrameInner>
  );
};

export default RentalNoticeFrame;
