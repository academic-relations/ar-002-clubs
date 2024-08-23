"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";

import logoSvg from "@sparcs-clubs/web/assets/logo.svg";
import paths from "@sparcs-clubs/web/constants/paths";

interface LogoProps {
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ onClick = () => {} }) => (
  <Link href={paths.HOME.path} onClick={onClick}>
    <Image src={logoSvg} alt="Clubs" height={24} />
  </Link>
);

export default Logo;
