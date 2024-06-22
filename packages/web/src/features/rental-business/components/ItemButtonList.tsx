import React from "react";

import styled from "styled-components";

import { RentalInterface } from "../types/rental";

import ItemButton from "./ItemButton";

interface ItemButtonListProps {
  value: "easel" | "vacuum" | "handCart" | "mat" | "tool" | "none";
  onChange: (value: "easel" | "vacuum" | "handCart" | "mat" | "tool") => void;
  rental: RentalInterface;
}

const ItemButtonListInner = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
  align-self: stretch;
  flex-wrap: wrap;
`;

const buttonInfo = {
  easel: {
    text: "이젤",
    image: "https://via.placeholder.com/150",
  },
  vacuum: {
    text: "청소기",
    image: "https://via.placeholder.com/150",
  },
  handCart: {
    text: "수레",
    image: "https://via.placeholder.com/150",
  },
  mat: {
    text: "돗자리",
    image: "https://via.placeholder.com/150",
  },
  tool: {
    text: "공구",
    image: "https://via.placeholder.com/150",
  },
};

const checkNonZeroItems = (items?: { [key: string]: number }): boolean =>
  items ? Object.values(items).some(value => value > 0) : false;

const ItemButtonList: React.FC<ItemButtonListProps> = ({
  value,
  onChange,
  rental,
}) => (
  <ItemButtonListInner>
    {Object.keys(buttonInfo).map(key => {
      const itemValue = rental[key as keyof typeof buttonInfo];
      let hasItem = false;

      if (typeof itemValue === "number") {
        hasItem = itemValue > 0;
      } else if (typeof itemValue === "object") {
        hasItem = checkNonZeroItems(itemValue);
      } else if (typeof itemValue === "string") {
        hasItem = true;
      }

      return (
        <ItemButton
          key={key}
          selected={value === key}
          name={buttonInfo[key as keyof typeof buttonInfo].text}
          image={buttonInfo[key as keyof typeof buttonInfo].image}
          have={hasItem}
          onClick={() => onChange(key as keyof typeof buttonInfo)}
        />
      );
    })}
  </ItemButtonListInner>
);

export default ItemButtonList;
