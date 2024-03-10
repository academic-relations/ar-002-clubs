import type { Paths } from "@sparcs-clubs/web/constants/paths";
import React from "react";

const Header = ({ paths }: { paths: Paths }) => {
  console.log(paths);
  return <div>hello</div>;
};

export default Header;
