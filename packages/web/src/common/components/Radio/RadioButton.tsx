"use client";

import React from "react";

import colors from "@sparcs-clubs/web/styles/themes/colors";

const RadioButton = ({ checked = false }: { checked: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <rect
      width="16"
      height="16"
      rx="8"
      fill={checked ? colors.PRIMARY : colors.GRAY[200]}
    />
    <rect x="4" y="4" width="8" height="8" rx="4" fill={colors.WHITE} />
  </svg>
);

export default RadioButton;
