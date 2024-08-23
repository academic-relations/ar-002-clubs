import React, { useState } from "react";

import { overlay } from "overlay-kit";
import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import EditActivityTermModal, {
  ActivityTermProps,
} from "./_atomic/EditActivityTermModal";

const ActivityTermArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 8px 12px;
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
  border-radius: 4px;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme }) => theme.colors.BLACK};
  background-color: ${({ theme }) => theme.colors.WHITE};
  &:hover {
    cursor: pointer;
  }
`;

const ActivityTermContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  flex-grow: 1;
`;

const SelectActivityTerm = () => {
  const [activityTermList, setActivityTermList] = useState<ActivityTermProps[]>(
    [],
  );

  const handleTerm = () => {
    overlay.open(({ isOpen, close }) => {
      const handleConfirm = (terms: ActivityTermProps[]) => {
        setActivityTermList(terms);
        close();
      };

      return (
        <EditActivityTermModal
          initialData={
            activityTermList.length > 0
              ? activityTermList
              : [{ startDate: "", endDate: "" }]
          }
          isOpen={isOpen}
          onClose={close}
          onConfirm={handleConfirm}
        />
      );
    });
  };

  return (
    <FlexWrapper
      direction="column"
      gap={4}
      style={{
        width: "100%",
      }}
    >
      <Typography fw="MEDIUM" fs={16} lh={20}>
        활동 기간
      </Typography>
      <ActivityTermArea onClick={handleTerm}>
        <ActivityTermContent>
          {activityTermList.length > 0
            ? `${activityTermList[0].startDate} ~ ${
                activityTermList[0].endDate
              }${activityTermList.length > 1 ? ` 외 ${activityTermList.length - 1}개` : ""}`
            : ""}
        </ActivityTermContent>

        <Typography
          fw="MEDIUM"
          fs={16}
          lh={20}
          color="PRIMARY"
          style={{
            textDecoration: "underline",
          }}
        >
          수정
        </Typography>
      </ActivityTermArea>
    </FlexWrapper>
  );
};

export default SelectActivityTerm;
