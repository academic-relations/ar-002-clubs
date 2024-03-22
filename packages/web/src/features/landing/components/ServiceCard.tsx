"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";

import Card from "@sparcs-clubs/web/common/components/Card";

import arrowRightSvg from "@sparcs-clubs/web/assets/arrow-right.svg";

interface ServiceCardProps {
  serviceTitle: string;
  serviceLink: string;
}

const ServiceCardInner = styled(Card)`
  gap: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 45px;
  align-items: center;
`;

const ServiceTitle = styled.div`
  height: 20px;
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ServiceCard: React.FC<ServiceCardProps> = ({
  serviceTitle,
  serviceLink,
}) => (
  <ServiceCardInner>
    <ServiceTitle>{serviceTitle + serviceLink}</ServiceTitle>
    <Image src={arrowRightSvg} alt="" height={10} />
  </ServiceCardInner>
);

export default ServiceCard;
