import type colors from "./themes/colors";
import type fonts from "./themes/fonts";
import type sizes from "./themes/sizes";
import type zIndices from "./themes/zIndices";

export type ColorTheme = typeof colors;
export type SizeTheme = typeof sizes;
export type FontTheme = typeof fonts;
export type ZIndexTheme = typeof zIndices;

export type Theme = {
  colors: ColorTheme;
  sizes: SizeTheme;
  fonts: FontTheme;
  zIndices: ZIndexTheme;
};

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
