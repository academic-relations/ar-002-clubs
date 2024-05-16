"use client";

import React, { useState } from "react";
import styled from "styled-components";

import paths, { Paths } from "@sparcs-clubs/web/constants/paths";
import { usePathname } from "next/navigation";

import Button from "../Button";
import Icon from "../Icon";
import MobileNavItem from "./MobileNavItem";

type MobileNavMenuProps = {
  className?: string;
  keys: (keyof Paths)[];
  onClose: VoidFunction;
};

type Path = {
  name: string;
  path?: string;
  sub?: Path[];
};

const MobileNavMenuInner = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  min-height: calc(100vh - 105px);
  padding: 16px;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;

  background: ${({ theme }) => theme.colors.BACKGROUND};

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.xs}) {
    display: none;
  }
`;

const MobileSubMenuInner = styled.div`
  display: flex;
  padding-left: 8px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`;

const LoginButton = styled(Button)`
  gap: 4px;
`;

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({
  className = "",
  keys,
  onClose,
}) => {
  const [selectedMenu, setSelectedMenu] = useState<keyof Paths | null>(null);
  const currentPath = usePathname();

  const isSelected = (key: keyof Paths) => selectedMenu === key;

  return (
    <MobileNavMenuInner className={className}>
      {keys.map(key => {
        const subPath = (paths[key] as Path).sub;

        return (
          <>
            <MobileNavItem
              key={key}
              isExpanded={isSelected(key)}
              {...paths[key]}
              onClick={() => {
                if (isSelected(key)) {
                  setSelectedMenu(null);
                } else {
                  setSelectedMenu(key);
                }
              }}
            />

            {isSelected(key) && (
              <MobileSubMenuInner key={key}>
                {subPath?.map(({ name, path }) => (
                  <MobileNavItem
                    key={name}
                    name={name}
                    path={path}
                    highlight={currentPath === path}
                    onClick={onClose}
                  />
                ))}
              </MobileSubMenuInner>
            )}
          </>
        );
      })}
      <LoginButton
        type="outlined"
        onClick={
          // TODO. paths.LOGIN.path 로 이동 로직 추가
          () => {}
        }
      >
        <Icon type="person" size={16} />
        {paths.LOGIN.name}
      </LoginButton>
    </MobileNavMenuInner>
  );
};

export default MobileNavMenu;
