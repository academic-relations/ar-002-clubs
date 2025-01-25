import React, { ReactNode } from "react";

import styled from "styled-components";

import Typography, {
  ThemeColors,
} from "@sparcs-clubs/web/common/components/Typography";
import { Theme } from "@sparcs-clubs/web/styles/themes";

const FlexTypography = styled(Typography)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  align-self: stretch;
`;

interface ListItemProps {
  children: string | ReactNode;
  index: number;
  fs?: number;
  lh?: number;
  fw?: keyof Theme["fonts"]["WEIGHT"];
  ff?: keyof Theme["fonts"]["FAMILY"];
  color?: ThemeColors;
}

// ActivityReportDetailFrame의 ActivityDetail 구현에서 따왔습니다.
const ListItem: React.FC<ListItemProps> = ({
  children = "",
  index = -1,
  fs = 16,
  fw = "REGULAR",
  lh = 20,
  ff = "PRETENDARD",
  color = "BLACK",
}) => {
  const isString: boolean = typeof children === "string";
  return (
    <FlexTypography fw={fw} fs={fs} lh={lh} ff={ff} color={color}>
      {isString ? `${index === -1 ? "•" : `${index}.`} ${children}` : children}
    </FlexTypography>
  );
};

export default ListItem;
