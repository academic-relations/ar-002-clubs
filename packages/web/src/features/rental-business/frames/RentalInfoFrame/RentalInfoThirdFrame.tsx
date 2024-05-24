import Card from "@sparcs-clubs/web/common/components/Card";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import RentalList from "@sparcs-clubs/web/features/rental-business/components/RentalList";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RentalFrameProps } from "../RentalNoticeFrame";

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

const RentalPeriodWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const RentalPeriodInner = styled.div`
  display: flex;
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

const RentalInfoThirdFrame: React.FC<
  RentalFrameProps & { setNextEnabled: (enabled: boolean) => void }
> = ({ rental, setRental, setNextEnabled }) => {
  const [purpose, setPurpose] = useState("");
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
        <StyledTypography type="p">신청자 정보</StyledTypography>
        <UserInfoListContainer>
          <UserInfoListItem>동아리: {rental.info?.clubName}</UserInfoListItem>
          <UserInfoListItem>담당자: {rental.info?.applicant}</UserInfoListItem>
          <UserInfoListItem>연락처: {rental.info?.phone}</UserInfoListItem>
        </UserInfoListContainer>
        <RentalPeriodWrapper>
          <StyledTypography type="p">대여 기간</StyledTypography>
          <RentalPeriodInner>
            {format(rental.date?.start || "", "yyyy년 M월 d일 (EEE)", {
              locale: ko,
            })}{" "}
            ~{" "}
            {format(rental.date?.end || "", "yyyy년 M월 d일 (EEE)", {
              locale: ko,
            })}
          </RentalPeriodInner>
        </RentalPeriodWrapper>
        <StyledTypography type="p">대여 물품</StyledTypography>
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
