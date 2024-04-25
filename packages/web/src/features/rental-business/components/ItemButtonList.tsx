import React from "react";
import styled from "styled-components";
import ItemButton from "./ItemButton";

interface ItemButtonListProps {
  value: "easel" | "vacuum" | "handCart" | "mat" | "tool" | "none";
  onChange: (value: "easel" | "vacuum" | "handCart" | "mat" | "tool") => void;
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
    text: "핸드카트",
    image: "https://via.placeholder.com/150",
  },
  mat: {
    text: "매트",
    image: "https://via.placeholder.com/150",
  },
  tool: {
    text: "공구",
    image: "https://via.placeholder.com/150",
  },
};

const ItemButtonList: React.FC<ItemButtonListProps> = ({ value, onChange }) => (
  <ItemButtonListInner>
    {Object.keys(buttonInfo).map(key => (
      <ItemButton
        key={key}
        selected={value === key}
        name={buttonInfo[key as keyof typeof buttonInfo].text}
        image={buttonInfo[key as keyof typeof buttonInfo].image}
        onClick={() => {
          if (value !== "none") {
            onChange(key as keyof typeof buttonInfo);
          }
        }}
      />
    ))}
  </ItemButtonListInner>
);

export default ItemButtonList;
