import React from "react";
import styled from "styled-components";

interface TypographyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
}

const TypographyInner = styled.div`
  color: ${({ theme }) => theme.colors.BLACK};
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
`;

const H3 = styled(TypographyInner)`
  font-size: 20px;
  line-height: 24px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
`;

const P = styled(TypographyInner)`
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
`;

/**
 * ## Typography component.
 * @param {string} type - Type of typography.
 * ### Types and font sizes, line heights, and font weights:
 * - h3: 20px, 24px,
 * - p: 16px, 20px,
 */
const Typography: React.FC<TypographyProps> = ({
  type = "h3",
  children,
  ...divProps
}) => {
  switch (type) {
    case "h3":
      return <H3 {...divProps}>{children}</H3>;
    case "p":
      return <P {...divProps}>{children}</P>;
    default:
      return <TypographyInner {...divProps}>{children}</TypographyInner>;
  }
};

export default Typography;
