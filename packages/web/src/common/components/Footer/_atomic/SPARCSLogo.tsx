"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import styled, { useTheme } from "styled-components";

import sparcsSvg from "@sparcs-clubs/web/assets/sparcs-black.svg";
import paths from "@sparcs-clubs/web/constants/paths";

const StyledLink = styled(Link)`
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.lg}) {
    target: "_blank";
  }
`;

const SPARCSLogo = () => {
  const theme = useTheme();
  const [isSmallView, setIsSmallView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallView(
        window.innerWidth <= parseInt(theme.responsive.BREAKPOINT.lg),
      );
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <StyledLink href={isSmallView ? paths.MADE_BY.path : "https://sparcs.org"}>
      <Image src={sparcsSvg} alt="SPARCS" height={24} />
    </StyledLink>
  );
};

export default SPARCSLogo;
