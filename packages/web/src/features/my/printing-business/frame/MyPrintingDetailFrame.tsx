import React from "react";

import { useRouter } from "next/navigation";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import {
  ListContainer,
  ListItem,
} from "@sparcs-clubs/web/common/components/ListItem";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import { Status } from "@sparcs-clubs/web/common/components/ProgressCheckSection/_atomic/ProgressDot";
import ProgressStatus from "@sparcs-clubs/web/common/components/ProgressStatus";
import Typography from "@sparcs-clubs/web/common/components/Typography";

const MyPrintingDetailFrame = () => {
  const router = useRouter();
  const onClick = () => {
    router.push("/my/printing-business");
  };
  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[
          { name: "마이페이지", path: "/my" },
          {
            name: "홍보물 인쇄 내역",
            path: "/my/printing-business",
          },
        ]}
        title="홍보물 인쇄 내역"
        enableLast
      />
      <Card outline gap={20}>
        <ProgressStatus
          labels={[
            "신청 완료",
            "동아리 연합회 승인 대기",
            "출력 대기",
            "수령 대기",
          ]}
          progress={[{ status: Status.Approved, date: new Date() }]}
          infoText="승인이 완료되기 전까지 신청을 취소할 수 있습니다"
          optional={<Button style={{ width: "max-content" }}>신청 취소</Button>}
        />
        {/* TODO: 아래 정보들 백 연결하기 */}
        <FlexWrapper direction="column" gap={16}>
          <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
            신청자 정보
          </Typography>
          <ListContainer>
            <ListItem>동아리: 술박스</ListItem>
            <ListItem>담당자: 이지윤</ListItem>
            <ListItem>연락처: 010-0000-0000</ListItem>
          </ListContainer>
        </FlexWrapper>
        <FlexWrapper direction="column" gap={16}>
          <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
            대여 물품
          </Typography>
          <ListContainer>
            <ListItem>A3용지 3매</ListItem>
            <ListItem>A4용지 3매</ListItem>
            <ListItem>
              색상: 컬러 / 크기: 용지에 맞춤 / 마무리 작업: 없음
            </ListItem>
          </ListContainer>
        </FlexWrapper>
        <FlexWrapper direction="column" gap={16}>
          <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
            인쇄 목적
          </Typography>
          <ListContainer>
            <ListItem>
              대충 어떤 목적을 적었겠죠? 이게 아주아주 길어질 수도 있으려나 일단
              이 정도의 길이는 될 수 있을 것 같아요
            </ListItem>
          </ListContainer>
        </FlexWrapper>
        <FlexWrapper direction="row" gap={16}>
          <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
            수령 일시
          </Typography>
          <Typography ff="PRETENDARD" fs={16} lh={20} color="BLACK">
            2024년 3월 11일 (월) 21:00
          </Typography>
        </FlexWrapper>
      </Card>
      <Button style={{ width: "max-content" }} onClick={onClick}>
        목록으로 돌아가기
      </Button>
    </FlexWrapper>
  );
};
export default MyPrintingDetailFrame;
