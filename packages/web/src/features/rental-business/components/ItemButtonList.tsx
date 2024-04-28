import React from "react";
import styled from "styled-components";
import ItemButton from "./ItemButton";
import { RentalInterface } from "../types/rental";

interface ItemButtonListProps {
  value: "easel" | "vacuum" | "handCart" | "mat" | "tool" | "none";
  onChange: (value: "easel" | "vacuum" | "handCart" | "mat" | "tool") => void;
  rental: RentalInterface;
  // rental: {
  //   easel?: number;
  //   vacuum?: "corded" | "cordless";
  //   handCart?: {
  //     rolltainer?: number;
  //     large?: number;
  //     medium?: number;
  //     small?: number;
  //   };
  //   mat?: number;
  //   tool?: {
  //     powerDrill?: number;
  //     driver?: number;
  //     superGlue?: number;
  //     nipper?: number;
  //     plier?: number;
  //     longNosePlier?: number;
  //   };
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

const ItemButtonList: React.FC<ItemButtonListProps> = ({
  value,
  onChange,
  rental,
}) => (
  <ItemButtonListInner>
    {Object.keys(buttonInfo).map(key => {
      const itemValue = rental[key as keyof typeof buttonInfo];
      const hasItem = Boolean(itemValue);

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
