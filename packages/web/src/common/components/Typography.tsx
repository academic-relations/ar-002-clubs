import React from "react";
import styled from "styled-components";

interface TypographyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  type?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "p_b"
    | "span"
    | "h3_b";
}

const TypographyInner = styled.div`
  color: "inherit";
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
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
 * @param {string} type - Type of typography.
 * ### Types and font sizes, line heights, and font weights:
 * - h3: 20px, 24px, medium (500)
 * - p: 16px, 20px, regular (400)
 */
const Typography: React.FC<TypographyProps> = ({
  type = "h3",
  children,
  ...divProps
}) => {
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
};

export default Typography;
