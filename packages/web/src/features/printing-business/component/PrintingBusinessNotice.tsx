import React, { useState } from "react";
import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import CheckboxOption from "@sparcs-clubs/web/common/components/CheckboxOption";
import StyledBottom from "@sparcs-clubs/web/common/components/StyledBottom";
import Typography from "@sparcs-clubs/web/common/components/Typography";

// 공지사항을 단순이 디스플레이하는 덤 컴포넌트라고 생각되어 컴포넌트단에서 구현했습니다.
// 후에 공지 수정 기능이 추가되면 frame으로 옮기거나 속성을 추가해야 할 것 같아요.
// rental-business의 RentalNoticeFrame 수정하여 활용했습니다

interface PrintingBusinessNoticeProps {
  setAgreement: React.Dispatch<React.SetStateAction<boolean>>;
}

const PrintingBusinessNoticeInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const PrintingBusinessNotice: React.FC<PrintingBusinessNoticeProps> = ({
  setAgreement,
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <PrintingBusinessNoticeInner>
      <Card outline gap={16}>
        <Typography fs={20} lh={24} fw="MEDIUM">
          안내사항
        </Typography>
        <Typography fs={16} lh={32} fw="REGULAR">
          동연 소속 회원 모두 홍보물 신청 가능~ 한 번의 신청은 하나의 파일에
          대해서만 가능~
          <br />
          기타 등등 안내 내용 -{">"} 이건 동연 측에서 준비해주겠죠?
        </Typography>
      </Card>
      <StyledBottom>
        <CheckboxOption
          checked={checked}
          onClick={() => setChecked(prev => !prev)}
          optionText="위의 안내사항을 모두 숙지하였으며, 이에 동의합니다"
        />
        <Button
          type={checked ? "default" : "disabled"}
          onClick={() => setAgreement(true)}
        >
          다음
        </Button>
      </StyledBottom>
    </PrintingBusinessNoticeInner>
  );
};

export default PrintingBusinessNotice;
