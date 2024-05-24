import React from "react";
import { SectionWrapper } from "@sparcs-clubs/web/features/manage-club/component/ManageFrameWrapper";
import BreadCrumb from "@sparcs-clubs/web/common/components/BreadCrumb";
import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";
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

const ManageCommonSpaceDetailFrame = () => {
  const router = useRouter();
  const onClick = () => {
    router.push("/manage-club/common-space");
  };
  return (
    <SectionWrapper>
      <BreadCrumb
        items={[
          { name: "대표 동아리 관리", path: "/manage-club" },
          {
            name: "공용공간 비정기사용 내역",
            path: "/manage-club/common-space",
          },
        ]}
        enableLast
      />
      <PageTitle>공용공간 비정기사용 내역</PageTitle>
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
            labels={["신청 완료", "사용 대기"]}
            status={[Status.Approved]}
            dates={[new Date()]}
          />
          <Info text="사용 일시가 지나기 전까지 신청을 취소할 수 있습니다" />
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
            예약 공간
          </Typography>
          <Typography ff="PRETENDARD" fs={16} lh={20} color="BLACK">
            제1공용동아리방 (태울관 2101호), 3/27(수) 17:00 ~ 20:00 (3시간)
          </Typography>
        </RowTextWrapper>
      </Card>
      <Button style={{ width: "max-content" }} onClick={onClick}>
        목록으로 돌아가기
      </Button>
    </SectionWrapper>
  );
};
export default ManageCommonSpaceDetailFrame;