"use client";

import styled from "styled-components";
import React, { ReactElement, ReactNode, cloneElement } from "react";
import RadioOption, { type RadioOptionProps } from "./RadioOption";

type RadioProps<T extends string> = {
  children: ReactElement<RadioOptionProps<T>>[];
  value: T;
  onChange: (value: T) => void;
  direction?: "row" | "column";
  gap?: string;
};

function isRadioOptionElement<T extends string>(
  child: ReactNode,
): child is ReactElement<RadioOptionProps<T>> {
  return React.isValidElement(child) && "value" in child.props;
}

const StyledRadioInner = styled.div<{
  direction: "row" | "column";
  gap: string;
}>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  gap: ${({ gap }) => gap};
`;

const Radio = <T extends string>({
  direction = "column",
  gap = "12px",
  value,
  onChange,
  children,
}: RadioProps<T>) => {
  const handleChange = (newValue: T) => {
    if (newValue !== value) {
      onChange(newValue);
    }
  };

  return (
    <StyledRadioInner direction={direction} gap={gap}>
      {React.Children.map(children, child => {
        if (isRadioOptionElement<T>(child)) {
          return cloneElement(child, {
            checked: child.props.value === value,
            onClick: () => handleChange(child.props.value),
          });
        }
        return child;
      })}
    </StyledRadioInner>
  );
};
Radio.Option = RadioOption;

export default Radio;
