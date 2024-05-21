"use client";

import styled from "styled-components";

const ResponsiveContent = styled.div`
  width: 1120px;
  min-height: calc(100vh - 105px - 160px);
  margin: 80px auto;

  @media (max-width: 1440px) {
    width: 880px;
  }

  @media (max-width: 1200px) {
    width: 640px;
  }

  @media (max-width: 960px) {
    width: 560px;
    min-height: calc(100vh - 105px - 80px);
    margin: 40px auto;
  }

  @media (max-width: 720px) {
    width: calc(100% - 40px);
    min-height: calc(100vh - 105px - 40px);
    margin: 20px;
  }
`;

export default ResponsiveContent;
