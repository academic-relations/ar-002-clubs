import React from "react";

import Dropdown from "@sparcs-clubs/web/common/components/Select/Dropdown";
import SelectedItem from "@sparcs-clubs/web/common/components/SelectedItem";

export interface FilterProps {
  itemList: string[];
  selectedList: string[];
  setSelectedList: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterDropdown: React.FC<FilterProps> = ({
  itemList,
  selectedList,
  setSelectedList,
}) => {
  const handleSelect = (selectedItem: string) => {
    if (selectedList.includes(selectedItem)) {
      const updatedSelectedList = selectedList.filter(
        item => item !== selectedItem,
      );
      setSelectedList(updatedSelectedList);
    } else {
      const updatedSelectedList = [...selectedList, selectedItem];
      setSelectedList(updatedSelectedList);
    }
  };

  return (
    <Dropdown marginTop={40} maxContent style={{ justifyContent: "right" }}>
      {itemList.map(item => (
        <SelectedItem
          key={item}
          text={item}
          isSelected={selectedList.includes(item)}
          onClick={() => handleSelect(item)}
        />
      ))}
    </Dropdown>
  );
};

export default FilterDropdown;
