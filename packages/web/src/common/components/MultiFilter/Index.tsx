import React, { useState } from "react";

import styled from "styled-components";

import MultiFilterButton from "./_atomic/MultiFilterButton";

import MultiFilterDropdown from "./_atomic/MultiFilterDropdown";

import { CategoryProps } from "./types/FilterCategories";

interface MultiFilterProps {
  categories: CategoryProps[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryProps[]>>;
}

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const MultiFilter: React.FC<MultiFilterProps> = ({
  categories,
  setCategories,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // TODO: filter 아닌 곳 클릭했을 때 닫히게 하기
  return (
    <FilterWrapper>
      <MultiFilterButton
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        categories={categories}
      />
      {isOpen && (
        <MultiFilterDropdown
          categories={categories}
          setCategories={setCategories}
        />
      )}
    </FilterWrapper>
  );
};

export default MultiFilter;
