import React from "react";

import { FormProvider, useForm } from "react-hook-form";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import CommonSpaceInfoFrame from "./CommonSpaceInfoFrame";
import CommonSpaceNoticeFrame from "./CommonSpaceNoticeFrame";

import type { CommonSpaceInterface } from "../types/commonSpace";

const CommonSpaceMainFrame: React.FC = () => {
  const formCtx = useForm<CommonSpaceInterface>({
    mode: "all",
    defaultValues: {
      agreement: false,
      phoneNumber: "",
      name: "",
      param: { spaceId: 0 }, // 초기값 명시
      body: { startTerm: undefined, endTerm: undefined, email: "" },
    },
  });
  const { watch } = formCtx;
  const isAgreed = watch("agreement");

  return (
    <FormProvider {...formCtx}>
      <form>
        <FlexWrapper direction="column" gap={60}>
          <PageHead
            items={[{ name: "공용공간 비정기사용", path: "/common-space" }]}
            title="공용공간 비정기사용"
          />
          {isAgreed ? <CommonSpaceInfoFrame /> : <CommonSpaceNoticeFrame />}
        </FlexWrapper>
      </form>
    </FormProvider>
  );
};

export default CommonSpaceMainFrame;
