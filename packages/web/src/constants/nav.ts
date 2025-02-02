import type { Paths } from "./paths";

const headerPaths: (keyof Paths)[] = [
  "CLUBS",
  "NOTICE",
  "VOTING",
  "COMMUNITY",
  "SERVICE",
  "EXECUTIVE",
];

const footerPaths: (keyof Paths)[] = ["MADE_BY", "LICENSE", "TERMS_OF_SERVICE"];

const navPaths = {
  header: headerPaths,
  footer: footerPaths,
};

export default navPaths;
