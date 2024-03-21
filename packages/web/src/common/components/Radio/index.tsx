"use client";

import React, { ReactElement, ReactNode, cloneElement } from "react";
import styled from "styled-components";
import RadioOption, { type RadioOptionProps } from "./RadioOption";

type RadioProps<T extends string> = {
  children: ReactElement<RadioOptionProps<T>>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

const RadioInner = styled.div`
  color: ${({ theme }) => theme.colors.BLACK};
`;

function isRadioOptionElement<T extends string>(
  child: ReactNode,
): child is ReactElement<RadioOptionProps<T>> {
  return React.isValidElement(child) && "value" in child.props;
}

const Radio = <T extends string>({
  value,
  onChange,
  children,
  className = "",
}: RadioProps<T>) => {
  const handleChange = (newValue: T) => {
    if (newValue !== value) {
      onChange(newValue);
    }
  };

  return (
    <RadioInner className={className}>
      {React.Children.map(children, child => {
        if (isRadioOptionElement<T>(child)) {
          return cloneElement(child, {
            checked: child.props.value === value,
            onClick: () => handleChange(child.props.value),
          });
        }
        return child;
      })}
    </RadioInner>
  );
};
Radio.Option = RadioOption;

export default Radio;
