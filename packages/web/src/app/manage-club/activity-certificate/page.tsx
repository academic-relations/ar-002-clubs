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

const ManageClubActivityCertificate = () => (
  <>
    <PageHeadWrapper>
      <BreadCrumb
        items={[
          { name: "대표 동아리 관리", path: "/manage-club" },
          {
            name: "활동확인서 발급 내역",
            path: "/manage-club/activity-certificate",
          },
        ]}
      />
      <PageTitle>활동확인서 발급 내역</PageTitle>
    </PageHeadWrapper>
    <ManageClubTableMainFrame pageType="activity-certificate" />
  </>
);

export default ManageClubActivityCertificate;
