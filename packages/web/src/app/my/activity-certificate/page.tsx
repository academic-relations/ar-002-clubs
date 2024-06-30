"use client";

import React, { useMemo } from "react";

import { ActivityCertificateOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/activityCertificate.enum";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import MyServiceTable from "@sparcs-clubs/web/features/my/component/MyServiceTable";

import { mockupMyAcf } from "@sparcs-clubs/web/features/my/service/_mock/mockMyClub";
import { formatDateTime } from "@sparcs-clubs/web/utils/Date/formateDate";
import {
  getTagDetail,
  StatusDetail,
} from "@sparcs-clubs/web/utils/getTagDetail";

const MyActivityCertificate = () => {
  const TagList: {
    [key in ActivityCertificateOrderStatusEnum]: StatusDetail;
  } = {
    [ActivityCertificateOrderStatusEnum.Applied]: {
      text: "신청",
      color: "BLUE",
    },
    [ActivityCertificateOrderStatusEnum.Approved]: {
      text: "승인",
      color: "YELLOW",
    },
    [ActivityCertificateOrderStatusEnum.Issued]: {
      text: "발급",
      color: "GREEN",
    },
    [ActivityCertificateOrderStatusEnum.Rejected]: {
      text: "반려",
      color: "RED",
    },
    [ActivityCertificateOrderStatusEnum.Received]: {
      text: "수령",
      color: "GREEN",
    }, // TODO: 수령 따로 필요한지 확인
  };
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
          { type: "Header", text: "상태" },
          { type: "Header", text: "신청 일시" },
          { type: "Header", text: "동아리" },
          { type: "Header", text: "발급 매수" },
        ]}
        widths={[10, 30, 30, 30]}
        minWidths={[90, 180, 180, 180]}
        contents={useMemo(
          () =>
            mockupMyAcf.items.map(item => {
              const { color, text } = getTagDetail(item.statusEnum, TagList);
              return [
                <Tag color={color}>{text}</Tag>,
                formatDateTime(item.createdAt),
                item.studentName, // TODO: mock data 재사용하면서 student name으로 되어있는데 동아리 이름으로 바꾸기
                `${item.issuedNumber}매`,
              ];
            }),
          [],
        )}
        contentsTypes={["Tag", "Default", "Default", "Default"]}
      />
    </FlexWrapper>
  );
};

export default MyActivityCertificate;
