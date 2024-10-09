import React, { useEffect, useState } from "react";

import styled from "styled-components";

import DetailFilterButton from "./DetailFilterButton";
import DetailFilterDropdown from "./DetailFilterDropdown";

const DetailFilterWrapper = styled.div`
  display: flex;
  width: 100%;
`;

interface CategoryProps {
  name: string;
  content: string[];
  selectedContent: string[];
}

interface DetailFilterProps {
  category: CategoryProps;
  setCategory: (name: string, newCategory: CategoryProps) => void;
}

export const DetailFilter: React.FC<DetailFilterProps> = ({
  category,
  setCategory,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedContents, setSelectedContents] = useState<string[]>(
    category.selectedContent,
  );

  useEffect(() => {
    setCategory(category.name, {
      name: category.name,
      content: category.content,
      selectedContent: selectedContents,
    });
  }, [selectedContents]);
  // TODO: filter 아닌 곳 클릭했을 때 닫히게 하기
  return (
    <DetailFilterWrapper>
      <DetailFilterButton
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        category={category}
      />
      {isOpen && (
        <DetailFilterDropdown
          category={category}
          setSelectedContents={setSelectedContents}
        />
      )}
    </DetailFilterWrapper>
  );
};
