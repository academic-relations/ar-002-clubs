"use client";

import React from "react";
import styled from "styled-components";

import type { ClubDetail } from "@sparcs-clubs/web/types/clubdetail.types";

import Card from "@sparcs-clubs/web/common/components/Card";

interface ClubDetailCardProps {
  club: ClubDetail;
}

const ClubDetailCardInner = styled(Card)`
  gap: 10px;
`;

const ClubDetailText = styled.div`
  width: 100%;
  font-size: 16px;
  line-height: 28px;
  font-weight: 400;
`;

const ClubDetailCard: React.FC<ClubDetailCardProps> = ({ club }) => (
  <ClubDetailCardInner>
    <ClubDetailText>
      저희 창작동화는 드럼, 베이스, 기타, 키보드, 보컬, 색소폰 등의 세션으로
      구성된 카이스트 유일의 재즈밴드입니다. 1987년 설립된, 유서가 깊고 색깔이
      뚜렷한 동아리입니다. 2019년부터는 서울대, 연세대, 고려대, 성균관대,
      이화여대, 항공대의 총 6개 대학의 중앙 재즈 동아리와 연합하여 활동을
      전개하고 있습니다. ‘재즈’ 밴드라고 해서 어려운 노래, 모르는 노래만 할
      것이라는 생각을 가질 수도 있지만 저희 동아리는 스탠다드 재즈 뿐 아니라
      Funk, R&B, Blues(블루스), Soul 등 기분이 JAZZY는 다양한 장르의 노래를
      소화하고 있습니다. 한 마디로 은은한 조명에 잘 어울리는 그루비한 곡들을
      한다고 생각하시면 됩니다! 뿐만 아니라, 창작동화라는 밴드 이름에 걸맞게
      수준 높은 자작곡을 직접 만들어 공연하기도 합니다.
      {club.id}
    </ClubDetailText>
  </ClubDetailCardInner>
);

export default ClubDetailCard;
