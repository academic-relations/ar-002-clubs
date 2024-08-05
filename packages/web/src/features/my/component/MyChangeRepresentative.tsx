import React from "react";

import isPropValid from "@emotion/is-prop-valid";
import { overlay } from "overlay-kit";
import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Icon from "@sparcs-clubs/web/common/components/Icon";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import {
  myChangeRepresentativeFinishText,
  myChangeRepresentativeRequestText,
} from "@sparcs-clubs/web/constants/changeRepresentative";
import colors from "@sparcs-clubs/web/styles/themes/colors";

import ChangeRepresentativeModalContent from "./ChangeRepresentativeModalContent";

interface MyChangeRepresentativeProps {
  type: "Requested" | "Finished";
  clubName: string;
  prevRepresentative: string;
  newRepresentative: string;
  refetch: () => void;
}

const MyChangeRepresentativeWrapper = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{
  type: MyChangeRepresentativeProps["type"];
}>`
  display: flex;
  flex-direction: row;
  padding: 12px 16px;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid
    ${({ type, theme }) =>
      type === "Requested" ? theme.colors.RED[600] : theme.colors.GREEN[600]};
  background-color: ${({ type, theme }) =>
    type === "Requested" ? theme.colors.RED[100] : theme.colors.GREEN[100]};
`;

const MyChangeRepresentative: React.FC<MyChangeRepresentativeProps> = ({
  type,
  clubName,
  prevRepresentative,
  newRepresentative,
  refetch,
}) => {
  const Title =
    type === "Requested"
      ? "동아리 대표자 변경 요청"
      : "동아리 대표자 변경 완료";
  const Text =
    type === "Requested"
      ? myChangeRepresentativeRequestText(
          clubName,
          prevRepresentative,
          newRepresentative,
        )
      : myChangeRepresentativeFinishText(clubName);

  const openConfirmModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <ChangeRepresentativeModalContent
          needPhoneNumber
          clubName={clubName}
          prevRepresentative={prevRepresentative}
          newRepresentative={newRepresentative}
          onClose={close}
          refetch={refetch}
        />
      </Modal>
    ));
  };

  return (
    <MyChangeRepresentativeWrapper type={type}>
      {type === "Requested" ? (
        <Icon type="error" size={20} color={colors.RED[600]} />
      ) : (
        <Icon type="check_circle" size={20} color={colors.GREEN[600]} />
      )}
      <FlexWrapper direction="column" gap={8}>
        <Typography fw="MEDIUM" fs={16} lh={20}>
          {Title}
        </Typography>
        <Typography fs={16} lh={20} style={{ whiteSpace: "pre-wrap" }}>
          {Text}
        </Typography>
        {type === "Requested" && (
          <Typography
            fs={16}
            lh={20}
            color="GRAY.600"
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={openConfirmModal}
          >
            클릭하여 더보기
          </Typography>
        )}
      </FlexWrapper>
    </MyChangeRepresentativeWrapper>
  );
};

export default MyChangeRepresentative;
