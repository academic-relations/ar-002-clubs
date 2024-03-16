import type colors from "./themes/colors";
import type fonts from "./themes/fonts";
import type responsive from "./themes/responsive";
import type round from "./themes/round";
import type shadow from "./themes/shadow";
import type sizes from "./themes/sizes";
import type zIndices from "./themes/zIndices";

export type ColorTheme = typeof colors;
export type FontTheme = typeof fonts;
export type ResponsiveTheme = typeof responsive;
export type RoundTheme = typeof round;
export type ShadowTheme = typeof shadow;
export type SizeTheme = typeof sizes;
export type ZIndexTheme = typeof zIndices;

export type Theme = {
  colors: ColorTheme;
  fonts: FontTheme;
  responsive: ResponsiveTheme;
  round: RoundTheme;
  shadow: ShadowTheme;
  sizes: SizeTheme;
  zIndices: ZIndexTheme;
};

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
