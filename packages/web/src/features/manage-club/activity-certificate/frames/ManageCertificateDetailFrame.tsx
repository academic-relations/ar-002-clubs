import React from "react";
import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import {
  ListContainer,
  ListItem,
} from "@sparcs-clubs/web/common/components/ListItem";
import Typography from "@sparcs-clubs/web/common/components/Typography";

const ActivityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 24px;
`;

const ManageCertificateDetailFrame = () => (
  <FlexWrapper direction="column" gap={20}>
    {/* TODO: 아래 정보들 백 연결하기 */}
    <FlexWrapper direction="column" gap={16}>
      <Typography fw="MEDIUM" fs={16} lh={20}>
        신청자 정보
      </Typography>
      <ListContainer>
        <ListItem>이름: 이지윤</ListItem>
        <ListItem>학과: 전산학부</ListItem>
        <ListItem>학번: 20200510</ListItem>
        <ListItem>연락처: 010-0000-0000</ListItem>
      </ListContainer>
    </FlexWrapper>
    <FlexWrapper direction="column" gap={16}>
      <Typography fw="MEDIUM" fs={16} lh={20}>
        활동확인서 발급 신청 정보{" "}
      </Typography>
      <ListContainer>
        <ListItem>
          동아리: 술박스(2021년 9월 ~ 2023년 6월, 2024년 3월 ~), 3매
        </ListItem>
        <ListItem>활동 기간: 2021년 9월 ~ 2023년 6월, 2024년 3월 ~</ListItem>
        <ListItem>발급 매수: 3매</ListItem>
        <ListItem>활동 내역</ListItem>
        <ActivityWrapper>
          <FlexWrapper direction="row" gap={12}>
            <Typography fw="REGULAR" fs={16} lh={20}>
              2021년 9월 ~ 2021년 12월
            </Typography>
            <Typography fw="REGULAR" fs={16} lh={20}>
              신입생 세미나 이수
            </Typography>
          </FlexWrapper>
          {/* TODO: 나중에 list로 활동 내역 추가 */}
        </ActivityWrapper>
      </ListContainer>
    </FlexWrapper>
  </FlexWrapper>
);
export default ManageCertificateDetailFrame;
