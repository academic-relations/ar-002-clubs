import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

interface SelectItem {
  label: string;
  value: string;
  selectable: boolean;
}

interface SelectProps {
  items: SelectItem[];
  // label?: string;
  // errorMessage?: string;
  // disabled?: boolean;
}

const DropdownContainer = styled.div`
  gap: 4px;
  position: relative;
`;

const StyledSelect = styled.div<{ hasError?: boolean }>`
  width: 300px;
  padding: 8px 12px;
  outline: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  &:focus {
    border-color: ${({ theme, hasError }) => !hasError && theme.colors.PRIMARY};
  }
  &:hover:not(:focus) {
    border-color: ${({ theme, hasError }) =>
      !hasError && theme.colors.GRAY[300]};
  }
`;

const Dropdown = styled.div`
  position: absolute;
  width: 300px;
  margin-top: 4px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.WHITE};
`;

const Option = styled.div`
  padding: 8px 12px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY[100]};
  }
`;
// TODO: 옵션, 기본 select box 따로 구현하기 (이게 맞는지 생각해보기) - 만약 아니라면 두개 합쳐서 구현하고, label, error 붙이기
// TODO: label, error message 붙이기
// TODO: 아무것도 안 골랐을 때 에러 발생 시키기
const Select: React.FC<SelectProps> = ({ items }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter out the non-selectable items
  const selectableItems = items.filter(item => item.selectable);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [containerRef]);

  return (
    <DropdownContainer ref={containerRef}>
      <StyledSelect onClick={() => setIsOpen(!isOpen)}>
        {selectedValue || "항목을 선택해주세요"}
      </StyledSelect>
      {isOpen && (
        <Dropdown>
          {selectableItems.map(item => (
            <Option
              key={item.value}
              onClick={() => {
                setSelectedValue(item.label);
                setIsOpen(false);
              }}
            >
              {item.label}
            </Option>
          ))}
        </Dropdown>
      )}
    </DropdownContainer>
  );
};

export default Select;
