"use client";

import React, { useMemo } from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import { AcfTagList } from "@sparcs-clubs/web/constants/tableTagList";
import MyServiceTable from "@sparcs-clubs/web/features/my/component/MyServiceTable";

import { mockupMyAcf } from "@sparcs-clubs/web/features/my/service/_mock/mockMyClub";
import { formatDateTime } from "@sparcs-clubs/web/utils/Date/formateDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

const MyActivityCertificate = () => {
  const contents = useMemo(
    () =>
      mockupMyAcf.items.map(item => {
        const { color, text } = getTagDetail(item.statusEnum, AcfTagList);
        return [
          <Tag color={color} key={item.orderId}>
            {text}
          </Tag>,
          formatDateTime(item.createdAt),
          item.studentName, // TODO: mock data 재사용하면서 student name으로 되어있는데 동아리 이름으로 바꾸기
          `${item.issuedNumber}매`,
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
            name: "활동확인서 발급 내역",
            path: "/my/activity-certificate",
          },
        ]}
        title="활동확인서 발급 내역"
      />
      <MyServiceTable
        headers={[
          { type: "HeaderSort", text: "상태" },
          { type: "Header", text: "신청 일시" },
          { type: "Header", text: "동아리" },
          { type: "Header", text: "발급 매수" },
        ]}
        widths={[10, 30, 30, 30]}
        minWidths={[90, 180, 180, 180]}
        contents={contents}
        contentsTypes={["Tag", "Default", "Default", "Default"]}
        topComment={`총 ${contents.length}개`}
      />
    </FlexWrapper>
  );
};

export default MyActivityCertificate;
