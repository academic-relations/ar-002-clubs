"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";

import sparcsSvg from "@sparcs-clubs/web/assets/sparcs-black.svg";
import paths from "@sparcs-clubs/web/constants/paths";

const SPARCSLogo = () => (
  <Link href={paths.HOME.path}>
    <Image src={sparcsSvg} alt="SPARCS" height={24} />
  </Link>
);

export default SPARCSLogo;
