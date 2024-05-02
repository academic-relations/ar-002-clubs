import React from "react";
import styled from "styled-components";
import colors from "@sparcs-clubs/web/styles/themes/colors";
import BreadCrumbItem from "./_atomic/BreadCrumbItem";
import Icon from "../Icon";

interface BreadCrumbProps {
  items: string[];
}

const BreadCrumbContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BreadCrumb: React.FC<BreadCrumbProps> = ({ items }) => {
  const itemsWithMain = ["메인", ...items];

  return (
    <BreadCrumbContainer>
      {itemsWithMain.map((item, index) => (
        <>
          <BreadCrumbItem
            text={item}
            disabled={index === itemsWithMain.length - 1}
          />
          {index < itemsWithMain.length - 1 && (
            <Icon type="chevron_right" size={20} color={colors.PRIMARY} />
          )}
        </>
      ))}
    </BreadCrumbContainer>
  );
};

export default BreadCrumb;
