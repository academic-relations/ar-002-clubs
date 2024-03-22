"use client";

import React from "react";
import styled from "styled-components";
import MoreSectionTitle from "../components/MoreSectionTitle";

const NoticeSectionFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 70%;
`;

type NoticeSectionFrameProps = {
  title: string;
};

const NoticeSectionFrame: React.FC<NoticeSectionFrameProps> = ({ title }) => (
  <NoticeSectionFrameInner>
    <MoreSectionTitle title="동아리" />
    <p>{title}</p>
  </NoticeSectionFrameInner>
);

export default NoticeSectionFrame;
