import { addWeeks, format, getWeekOfMonth, subWeeks } from "date-fns";

import React, { useState } from "react";
import styled from "styled-components";
import Icon from "@sparcs-clubs/web/common/components/Icon";
import { ko } from "date-fns/locale";

interface WeekNavigatorProps {
  initialDate?: Date;
  onChange?: (date: Date) => void;
}

const NavigatorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 108px;
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  line-height: 20px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  color: ${({ theme }) => theme.colors.BLACK};
  user-select: none;
  gap: 16px;
`;

const WeekDisplay = styled.div`
  flex-grow: 1;
  text-align: center;
  white-space: nowrap;
`;

const WeekNavigator: React.FC<WeekNavigatorProps> = ({
  initialDate = new Date(),
  onChange = () => {},
}) => {
  const [currentDate, setCurrentDate] = useState(initialDate);

  const handlePrevious = () => {
    const newDate = subWeeks(currentDate, 1);
    setCurrentDate(newDate);
    onChange?.(newDate);
  };

  const handleNext = () => {
    const newDate = addWeeks(currentDate, 1);
    setCurrentDate(newDate);
    onChange?.(newDate);
  };

  return (
    <NavigatorWrapper>
      <Icon type="chevron_left" size={20} onClick={handlePrevious} />
      <WeekDisplay>
        {`${format(addWeeks(currentDate, 1), "yyyy년 M월", { locale: ko })} ${getWeekOfMonth(addWeeks(currentDate, 1))}주`}
      </WeekDisplay>
      <Icon type="chevron_right" size={20} onClick={handleNext} />
    </NavigatorWrapper>
  );
};

export default WeekNavigator;
