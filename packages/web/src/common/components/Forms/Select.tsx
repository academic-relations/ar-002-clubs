"use client";

import React, { useState } from "react";
import styled from "styled-components";

interface SelectItem {
  label: string;
  value: string;
  selectable: boolean; // 선택 불가능한 항목 구분
}

interface SelectProps {
  items: SelectItem[];
}

const StyledSelect = styled.select`
  width: 100%;
  padding: 8px 16px;
  margin: 0;
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledOption = styled.option`
  /* option에 대한 스타일이며, 브라우저에 따라 제한적일 수 있음 */
  color: darkblue;
  background-color: lightgray;
`;

const Select: React.FC<SelectProps> = ({ items }) => {
  const [selectedValue, setSelectedValue] = useState("");

  // Filter out the non-selectable items.
  const selectableItems = items.filter(item => item.selectable);

  return (
    <StyledSelect
      value={selectedValue}
      onChange={e => setSelectedValue(e.target.value)}
    >
      {selectableItems.map(item => (
        <StyledOption key={item.value} value={item.value}>
          {item.label}
        </StyledOption>
      ))}
    </StyledSelect>
  );
};
export default Select;
