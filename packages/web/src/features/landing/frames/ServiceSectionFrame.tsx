"use client";

// import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import React from "react";
import styled from "styled-components";
import MoreSectionTitle from "../components/MoreSectionTitle";

const NoticeSectionFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 30%;
`;

type NoticeSectionFrameProps = {
  title: string;
};

const ServiceSectionFrame: React.FC<NoticeSectionFrameProps> = ({ title }) => (
  <NoticeSectionFrameInner>
    <MoreSectionTitle title="동아리" showMore={false} />
    <p>{title}</p>
  </NoticeSectionFrameInner>
);

export default ServiceSectionFrame;
