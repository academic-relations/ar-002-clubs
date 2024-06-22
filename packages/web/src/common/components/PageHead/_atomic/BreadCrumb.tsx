import React from "react";

import Link from "next/link";
import styled from "styled-components";

import Icon from "@sparcs-clubs/web/common/components/Icon";
import colors from "@sparcs-clubs/web/styles/themes/colors";

import BreadCrumbItem from "./BreadCrumbItem";

interface BreadCrumbItemDetails {
  name: string;
  path: string;
}

interface BreadCrumbProps {
  items: BreadCrumbItemDetails[];
  enableLast?: boolean;
}

const BreadCrumbContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BreadCrumb: React.FC<BreadCrumbProps> = ({
  items,
  enableLast = false,
}) => {
  const itemsWithMain = [{ name: "메인", path: "/" }, ...items];

  return (
    <BreadCrumbContainer>
      {itemsWithMain.map((item, index) => (
        <React.Fragment key={item.name}>
          <Link href={item.path} passHref>
            <BreadCrumbItem
              text={item.name}
              disabled={
                index === itemsWithMain.length - 1 ? !enableLast : false
              }
            />
          </Link>
          {index < itemsWithMain.length - 1 && (
            <Icon type="chevron_right" size={20} color={colors.PRIMARY} />
          )}
        </React.Fragment>
      ))}
    </BreadCrumbContainer>
  );
};

export default BreadCrumb;
