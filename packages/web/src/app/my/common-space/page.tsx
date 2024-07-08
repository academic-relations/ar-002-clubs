"use client";

import React, { useMemo } from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import { CmsTagList } from "@sparcs-clubs/web/constants/tableTagList";
import MyServiceTable from "@sparcs-clubs/web/features/my/component/MyServiceTable";
import { mockupMyCms } from "@sparcs-clubs/web/features/my/service/_mock/mockMyClub";
import {
  formatDate,
  formatDateTime,
  formatTime,
} from "@sparcs-clubs/web/utils/Date/formateDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

const MyCommonSpace = () => {
  const contents = useMemo(
    () =>
      mockupMyCms.items.map(item => {
        const { color, text } = getTagDetail(item.statusEnum, CmsTagList);
        return [
          <Tag color={color} key={item.orderId}>
            {text}
          </Tag>,
          formatDateTime(item.createdAt),
          item.chargeStudentName, // TODO: mock data 재사용하면서 student name으로 되어있는데 동아리 이름으로 바꾸기
          formatDate(item.startTerm),
          `${formatTime(item.startTerm)}~${formatTime(item.endTerm)}`,
          item.spaceName,
        ];
      }),
    [],
  );
  return (
    <FlexWrapper direction="column" gap={20}>
      <PageHead
        items={[
          { name: "마이페이지", path: "/my" },
          {
            name: "공용공간 비정기사용 내역",
            path: "/my/common-space",
          },
        ]}
        title="공용공간 비정기사용 내역"
      />
      <MyServiceTable
        headers={[
          { type: "HeaderSort", text: "상태" },
          { type: "Header", text: "신청 일시" },
          { type: "Header", text: "동아리" },
          { type: "Header", text: "예약 일자" },
          { type: "Header", text: "예약 시간" },
          { type: "Header", text: "예약 호실" },
        ]}
        widths={[10, 20, 10, 15, 15, 30]}
        minWidths={[90, 180, 120, 180, 180, 200]}
        contents={contents}
        contentsTypes={[
          "Tag",
          "Default",
          "Default",
          "Default",
          "Default",
          "Default",
        ]}
        topComment={`총 ${contents.length}개`}
      />
    </FlexWrapper>
  );
};

export default MyCommonSpace;
