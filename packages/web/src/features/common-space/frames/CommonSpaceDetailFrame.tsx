import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import {
  ListContainer,
  ListItem,
} from "@sparcs-clubs/web/common/components/ListItem";
import Typography from "@sparcs-clubs/web/common/components/Typography";

const CommonSpaceDetailFrame = () => (
  <FlexWrapper direction="column" gap={20}>
    {/* TODO: 아래 정보들 백 연결하기 */}
    <FlexWrapper direction="column" gap={16}>
      <Typography fw="MEDIUM" fs={16} lh={20}>
        신청자 정보
      </Typography>
      <ListContainer>
        <ListItem>동아리: 술박스</ListItem>
        <ListItem>담당자: 이지윤</ListItem>
        <ListItem>연락처: 010-0000-0000</ListItem>
      </ListContainer>
    </FlexWrapper>
    <FlexWrapper direction="row" gap={16}>
      <Typography fw="MEDIUM" fs={16} lh={20}>
        예약 공간
      </Typography>
      <Typography fs={16} lh={20}>
        제1공용동아리방 (태울관 2101호), 3/27(수) 17:00 ~ 20:00 (3시간)
      </Typography>
    </FlexWrapper>
  </FlexWrapper>
);
export default CommonSpaceDetailFrame;
