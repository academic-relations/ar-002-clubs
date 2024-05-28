import React from "react";
import { FrameWrapper } from "@sparcs-clubs/web/features/manage-club/component/ManageFrameWrapper";
import Card from "@sparcs-clubs/web/common/components/Card";
import Button from "@sparcs-clubs/web/common/components/Button";
import {
  ColumnTextWrapper,
  ProgressCheckSectionWrapper,
  RowTextWrapper,
} from "@sparcs-clubs/web/common/components/ProgressCheckSection/ProgressCheckSectionWrapper";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import ProgressCheckSection from "@sparcs-clubs/web/common/components/ProgressCheckSection";
import { Status } from "@sparcs-clubs/web/common/components/ProgressCheckSection/_atomic/ProgressDot";
import Info from "@sparcs-clubs/web/common/components/Info";
import {
  ListContainer,
  ListItem,
} from "@sparcs-clubs/web/common/components/ListItem";
import { useRouter } from "next/navigation";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

const ManageRentalDetailFrame = () => {
  const router = useRouter();
  const onClick = () => {
    router.push("/manage-club/rental-business");
  };
  return (
    <FrameWrapper>
      <PageHead
        items={[
          { name: "대표 동아리 관리", path: "/manage-club" },
          {
            name: "대여 사업 신청 내역",
            path: "/manage-club/rental-business",
          },
        ]}
        title="대여 사업 신청 내역"
        enableLast
      />
      <Card outline gap={20}>
        {/* TODO: 너무 길다면.. 나중에 컴포넌트로 따로 빼기 */}
        <ProgressCheckSectionWrapper>
          <Typography
            ff="PRETENDARD"
            fw="MEDIUM"
            fs={16}
            lh={20}
            color="BLACK"
            style={{ width: "100%" }}
          >
            신청 상태
          </Typography>
          <ProgressCheckSection
            labels={[
              "신청 완료",
              "동아리 연합회 승인 대기",
              "대여 대기",
              "반납 대기",
            ]}
            status={[Status.Approved]}
            dates={[new Date()]}
          />
          <Info text="승인이 완료되기 전까지 신청을 취소할 수 있습니다" />
          <Button style={{ width: "max-content" }}>신청 취소</Button>
          {/* TODO: onClick 달기 */}
        </ProgressCheckSectionWrapper>
        {/* TODO: 아래 정보들 백 연결하기 */}
        <ColumnTextWrapper>
          <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
            신청자 정보
          </Typography>
          <ListContainer>
            <ListItem>동아리: 술박스</ListItem>
            <ListItem>담당자: 이지윤</ListItem>
            <ListItem>연락처: 010-0000-0000</ListItem>
          </ListContainer>
        </ColumnTextWrapper>
        <RowTextWrapper>
          <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
            대여 기간
          </Typography>
          <Typography ff="PRETENDARD" fs={16} lh={20} color="BLACK">
            2024년 3월 11일 (월) ~ 2024년 3월 18일 (월)
          </Typography>
        </RowTextWrapper>
        <ColumnTextWrapper>
          <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
            대여 물품
          </Typography>
          <ListContainer>
            <ListItem>이젤 3개</ListItem>
            <ListItem>돗자리 3개</ListItem>
            <ListItem>공구 {">"} 드라이버 세트 3개</ListItem>
            <ListItem>공구 {">"} 롱노우즈 3개</ListItem>
          </ListContainer>
        </ColumnTextWrapper>
        <ColumnTextWrapper>
          <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
            대여 목적
          </Typography>
          <ListContainer>
            <ListItem>
              대충 어떤 목적을 적었겠죠? 이게 아주아주 길어질 수도 있으려나 일단
              이 정도의 길이는 될 수 있을 것 같아요
            </ListItem>
          </ListContainer>
        </ColumnTextWrapper>
      </Card>
      <Button style={{ width: "max-content" }} onClick={onClick}>
        목록으로 돌아가기
      </Button>
    </FrameWrapper>
  );
};
export default ManageRentalDetailFrame;
