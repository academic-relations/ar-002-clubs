import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "@sparcs-clubs/web/common/components/Card";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import RentalList from "@sparcs-clubs/web/features/rental-business/components/RentalList";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import { RentalFrameProps } from "../RentalNoticeFrame";

const StyledCard = styled(Card)<{ type: string }>`
  padding: 32px;
  gap: 20px;
  align-self: stretch;
`;

const StyledTypography = styled(Typography)`
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
`;

const CardInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;
const UserInfoListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const UserInfoListItem = styled.li`
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  font-size: 16px;
  line-height: 20px;

  &:before {
    content: "• ";
    padding-right: 8px;
  }

  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

const RentalInfoThirdFrame: React.FC<RentalFrameProps> = ({
  rental,
  setRental,
}) => {
  const [purpose, setPurpose] = useState("");

  useEffect(() => {
    setRental({
      ...rental,
      purpose,
    });
  }, [purpose, setRental]);

  return (
    <StyledCard type="outline">
      <CardInner>
        <StyledTypography type="p">신청자 정보</StyledTypography>
        <UserInfoListContainer>
          <UserInfoListItem>동아리: {rental.info?.clubName}</UserInfoListItem>
          <UserInfoListItem>담당자: {rental.info?.applicant}</UserInfoListItem>
          <UserInfoListItem>연락처: {rental.info?.phone}</UserInfoListItem>
        </UserInfoListContainer>
        <StyledTypography type="p">대여 기간</StyledTypography>
        <StyledTypography type="p">대여 물품</StyledTypography>
        <RentalList rental={rental} />
      </CardInner>
      <TextInput
        placeholder="내용"
        area
        label="대여 목적"
        value={purpose}
        handleChange={setPurpose}
      />
    </StyledCard>
  );
};

export default RentalInfoThirdFrame;
