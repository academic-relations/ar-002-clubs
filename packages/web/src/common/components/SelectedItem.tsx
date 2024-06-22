import React from "react";

import Icon from "./Icon";
import SelectOption from "./Select/SelectOption";
import Typography from "./Typography";

interface SelectedItemProps {
  text: string;
  isDisabled?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

const SelectedItem: React.FC<SelectedItemProps> = ({
  text,
  isDisabled = false,
  isSelected = false,
  onClick = () => {},
}) => (
  <SelectOption
    onClick={onClick}
    selectable={!isDisabled}
    style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
  >
    {/* // TODO: 글자 위아래 정렬 안 맞는 문제 해결 */}
    <Typography
      fs={16}
      lh={20}
      color={isDisabled ? "GRAY.300" : "BLACK"}
      style={{ flex: 1 }}
    >
      {text}
    </Typography>
    {isSelected && !isDisabled ? <Icon type="check" size={16} /> : null}
  </SelectOption>
);

export default SelectedItem;
