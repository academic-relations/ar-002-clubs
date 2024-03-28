import Typography from "@sparcs-clubs/web/common/components/Typography";
import React from "react";
import styled from "styled-components";

interface InfoProps {
  text: string;
}

const InfoInner = styled.div`
  display: flex;
  padding: 12px 16px;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
  background: ${({ theme }) => theme.colors.WHITE};
`;

const Info: React.FC<InfoProps> = ({ text }) => (
  <InfoInner>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M9.16675 7.49984H10.8334V5.83317H9.16675M10.0001 16.6665C6.32508 16.6665 3.33341 13.6748 3.33341 9.99984C3.33341 6.32484 6.32508 3.33317 10.0001 3.33317C13.6751 3.33317 16.6667 6.32484 16.6667 9.99984C16.6667 13.6748 13.6751 16.6665 10.0001 16.6665ZM10.0001 1.6665C8.90573 1.6665 7.8221 1.88205 6.81105 2.30084C5.80001 2.71963 4.88135 3.33346 4.10752 4.10728C2.54472 5.67008 1.66675 7.7897 1.66675 9.99984C1.66675 12.21 2.54472 14.3296 4.10752 15.8924C4.88135 16.6662 5.80001 17.28 6.81105 17.6988C7.8221 18.1176 8.90573 18.3332 10.0001 18.3332C12.2102 18.3332 14.3298 17.4552 15.8926 15.8924C17.4554 14.3296 18.3334 12.21 18.3334 9.99984C18.3334 8.90549 18.1179 7.82185 17.6991 6.81081C17.2803 5.79976 16.6665 4.8811 15.8926 4.10728C15.1188 3.33346 14.2002 2.71963 13.1891 2.30084C12.1781 1.88205 11.0944 1.6665 10.0001 1.6665ZM9.16675 14.1665H10.8334V9.1665H9.16675V14.1665Z"
        fill="#333333"
      />
    </svg>
    <Typography type="p">{text}</Typography>
  </InfoInner>
);

export default Info;
