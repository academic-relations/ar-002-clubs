"use client";

import React from "react";
import styled from "styled-components";

const ClubDivisionSectionFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

type ClubsSectionFrameProps = {
  title: string;
};

const ServiceSectionFrame: React.FC<ClubsSectionFrameProps> = ({ title }) => (
  <ClubDivisionSectionFrameInner>
    <p>{title}</p>
  </ClubDivisionSectionFrameInner>
);

export default ServiceSectionFrame;
