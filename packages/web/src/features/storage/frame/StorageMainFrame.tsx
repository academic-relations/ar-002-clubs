/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import useGetUserProfile from "@sparcs-clubs/web/common/services/getUserProfile";

import StorageForm from "../component/storageForm";
import StorageNotice from "../component/StorageNotice";

import type { ApiSto001RequestBody } from "@sparcs-clubs/interface/api/storage/endpoint/apiSto001";

const StorageMainFrame: React.FC = () => {
  const { data, isLoading, isError } = useGetUserProfile();
  const [agreement, setAgreement] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(1);
  const [requestForm, setRequestForm] = useState<Partial<ApiSto001RequestBody>>(
    {
      nonStandardItems: [
        {
          name: "",
          fileId: 0,
        },
      ],
    },
  );

  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[{ name: "창고 사용", path: "/storage" }]}
        title="창고 사용"
      />
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        {agreement ? (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <StorageForm
            username={
              data?.name ?? "유저정보로부터 이름을 가져오지 못했습니다."
            }
            clubs={data?.clubs ?? []}
            setAgreement={setAgreement}
            step={activeStep}
            setStep={setActiveStep}
            requestForm={requestForm}
            setRequestForm={setRequestForm}
          />
        ) : (
          <StorageNotice setAgreement={setAgreement} />
        )}
      </AsyncBoundary>
    </FlexWrapper>
  );
};

export default StorageMainFrame;
