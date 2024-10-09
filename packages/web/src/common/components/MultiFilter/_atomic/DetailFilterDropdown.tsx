import React from "react";

import Dropdown from "@sparcs-clubs/web/common/components/Select/Dropdown";
import SelectedItem from "@sparcs-clubs/web/common/components/SelectedItem";

import { CategoryProps } from "../types/FilterCategories";

interface DetailFilterDropdownProps {
  category: CategoryProps;
  setSelectedContents: React.Dispatch<
    React.SetStateAction<CategoryProps["selectedContent"]>
  >;
}

const DetailFilterDropdown: React.FC<DetailFilterDropdownProps> = ({
  category,
  setSelectedContents,
}) => {
  const handleSelect = (content: string, selectedContents: string[]) => {
    if (selectedContents.includes(content)) {
      const updatedSelectedContent = selectedContents.filter(
        selectedContent => selectedContent !== content,
      );
      setSelectedContents(updatedSelectedContent);
    } else {
      const updatedSelectedContent = [...selectedContents, content];
      setSelectedContents(updatedSelectedContent);
    }
  };

  return (
    <Dropdown marginTop={40} maxContent>
      {category.content.map(element => (
        <SelectedItem
          key={element}
          text={element}
          isSelected={category.selectedContent.includes(element)}
          onClick={() => handleSelect(element, category.selectedContent)}
        />
      ))}
    </Dropdown>
  );
};

export default DetailFilterDropdown;
