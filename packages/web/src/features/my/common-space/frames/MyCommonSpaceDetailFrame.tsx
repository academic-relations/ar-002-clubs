import { useRouter } from "next/navigation";
import React from "react";

import { CommonSpaceUsageOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/commonSpace.enum";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import {
  ListContainer,
  ListItem,
} from "@sparcs-clubs/web/common/components/ListItem";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import MyCommonSpaceProgress from "@sparcs-clubs/web/features/my/common-space/components/MyCommonSpaceProgress";

const MyCommonSpaceDetailFrame = () => {
  const router = useRouter();
  const onClick = () => {
    router.push("/my/common-space");
  };
  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[
          { name: "마이페이지", path: "/my" },
          {
            name: "공용공간 비정기사용 내역",
            path: "/my/common-space",
          },
        ]}
        title="공용공간 비정기사용 내역"
        enableLast
      />
      <Card outline gap={20}>
        <MyCommonSpaceProgress
          status={CommonSpaceUsageOrderStatusEnum.Applied}
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
        <FlexWrapper direction="row" gap={16}>
          <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
            예약 공간
          </Typography>
          <Typography ff="PRETENDARD" fs={16} lh={20} color="BLACK">
            제1공용동아리방 (태울관 2101호), 3/27(수) 17:00 ~ 20:00 (3시간)
          </Typography>
        </FlexWrapper>
      </Card>
      <Button style={{ width: "max-content" }} onClick={onClick}>
        목록으로 돌아가기
      </Button>
    </FlexWrapper>
  );
};
export default MyCommonSpaceDetailFrame;
