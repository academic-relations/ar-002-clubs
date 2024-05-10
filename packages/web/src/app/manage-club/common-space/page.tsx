"use client";

import React from "react";

import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";
import BreadCrumb from "@sparcs-clubs/web/common/components/BreadCrumb";
import styled from "styled-components";
import ManageClubTableMainFrame from "@sparcs-clubs/web/features/manageClubTable/frames/ManageClubTableMainFrame";

const PageHeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ManageClubCommonSpace = () => (
  <>
    <PageHeadWrapper>
      <BreadCrumb
        items={[
          { name: "대표 동아리 관리", path: "/manage-club" },
          {
            name: "공용공간 비정기사용 내역",
            path: "/manage-club/common-space",
          },
        ]}
      />
      <PageTitle>공용공간 비정기사용 내역</PageTitle>
    </PageHeadWrapper>
    <ManageClubTableMainFrame pageType="common-space" />
  </>
);

export default ManageClubCommonSpace;
