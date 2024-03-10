"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import paths from "@sparcs-clubs/web/constants/paths";

const Logo = () => (
  <Link href={paths.HOME.path}>
    <Image src="/assets/logo.svg" alt="SPARCS" height={24} width={95} />
  </Link>
);

export default Logo;
