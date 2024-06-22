import React from "react";

import isPropValid from "@emotion/is-prop-valid";
import styled from "styled-components";

import { Theme } from "@sparcs-clubs/web/styles/themes";

interface TypographyPropsBase extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface TypographyPropsWithType extends TypographyPropsBase {
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "p_b" | "span" | "h3_b";
}

type ColorKeys = keyof Theme["colors"];
type NestedColorKeys<C extends ColorKeys> = C extends keyof Theme["colors"]
  ? Theme["colors"][C] extends string | number
    ? never
    : keyof Theme["colors"][C] & (string | number)
  : never;

type NestedColors = {
  [C in ColorKeys]: NestedColorKeys<C> extends never
    ? never
    : `${C}.${NestedColorKeys<C>}`;
}[ColorKeys];

export type ThemeColors = ColorKeys | NestedColors;

const getColorFromTheme = (theme: Theme, colorString: ThemeColors) => {
  if (typeof colorString === "string" && colorString.includes(".")) {
    const [colorKey, shade] = colorString.split(".");
    const colorValue = theme.colors[colorKey as keyof Theme["colors"]];

    if (typeof colorValue === "object" && shade in colorValue) {
      return colorValue[shade as keyof typeof colorValue];
    }
  }

  return theme.colors[colorString as keyof Theme["colors"]];
};

interface TypographyPropsWithCustomStyles extends TypographyPropsBase {
  fs?: number;
  lh?: number;
  fw?: keyof Theme["fonts"]["WEIGHT"];
  ff?: keyof Theme["fonts"]["FAMILY"];
  color?: ThemeColors;
}

type TypographyProps =
  | (TypographyPropsWithType & {
      fs?: never;
      lh?: never;
      fw?: never;
      color?: never;
    })
  | (TypographyPropsWithCustomStyles & { type?: never });

const TypographyInner = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<TypographyPropsWithCustomStyles>`
  color: ${({ color, theme }) =>
    color ? getColorFromTheme(theme, color) : "inherit"};
  font-family: ${({ theme, ff }) => (ff ? theme.fonts.FAMILY[ff] : "inherit")};
  font-size: ${({ fs }) => (fs ? `${fs}px` : "inherit")};
  line-height: ${({ lh }) => (lh ? `${lh}px` : "inherit")};
  font-weight: ${({ fw, theme }) => (fw ? theme.fonts.WEIGHT[fw] : "inherit")};
`;

const H3 = styled(TypographyInner)`
  font-size: 20px;
  line-height: 24px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
`;

const H3_B = styled(H3)`
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.SEMIBOLD};
`;

const P = styled(TypographyInner)`
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
`;
const P_B = styled(TypographyInner)`
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
`;

/**
 * ## Typography component.
 * @param {Object} props - Props for the Typography component.
 * @param {("h1"|"h2"|"h3"|"h4"|"h5"|"h6"|"p"|"p_b"|"span"|"h3_b")} [props.type] - Type of typography.
 * @param {React.ReactNode} props.children - Content to be rendered inside the typography element.
 * @param {number} [props.fs] - Font size of the typography element in pixels.
 * @param {number} [props.lh] - Line height of the typography element in pixels.
 * @param {keyof Theme["fonts"]["WEIGHT"]} [props.fw] - Font weight of the typography element.
 * @param {ThemeColors} [props.color] - Color of the typography element.
 * @param {React.HTMLAttributes<HTMLDivElement>} [props.divProps] - Additional props to be passed to the underlying div element.
 *
 * The Typography component is a versatile component that allows rendering text with different styles and types.
 * It accepts either a `type` prop to select a predefined style or individual style props (`fs`, `lh`, `fw`, `color`) to customize the appearance.
 *
 * ### Types and their corresponding styles:
 * - h3: 20px font size, 24px line height, medium (500) font weight
 * - h3_b: Same as h3 but with semibold (600) font weight
 * - p: 16px font size, 20px line height, regular (400) font weight
 * - p_b: Same as p but with medium (500) font weight
 *
 * The `color` prop accepts either a top-level color key from `Theme["colors"]` or a nested color key in the format `"ColorKey.NestedColorKey"`.
 * The available color keys are defined in the `ThemeColors` type, which is generated based on the structure of `Theme["colors"]`.
 *
 * If no `type` prop is provided, the component will render a generic `TypographyInner` element with the specified style props.
 */

const Typography: React.FC<TypographyProps> = ({
  children = null,
  ...rest
}) => {
  if ("type" in rest) {
    const { type, ...divProps } = rest;
    switch (type) {
      case "h3":
        return <H3 {...divProps}>{children}</H3>;
      case "h3_b":
        return <H3_B {...divProps}>{children}</H3_B>;
      case "p":
        return <P {...divProps}>{children}</P>;
      case "p_b":
        return <P_B {...divProps}>{children}</P_B>;
      default:
        return <TypographyInner {...divProps}>{children}</TypographyInner>;
    }
  } else {
    return <TypographyInner {...rest}>{children}</TypographyInner>;
  }
};

export default Typography;
