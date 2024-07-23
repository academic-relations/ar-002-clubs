import React from "react";

import isPropValid from "@emotion/is-prop-valid";
import { addDays } from "date-fns";
import styled from "styled-components";

import {
  formatSimplerSlashDate,
  formatSlashDate,
} from "@sparcs-clubs/web/utils/Date/formateDate";

interface TimetableDateListProps {
  startDate: Date;
  paddingLeft?: string;
}

const TimetableDateListInner = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ paddingLeft: string }>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-self: stretch;
  padding-left: ${({ paddingLeft }) => paddingLeft};
  width: 680px;

  .mobile {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.xl}) {
    width: 500px;
  }

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.lg}) {
    width: 520px;
  }

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.md}) {
    .mobile {
      display: block;
    }
    .desktop {
      display: none;
    }
    width: 440px;
  }

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.xs}) {
    display: none;
  }
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
        <span className="desktop">
          {formatSlashDate(addDays(startDate, i))}
        </span>
        <span className="mobile">
          {formatSimplerSlashDate(addDays(startDate, i))}
        </span>
      </TimtableDate>
    ))}
  </TimetableDateListInner>
);

export default TimetableDateList;
