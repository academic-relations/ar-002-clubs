"use client";

import React, { useMemo } from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import { RntTagList } from "@sparcs-clubs/web/constants/tableTagList";
import MyServiceTable from "@sparcs-clubs/web/features/my/component/MyServiceTable";
import { mockupMyRental } from "@sparcs-clubs/web/features/my/service/_mock/mockMyClub";
import {
  formatDate,
  formatDateTime,
} from "@sparcs-clubs/web/utils/Date/formateDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

const MyRentalBusiness = () => {
  const contents = useMemo(
    () =>
      mockupMyRental.items.map(item => {
        const { color, text } = getTagDetail(item.statusEnum, RntTagList);
        return [
          <Tag color={color} key={item.id}>
            {text}
          </Tag>,
          formatDateTime(item.createdAt),
          item.studentName, // TODO: mock data 재사용하면서 student name으로 되어있는데 동아리 이름으로 바꾸기
          formatDate(item.desiredStart),
          formatDate(item.desiredEnd),
          `${item.objects[0].name} ${item.objects[0].number}개 외 ${item.objects.length}항목`,
        ];
      }),
    [],
  );
  return (
    <FlexWrapper direction="column" gap={20}>
      <PageHead
        items={[
          { name: "마이페이지", path: "/my" },
          { name: "대여 사업 신청 내역", path: "/my/rental-business" },
        ]}
        title="대여 사업 신청 내역"
      />
      <MyServiceTable
        headers={[
          { type: "Header", text: "상태" },
          { type: "Header", text: "신청 일시" },
          { type: "Header", text: "동아리" },
          { type: "Header", text: "대여 일자" },
          { type: "Header", text: "반납 일자" },
          { type: "Header", text: "대여 물품" },
        ]}
        widths={[10, 20, 10, 20, 20, 20]}
        minWidths={[90, 180, 90, 180, 180, 180]}
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

export default MyRentalBusiness;
