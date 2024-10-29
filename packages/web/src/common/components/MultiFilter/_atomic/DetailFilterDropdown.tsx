import React from "react";

import styled from "styled-components";

import Dropdown from "@sparcs-clubs/web/common/components/Select/Dropdown";
import SelectedItem from "@sparcs-clubs/web/common/components/SelectedItem";

import { CategoryProps } from "../types/FilterCategories";

interface DetailFilterDropdownProps {
  category: CategoryProps;
  setSelectedContents: React.Dispatch<
    React.SetStateAction<CategoryProps["selectedContent"]>
  >;
}

const DetailFilterDropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 280px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
  align-self: stretch;
  width: 100%;
`;

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
    <Dropdown marginTop={4} maxContent={false} position="relative">
      <DetailFilterDropdownWrapper>
        {category.content.map(element => (
          <SelectedItem
            key={element}
            text={element}
            isSelected={category.selectedContent.includes(element)}
            onClick={() => handleSelect(element, category.selectedContent)}
            width="100%"
          />
        ))}
      </DetailFilterDropdownWrapper>
    </Dropdown>
  );
};

export default DetailFilterDropdown;
