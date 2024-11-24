/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

import { ApiSto001RequestBody } from "@sparcs-clubs/interface/api/storage/endpoint/apiSto001";
import { useForm } from "react-hook-form";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import useGetUserProfile from "@sparcs-clubs/web/common/services/getUserProfile";

import StorageNotice from "../component/StorageNotice";

import useCreateStorage from "../service/useCreateStorage";

import StorageForm from "./StorageForm";

const StorageMainFrame: React.FC = () => {
  const [agreement, setAgreement] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(1);

  const formCtx = useForm<ApiSto001RequestBody>({
    mode: "all",
    defaultValues: {
      clubId: 5,
      studentPhoneNumber: "000-0000-0000",
      numberOfBoxes: 0,
    },
  });

  const { data, isLoading, isError } = useGetUserProfile();

  const {
    getValues,
    watch,
    reset,
    formState: { isValid },
  } = formCtx;

  const { mutate: postStorage, isPending: isPostStorage } = useCreateStorage();

  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[
          {
            name: `창고 신청`,
            path: `/storage`,
          },
        ]}
        title="창고 신청"
      />
      {agreement ? (
        <StorageForm
          setAgreement={setAgreement}
          step={activeStep}
          setStep={setActiveStep}
          username={data?.name ?? "유저정보로부터 이름을 가져오지 못했습니다."}
          clubs={data?.clubs ?? []}
          formCtx={formCtx}
        />
      ) : (
        <StorageNotice setAgreement={setAgreement} />
      )}
    </FlexWrapper>
  );
};

export default StorageMainFrame;
