import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";

import FilterButton from "./_atomic/FilterButton";
import FilterDropdown, { FilterProps } from "./_atomic/FilterDropdown";

const FilterOuterWrapper = styled.div`
  display: inline-flex;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const Filter: React.FC<FilterProps> = ({
  itemList,
  selectedList,
  setSelectedList,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <FilterOuterWrapper ref={wrapperRef}>
      <FilterWrapper>
        <FilterButton
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          itemList={itemList}
          selectedList={selectedList}
        />
        {isOpen && (
          <FilterDropdown
            itemList={itemList}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          />
        )}
      </FilterWrapper>
    </FilterOuterWrapper>
  );
};

export default Filter;
