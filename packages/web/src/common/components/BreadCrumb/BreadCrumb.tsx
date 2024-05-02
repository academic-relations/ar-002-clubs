import React from "react";
import styled from "styled-components";
import colors from "@sparcs-clubs/web/styles/themes/colors";
import Link from "next/link";
import BreadCrumbItem from "./_atomic/BreadCrumbItem";
import Icon from "../Icon";

interface BreadCrumbItemDetails {
  name: string;
  path: string;
}

interface BreadCrumbProps {
  items: BreadCrumbItemDetails[];
}

const BreadCrumbContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BreadCrumb: React.FC<BreadCrumbProps> = ({ items }) => {
  const itemsWithMain = [{ name: "메인", path: "/" }, ...items];

  return (
    <BreadCrumbContainer>
      {itemsWithMain.map((item, index) => (
        <>
          <Link href={item.path} passHref>
            <BreadCrumbItem
              text={item.name}
              disabled={index === itemsWithMain.length - 1}
            />
          </Link>
          {index < itemsWithMain.length - 1 && (
            <Icon type="chevron_right" size={20} color={colors.PRIMARY} />
          )}
        </>
      ))}
    </BreadCrumbContainer>
  );
};

export default BreadCrumb;
