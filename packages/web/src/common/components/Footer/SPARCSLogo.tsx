"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import paths from "@sparcs-clubs/web/constants/paths";

const SPARCSLogo = () => (
  <Link href={paths.HOME.path}>
    <Image
      src="/assets/SPARCS-logo.svg"
      alt="SPARCS"
      height={27}
      width={90.49}
    />
  </Link>
);

export default SPARCSLogo;
