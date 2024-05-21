import styled, { DefaultTheme } from "styled-components";

export type TimetableCellType =
  | "default"
  | "hover"
  | "selected"
  | "disabled"
  | "past";

const styleSwitch = (theme: DefaultTheme, type: TimetableCellType) => {
  switch (type) {
    case "default":
      return {
        background: theme.colors.WHITE,
        border: `1px solid ${theme.colors.GRAY[200]}`,
      };
    case "hover":
      return {
        background: theme.colors.WHITE,
        border: `1px solid ${theme.colors.GRAY[300]}`,
      };
    case "selected":
      return {
        background: theme.colors.PRIMARY,
        border: `1px solid ${theme.colors.MINT[800]}`,
      };
    case "disabled":
      return {
        background: theme.colors.GRAY[100],
        border: `1px solid ${theme.colors.GRAY[200]}`,
      };
    case "past":
      return {
        background: theme.colors.MINT[300],
        border: `1px solid ${theme.colors.GRAY[200]}`,
      };
    default:
      return {
        background: theme.colors.WHITE,
        border: `1px solid ${theme.colors.GRAY[200]}`,
      };
  }
};

const TimetableCell = styled.div<{
  type: TimetableCellType;
}>`
  ${({ theme, type }) => styleSwitch(theme, type)};
`;
export default TimetableCell;
