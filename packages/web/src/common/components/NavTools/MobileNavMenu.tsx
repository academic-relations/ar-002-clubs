"use client";

import React, { useState } from "react";
import styled from "styled-components";

import paths, { Paths } from "@sparcs-clubs/web/constants/paths";

import MobileNavItem from "./MobileNavItem";

type MobileNavMenuProps = {
  className?: string;
  keys: (keyof Paths)[];
};

type Path = {
  name: string;
  path?: string;
  sub?: Path[];
};

const MobileNavMenuInner = styled.div`
  display: flex;
  width: 300px;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
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

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({
  className = "",
  keys,
}) => {
  const [selectedMenu, setSelectedMenu] = useState<keyof Paths | null>(null);
  const [selectedSubMenu, setSelectedSubMenu] = useState<string>();

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
                  setSelectedSubMenu(subPath?.at(0)?.name);
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
                    highlight={selectedSubMenu === name}
                    onClick={() => setSelectedSubMenu(name)}
                  />
                ))}
              </MobileSubMenuInner>
            )}
          </>
        );
      })}
    </MobileNavMenuInner>
  );
};

export default MobileNavMenu;
