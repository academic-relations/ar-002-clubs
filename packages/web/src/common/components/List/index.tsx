import React, { ReactNode } from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import ListItem from "@sparcs-clubs/web/common/components/List/ListItem";
import { ThemeColors } from "@sparcs-clubs/web/common/components/Typography";
import { Theme } from "@sparcs-clubs/web/styles/themes";

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
