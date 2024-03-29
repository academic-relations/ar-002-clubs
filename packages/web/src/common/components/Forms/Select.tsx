import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Label from "./_atomic/Label";
import ErrorMessage from "./_atomic/ErrorMessage";

interface SelectItem {
  label: string;
  value: string;
  selectable: boolean;
}

interface SelectProps {
  items: SelectItem[];
  label?: string;
  errorMessage?: string;
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

const SelectWrapper = styled.div`
  width: 300px;
  flex-direction: column;
  display: flex;
  gap: 4px;
`;
// TODO: 아무것도 안 골랐을 때 에러 발생 시키기
// TODO: focus, disable, error
// TODO: style 맞추기
const Select: React.FC<SelectProps> = ({
  items,
  errorMessage = "",
  label = "",
}) => {
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
    <SelectWrapper>
      {label && <Label>{label}</Label>}
      <SelectWrapper>
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
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </SelectWrapper>
    </SelectWrapper>
  );
};

export default Select;
