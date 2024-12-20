import React, { useState } from "react";

import { ClubDelegateChangeRequestStatusEnum } from "@sparcs-clubs/interface/common/enum/club.enum";
import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PhoneInput from "@sparcs-clubs/web/common/components/Forms/PhoneInput";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { ChangeRepresentativeModalText } from "@sparcs-clubs/web/constants/changeRepresentative";
import { patchMyDelegateRequest } from "@sparcs-clubs/web/features/my/services/patchMyDelegateRequest";

interface ChangeRepresentativeModalContentProps {
  needPhoneNumber: boolean;
  clubName: string;
  prevRepresentative: string;
  newRepresentative: string;
  phonePlaceholder?: string;
  onClose: () => void;
  refetch: () => void;
  requestId: number;
  setType: (type: "Requested" | "Finished") => void;
}

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ChangeRepresentativeModalContent: React.FC<
  ChangeRepresentativeModalContentProps
> = ({
  needPhoneNumber,
  clubName,
  prevRepresentative,
  newRepresentative,
  phonePlaceholder = "010-XXXX-XXXX",
  onClose,
  refetch,
  requestId,
  setType,
}) => {
  const [errorPhone, setErrorPhone] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");

  // TODO: clb013 014 수정되면 반영
  const onConfirm = () => {
    patchMyDelegateRequest(
      { requestId },
      {
        phoneNumber: phone,
        clubDelegateChangeRequestStatusEnum:
          ClubDelegateChangeRequestStatusEnum.Approved,
      },
    );
    onClose();
    refetch();
    setType("Finished");
  };

  const onReject = () => {
    patchMyDelegateRequest(
      { requestId },
      {
        clubDelegateChangeRequestStatusEnum:
          ClubDelegateChangeRequestStatusEnum.Rejected,
      },
    );
    onClose();
  };

  return (
    <FlexWrapper direction="column" gap={12}>
      <Typography
        fw="MEDIUM"
        fs={16}
        lh={28}
        style={{ whiteSpace: "pre-wrap", textAlign: "center" }}
      >
        {ChangeRepresentativeModalText(
          clubName,
          prevRepresentative,
          newRepresentative,
        )}
      </Typography>
      {needPhoneNumber && (
        <>
          <Typography
            fw="MEDIUM"
            fs={16}
            lh={28}
            style={{ whiteSpace: "pre-wrap", textAlign: "center" }}
          >
            전화번호를 입력해야 동아리 대표자 변경을 승인할 수 있습니다
          </Typography>
          <PhoneInput
            placeholder={phonePlaceholder}
            value={phone}
            onChange={setPhone}
            setErrorStatus={setErrorPhone}
          />
        </>
      )}
      <ButtonWrapper>
        <Button type="outlined" onClick={onClose}>
          취소
        </Button>
        <FlexWrapper direction="row" gap={12}>
          <Button type="outlined" onClick={onReject}>
            거절
          </Button>
          <Button
            type={
              needPhoneNumber && (errorPhone || phone === "")
                ? "disabled"
                : "default"
            }
            onClick={onConfirm}
          >
            승인
          </Button>
        </FlexWrapper>
      </ButtonWrapper>
    </FlexWrapper>
  );
};

export default ChangeRepresentativeModalContent;
