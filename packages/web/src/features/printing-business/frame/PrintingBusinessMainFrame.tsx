import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";

import _postBusinessPrintingOrder from "@sparcs-clubs/web/features/printing-business/service/postBusinessPrintingOrder";
import type {
  ApiPrt002RequestParam,
  ApiPrt002RequestBody,
} from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt002";

import PrintingBusinessNotice from "@sparcs-clubs/web/features/printing-business/component/PrintingBusinessNotice";
import PrintingBusinessForm from "../component/PrintingBusinessForm";

const PrintingBusinessMainFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const PrintingBusinessMainFrame: React.FC = () => {
  // state 설명
  // agreement: 정확히는 동의 체크가 아니라 동의 체크 후 다음 클릭시 true로 바뀌어 Form을 렌더링합니다
  // activeStep: 현재 작성중인 Form step 체크용입니다
  // requestForm: 인터페이스에서 요구하는 RequestForm에 Partial을 씌웠습니다
  // requestParam: 마찬가지입니다.
  const [agreement, setAgreement] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(1);
  const [requestParam, setRequestParam] = useState<
    Partial<ApiPrt002RequestParam>
  >({});
  const [requestForm, setRequestForm] = useState<Partial<ApiPrt002RequestBody>>(
    {},
  );

  // 디버깅용 출력입니다
  useEffect(() => {
    console.log(
      "[PrintingBusinessMainFrame]some state is changed to\n",
      agreement,
      activeStep,
      requestParam,
      requestForm,
    );
  }, [agreement, activeStep, requestParam, requestForm]);

  return (
    <PrintingBusinessMainFrameInner>
      <PageTitle>홍보물 인쇄</PageTitle>
      {agreement ? (
        <PrintingBusinessForm
          setAgreement={setAgreement}
          step={activeStep}
          setStep={setActiveStep}
          requestParam={requestParam}
          setRequestParam={setRequestParam}
          requestForm={requestForm}
          setRequestForm={setRequestForm}
        />
      ) : (
        <PrintingBusinessNotice setAgreement={setAgreement} />
      )}
    </PrintingBusinessMainFrameInner>
  );
};

export default PrintingBusinessMainFrame;
