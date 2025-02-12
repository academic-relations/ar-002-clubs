import React from "react";
import styled from "styled-components";

const TimetableTimeListInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: calc(24px * 48); // chage to 24px * 48
`;

const TimetableTime = styled.div`
  display: flex;
  width: 48px;
  height: 24px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 14px;
  line-height: 20px;
`;

const TimetableTimeList: React.FC = () => (
  <TimetableTimeListInner>
    {[...Array(48)].map((_, i) => (
      <TimetableTime key={i}>
        {`${Math.floor(i / 2)}:${i % 2 === 0 ? "00" : "30"}`.padStart(5, "0")}
      </TimetableTime>
    ))}
  </TimetableTimeListInner>
);

export default TimetableTimeList;
