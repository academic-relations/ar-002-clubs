import React from "react";
import styled from "styled-components";
import { addMonths, format, subMonths } from "date-fns";
import { ko } from "date-fns/locale";
import Icon from "@sparcs-clubs/web/common/components/Icon";

interface MonthNavigatorProps {
  currentDate: Date;
  onChange: (date: Date) => void;
}

const NavigatorWrapper = styled.div<{ sameYear: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${({ sameYear }) => (sameYear ? "108px" : "160px")};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  line-height: 20px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  color: ${({ theme }) => theme.colors.BLACK};
  user-select: none;
  gap: 16px;
`;

const MonthDisplay = styled.div`
  flex-grow: 1;
  text-align: center;
`;

const MonthNavigator: React.FC<MonthNavigatorProps> = ({
  currentDate,
  onChange = () => {},
}) => {
  const currentYear = new Date().getFullYear();
  const dateYear = currentDate.getFullYear();
  const sameYear = dateYear === currentYear;
  const today = new Date();

  const handlePrevious = () => {
    const newDate = subMonths(currentDate, 1);
    onChange(newDate);
  };

  const handleNext = () => {
    const newDate = addMonths(currentDate, 1);
    onChange(newDate);
  };

  const handleTodayClick = () => {
    onChange(today);
  };

  const displayFormat = sameYear ? "M월" : "yyyy년 M월";

  return (
    <NavigatorWrapper sameYear={sameYear}>
      <Icon type="chevron_left" size={20} onClick={handlePrevious} />
      <MonthDisplay onClick={handleTodayClick}>
        {format(currentDate, displayFormat, { locale: ko })}
      </MonthDisplay>
      <Icon type="chevron_right" size={20} onClick={handleNext} />
    </NavigatorWrapper>
  );
};

export default MonthNavigator;
