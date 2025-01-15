import React, { ReactNode } from "react";

import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
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

interface ListProps {
  dataList: Array<string | ReactNode>;
  listType: "bullet" | "number";
  startIndex?: number;
  gap: number;
  // Typography의 props
  fs?: number;
  lh?: number;
  fw?: keyof Theme["fonts"]["WEIGHT"];
  ff?: keyof Theme["fonts"]["FAMILY"];
  color?: ThemeColors;
}

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

const List: React.FC<ListProps> = ({
  dataList = [""],
  listType = "bullet",
  startIndex = 1,
  gap = 16,
  fs = 16,
  fw = "REGULAR",
  lh = 20,
  ff = "PRETENDARD",
  color = "BLACK",
}) => (
  <FlexWrapper
    direction="column"
    gap={gap}
    style={{ alignItems: "flex-start", alignSelf: "stretch" }}
  >
    {dataList.map((data, index) => (
      <ListItem
        key={`${(index + startIndex).toString()}`}
        index={listType === "number" ? index + startIndex : -1}
        fs={fs}
        fw={fw}
        lh={lh}
        ff={ff}
        color={color}
      >
        {data}
      </ListItem>
    ))}
  </FlexWrapper>
);

export default List;
