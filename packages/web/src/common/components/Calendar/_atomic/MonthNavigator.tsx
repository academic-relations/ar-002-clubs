// MonthNavigator.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { addMonths, format, subMonths } from "date-fns";
import { ko } from "date-fns/locale";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface MonthNavigatorProps {
  initialDate?: Date;
  onChange?: (date: Date) => void;
}

const NavigatorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 108px;
  /* 화살표 안 움직이게 하려고 피그마(96px)랑 약간 다르게 했는데 확인해주세요 */
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  line-height: 20px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  color: ${({ theme }) => theme.colors.BLACK};
  user-select: none;
  gap: 16px;
`;

const IconWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const StyledChevronLeftIcon = styled(ChevronLeftIcon)`
  font-size: 20px;
`;

const StyledChevronRightIcon = styled(ChevronRightIcon)`
  font-size: 20px;
`;

const MonthDisplay = styled.div`
  flex-grow: 1;
  text-align: center;
`;

const MonthNavigator: React.FC<MonthNavigatorProps> = ({
  initialDate = new Date(),
  onChange = () => {},
}) => {
  const [currentDate, setCurrentDate] = useState(initialDate);

  const handlePrevious = () => {
    const newDate = subMonths(currentDate, 1);
    setCurrentDate(newDate);
    onChange?.(newDate);
  };

  const handleNext = () => {
    const newDate = addMonths(currentDate, 1);
    setCurrentDate(newDate);
    onChange?.(newDate);
  };

  return (
    <NavigatorWrapper>
      <IconWrapper onClick={handlePrevious}>
        <StyledChevronLeftIcon />
      </IconWrapper>
      <MonthDisplay>{format(currentDate, "M월", { locale: ko })}</MonthDisplay>
      <IconWrapper onClick={handleNext}>
        <StyledChevronRightIcon />
      </IconWrapper>
    </NavigatorWrapper>
  );
};

export default MonthNavigator;
