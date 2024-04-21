import React from "react";
import styled, { css } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";

export interface CalendarDateProps {
  date: number;
  exist: boolean;
  type?: "Default" | "Pass" | "Start" | "End" | "Selected" | "Past/Future";
  size?: "lg" | "md" | "sm";
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
  width: ${({ type, size }) => {
    if (type === "Start" || type === "End" || type === "Pass") {
      switch (size) {
        case "sm":
          return "40px";
        case "md":
          return "48px";
        case "lg":
        default:
          return "60px";
      }
    } else {
      switch (size) {
        case "sm":
          return "32px";
        case "md":
          return "40px";
        case "lg":
        default:
          return "48px";
      }
    }
  }};
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
}) => (
  <DateWrapper type={type}>
    <DateContainer date={date} exist={exist} type={type} size={size}>
      <ExistWrapper exist={exist} type={type}>
        {date}
      </ExistWrapper>
    </DateContainer>
  </DateWrapper>
);

export default CalendarDate;
