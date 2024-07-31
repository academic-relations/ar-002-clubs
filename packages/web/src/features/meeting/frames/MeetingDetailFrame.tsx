import React from "react";

import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import Typography from "@sparcs-clubs/web/common/components/Typography";

import { mockupData } from "../services/_mock/mockupMeetingDetail";

const RowStretchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;
// TODO. api 연결
const MeetingDetailFrame: React.FC = () => (
  <FlexWrapper direction="column" gap={60}>
    <PageHead
      items={[{ name: "의결기구", path: `/meeting` }]}
      title={mockupData.title}
      enableLast
    />
    <Card outline>
      <Typography
        ff="PRETENDARD"
        fs={16}
        fw="REGULAR"
        lh={20}
        style={{ whiteSpace: "pre-line" }}
      >
        {mockupData.content}
      </Typography>
    </Card>
    <RowStretchWrapper>
      <Button type="default">목록으로 돌아가기</Button>
      <FlexWrapper direction="row" gap={10}>
        <Button type="default">삭제</Button>
        <Button type="default">수정</Button>
      </FlexWrapper>
    </RowStretchWrapper>
  </FlexWrapper>
);

export default MeetingDetailFrame;
