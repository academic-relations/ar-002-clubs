"use client";

import React, { useMemo } from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import { PrtTagList } from "@sparcs-clubs/web/constants/tableTagList";
import MyServiceTable from "@sparcs-clubs/web/features/my/component/MyServiceTable";
import { mockupMyPrint } from "@sparcs-clubs/web/features/my/service/_mock/mockMyClub";
import { formatDateTime } from "@sparcs-clubs/web/utils/Date/formateDate";
import getPrintSize from "@sparcs-clubs/web/utils/getPrintSize";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

const MyPrintingBusiness = () => {
  const contents = useMemo(
    () =>
      mockupMyPrint.items.map(item => {
        const { color, text } = getTagDetail(item.status, PrtTagList);
        return [
          <Tag color={color} key={item.id}>
            {text}
          </Tag>,
          formatDateTime(item.createdAt),
          item.studentName, // TODO: mock data 재사용하면서 student name으로 되어있는데 동아리 이름으로 바꾸기
          formatDateTime(item.desiredPickUpDate),
          `${item.orders
            .sort(
              (a, b) =>
                b.promotionalPrintingSizeEnum - a.promotionalPrintingSizeEnum,
            ) // TODO: 이렇게 하는 대신 그냥 보여주고 싶은 순서랑 enum을 맞추는게 나을 수도 있음
            .map(
              order =>
                `${getPrintSize(order.promotionalPrintingSizeEnum)} ${order.numberOfPrints}매`,
            )
            .join(" ")}`,
        ];
      }),
    [],
  );
  return (
    <FlexWrapper direction="column" gap={20}>
      <PageHead
        items={[
          { name: "마이페이지", path: "/my" },
          { name: "홍보물 인쇄 내역", path: "/my/printing-business" },
        ]}
        title="홍보물 인쇄 내역"
      />
      <MyServiceTable
        headers={[
          { type: "HeaderSort", text: "상태" },
          { type: "Header", text: "신청 일시" },
          { type: "Header", text: "동아리" },
          { type: "Header", text: "수령 일시" },
          { type: "Header", text: "인쇄 매수" },
        ]}
        widths={[10, 25, 15, 25, 25]}
        minWidths={[90, 200, 120, 200, 200]}
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

export default MyPrintingBusiness;
