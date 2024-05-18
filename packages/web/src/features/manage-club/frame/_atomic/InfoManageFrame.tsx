import React from "react";
import styled from "styled-components";

const InfoManageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const InfoManageMainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding-left: 24px;
`;

const InfoManageFrame: React.FC = () => (
  <InfoManageWrapper>
    동아리 정보
    <InfoManageMainWrapper>
      <div>기본 정보</div>
      <div>대표자 및 대의원</div>
    </InfoManageMainWrapper>
  </InfoManageWrapper>
);

export default InfoManageFrame;
