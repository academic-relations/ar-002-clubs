import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
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
  disabled?: boolean;
}

const DropdownContainer = styled.div`
  gap: 4px;
  position: relative;
`;

const disabledStyle = css`
  background-color: ${({ theme }) => theme.colors.GRAY[100]};
  border-color: ${({ theme }) => theme.colors.GRAY[200]};
  pointer-events: none;
`;

const StyledSelect = styled.div<{ hasError?: boolean; disabled?: boolean }>`
  width: 300px;
  padding: 8px 12px;
  outline: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border: 1px solid
    ${({ theme, hasError }) =>
      hasError ? theme.colors.RED : theme.colors.GRAY[200]};
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
  ${({ disabled }) => disabled && disabledStyle}
`;

const Dropdown = styled.div`
  position: absolute;
  width: 300px;
  margin-top: 4px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[300]};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  gap: 4px;
  z-index: 1000; // Ensure the dropdown appears above other content
`;

const Option = styled.div<{ selectable?: boolean }>`
  gap: 10px;
  border-radius: 4px;
  padding: 4px 12px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme, selectable }) =>
    selectable ? theme.colors.BLACK : theme.colors.GRAY[300]};
  ${({ selectable }) =>
    selectable &&
    css`
      &:hover {
        background-color: ${({ theme }) => theme.colors.GRAY[200]};
      }
    `}
`;

const NoOption = styled.div`
  padding: 4px 12px;
  gap: 10px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  text-align: center;
  pointer-events: none;
  color: ${({ theme }) => theme.colors.GRAY[300]};
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

const SelectWrapper = styled.div`
  width: 300px;
  flex-direction: column;
  display: flex;
  gap: 4px;
`;

const Select: React.FC<SelectProps> = ({
  items,
  errorMessage = "",
  label = "",
  disabled = false,
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
          <StyledSelect
            hasError={Boolean(errorMessage)}
            disabled={disabled}
            onClick={() => {
              if (!disabled) {
                setIsOpen(!isOpen);
              }
            }}
          >
            {selectedValue || "항목을 선택해주세요"}
            <IconWrapper>
              {isOpen ? (
                <KeyboardArrowUp style={{ fontSize: "20px" }} />
              ) : (
                <KeyboardArrowDown style={{ fontSize: "20px" }} />
              )}
            </IconWrapper>
          </StyledSelect>
          {isOpen && (
            <Dropdown>
              {items.length > 0 ? (
                items.map(item => (
                  <Option
                    key={item.value}
                    selectable={item.selectable}
                    onClick={() => {
                      if (item.selectable) {
                        setSelectedValue(item.label);
                        setIsOpen(false);
                      }
                    }}
                  >
                    {item.label}
                  </Option>
                ))
              ) : (
                <NoOption>항목이 존재하지 않습니다</NoOption>
              )}
            </Dropdown>
          )}
        </DropdownContainer>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </SelectWrapper>
    </SelectWrapper>
  );
};

export default Select;
