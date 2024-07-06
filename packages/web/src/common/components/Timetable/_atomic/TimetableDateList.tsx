import React from "react";

import isPropValid from "@emotion/is-prop-valid";
import { addDays } from "date-fns";
import styled from "styled-components";

import { formatSlashDate } from "@sparcs-clubs/web/utils/Date/formateDate";

interface TimetableDateListProps {
  startDate: Date;
  paddingLeft?: string;
}

const TimetableDateListInner = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ paddingLeft: string }>`
  display: flex;
  width: 600px;
  justify-content: flex-end;
  align-items: center;
  align-self: stretch;
  padding-left: ${({ paddingLeft }) => paddingLeft};
`;

const TimtableDate = styled.div`
  display: flex;
  height: 24px;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex: 1 0 0;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 14px;
  line-height: 20px;
`;

const TimetableDateList: React.FC<TimetableDateListProps> = ({
  startDate,
  paddingLeft = "0",
}) => (
  <TimetableDateListInner paddingLeft={paddingLeft}>
    {[...Array(7)].map((_, i) => (
      <TimtableDate key={i}>
        {formatSlashDate(addDays(startDate, i))}
      </TimtableDate>
    ))}
  </TimetableDateListInner>
);

export default TimetableDateList;
