import React, { useEffect, useRef, useState } from "react";

import isPropValid from "@emotion/is-prop-valid";
import styled, { css } from "styled-components";

import FormError from "../FormError";
import Label from "../FormLabel";
import Icon from "../Icon";

import NoOption from "./_atomic/NoOption";
import Dropdown from "./Dropdown";
import SelectOption from "./SelectOption";

export interface SelectItem {
  label: string;
  value: string;
  selectable?: boolean;
}

interface SelectProps {
  items: SelectItem[];
  label?: string;
  errorMessage?: string;
  disabled?: boolean;
  selectedValue?: string;
  onSelect?: (value: string) => void;
  setErrorStatus?: (hasError: boolean) => void;
  placeholder?: string;
}

const SelectInner = styled.div`
  gap: 4px;
  position: relative;
`;

const disabledStyle = css`
  background-color: ${({ theme }) => theme.colors.GRAY[100]};
  border-color: ${({ theme }) => theme.colors.GRAY[200]};
  pointer-events: none;
`;

const StyledSelect = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{
  hasError?: boolean;
  disabled?: boolean;
  isOpen?: boolean;
}>`
  width: 100%;
  padding: 8px 12px;
  outline: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border: 1px solid
    ${({ theme, hasError, isOpen }) => {
      if (isOpen) return theme.colors.PRIMARY;
      return hasError ? theme.colors.RED[600] : theme.colors.GRAY[200];
    }};
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};

  &:focus,
  &:hover:not(:focus) {
    border-color: ${({ theme, isOpen }) =>
      isOpen ? theme.colors.PRIMARY : theme.colors.GRAY[300]};
  }

  ${({ disabled }) => disabled && disabledStyle}
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
  width: 100%;
  flex-direction: column;
  display: flex;
  gap: 4px;
`;

const SelectValue = styled.span.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ isSelected: boolean }>`
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.BLACK : theme.colors.GRAY[200]};
`;

const Select: React.FC<SelectProps> = ({
  items,
  errorMessage = "",
  label = "",
  disabled = false,
  selectedValue = "",
  onSelect = () => {},
  setErrorStatus = () => {},
  placeholder = "항목을 선택해주세요",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setErrorStatus(!!errorMessage || (!selectedValue && items.length > 0));
  }, [errorMessage, selectedValue, items.length, setErrorStatus]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        if (isOpen) {
          setIsOpen(false);
          if (items.length > 0 && !selectedValue) {
            setHasOpenedOnce(true);
          }
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [containerRef, isOpen, items.length, selectedValue]);

  const handleSelectClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setHasOpenedOnce(true);
    }
  };

  const handleOptionClick = (item: SelectItem) => {
    if (item.selectable || item.selectable === undefined) {
      onSelect(item.value);
      setIsOpen(false);
    }
  };

  const selectedLabel =
    items.find(item => item.value === selectedValue)?.label || placeholder;

  return (
    <SelectWrapper>
      {label && <Label>{label}</Label>}
      <SelectWrapper>
        <SelectInner ref={containerRef}>
          <StyledSelect
            hasError={
              hasOpenedOnce && !selectedValue && items.length > 0 && !isOpen
            }
            disabled={disabled}
            onClick={handleSelectClick}
            isOpen={isOpen}
          >
            <SelectValue isSelected={!!selectedValue}>
              {selectedLabel}
            </SelectValue>
            <IconWrapper>
              {isOpen ? (
                <Icon type="keyboard_arrow_up" size={20} />
              ) : (
                <Icon type="keyboard_arrow_down" size={20} />
              )}
            </IconWrapper>
          </StyledSelect>
          {isOpen && (
            <Dropdown marginTop={4}>
              {items.length > 0 ? (
                items.map(item => (
                  <SelectOption
                    key={item.value}
                    selectable={
                      item.selectable || item.selectable === undefined
                    }
                    onClick={() => handleOptionClick(item)}
                  >
                    {item.label}
                  </SelectOption>
                ))
              ) : (
                <NoOption>항목이 존재하지 않습니다</NoOption>
              )}
            </Dropdown>
          )}
        </SelectInner>
        {hasOpenedOnce && !selectedValue && items.length > 0 && (
          <FormError>
            {errorMessage || "필수로 선택해야 하는 항목입니다"}
          </FormError>
        )}
      </SelectWrapper>
    </SelectWrapper>
  );
};

export default Select;
