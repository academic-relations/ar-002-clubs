import React from "react";

import isPropValid from "@emotion/is-prop-valid";
import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Icon from "@sparcs-clubs/web/common/components/Icon";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import {
  myChangeRepresentativeFinishText,
  myChangeRepresentativeRequestText,
} from "@sparcs-clubs/web/constants/changeRepresentative";
import colors from "@sparcs-clubs/web/styles/themes/colors";

interface MyChangeRepresentativeProps {
  type: "Requested" | "Finished";
  clubName: string;
  prevRepresentative: string;
  newRepresentative: string;
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

  return (
    <MyChangeRepresentativeWrapper type={type}>
      {type === "Requested" ? (
        <Icon type="error" size={20} color={colors.RED[600]} />
      ) : (
        <Icon type="check_circle" size={20} color={colors.GREEN[600]} />
      )}
      <FlexWrapper direction="column" gap={8}>
        <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
          {Title}
        </Typography>
        <Typography
          ff="PRETENDARD"
          fw="REGULAR"
          fs={16}
          lh={20}
          color="BLACK"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {Text}
        </Typography>
        {type === "Requested" && (
          <Typography
            ff="PRETENDARD"
            fw="REGULAR"
            fs={16}
            lh={20}
            color="GRAY.600"
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            클릭하여 더보기
          </Typography>
        )}
      </FlexWrapper>
    </MyChangeRepresentativeWrapper>
  );
};

export default MyChangeRepresentative;
