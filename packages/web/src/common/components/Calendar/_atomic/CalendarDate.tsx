import React from "react";
import styled, { css } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";

export interface CalendarDateProps {
  date: Date;
  exist: boolean;
  type?: "Default" | "Pass" | "Start" | "End" | "Selected" | "Past/Future";
  size?: "lg" | "md" | "sm";
  onDateClick?: (date: Date) => void;
}

const getBackgroundColor = (
  theme: DefaultTheme,
  type?: CalendarDateProps["type"],
) => {
  if (type === "Default") return theme.colors.PRIMARY;
  if (type === "Past/Future") return theme.colors.GRAY[300];
  return theme.colors.WHITE;
};

const ExistWrapper = styled.div<{
  exist: boolean;
  type?: CalendarDateProps["type"];
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 24px;
  height: 24px;

  ${({ exist, type, theme }) =>
    exist &&
    css`
      &::after {
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        width: 4px;
        height: 4px;
        background-color: ${getBackgroundColor(theme, type)};
        border-radius: 2px;
      }
    `}
`;

const DateContainer = styled.div<CalendarDateProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  line-height: 20px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};

  ${({ size }) => {
    switch (size) {
      case "sm":
        return css`
          width: 32px;
          height: 32px;
        `;
      case "md":
        return css`
          width: 40px;
          height: 40px;
        `;
      case "lg":
      default:
        return css`
          width: 48px;
          height: 48px;
        `;
    }
  }}
  background-color: ${({ type, theme }) => {
    if (type === "Past/Future" || type === "Default") return "transparent";
    if (type === "Pass") return theme.colors.MINT[300];
    return theme.colors.PRIMARY;
  }};
  color: ${({ type, theme }) => {
    if (type === "Default") return theme.colors.BLACK;
    if (type === "Past/Future") return theme.colors.GRAY[300];
    return theme.colors.WHITE;
  }};
`;

const DateWrapper = styled.div<{
  type?: CalendarDateProps["type"];
  size?: CalendarDateProps["size"];
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  cursor: ${({ onClick }) => (onClick ? "pointer" : "default")};
  width: 100%;
  ${({ size }) => {
    switch (size) {
      case "sm":
        return css`
          height: 32px;
        `;
      case "md":
        return css`
          height: 40px;
        `;
      case "lg":
      default:
        return css`
          height: 48px;
        `;
    }
  }}
  background: ${({ type, theme }) => {
    switch (type) {
      case "End":
        return `linear-gradient(to left, rgba(255, 255, 255, 0) 50%, ${theme.colors.MINT[300]} 50%)`;
      case "Start":
        return `linear-gradient(to right, rgba(255, 255, 255, 0) 50%, ${theme.colors.MINT[300]} 50%)`;
      case "Pass":
        return `${theme.colors.MINT[300]}`;
      default:
        return "transparent";
    }
  }};
`;

const CalendarDate: React.FC<CalendarDateProps> = ({
  date,
  exist,
  type = "Default",
  size = "lg",
  onDateClick = () => {},
}) => {
  const handleClick = () => {
    if (onDateClick) {
      onDateClick(date);
    }
  };
  return (
    <DateWrapper type={type} onClick={handleClick} size={size}>
      <DateContainer date={date} exist={exist} type={type} size={size}>
        <ExistWrapper exist={exist} type={type}>
          {date.getDate()}
        </ExistWrapper>
      </DateContainer>
    </DateWrapper>
  );
};

export default CalendarDate;
