import React, { useEffect, useState } from "react";

import { overlay } from "overlay-kit";
import styled from "styled-components";

import IconButton from "@sparcs-clubs/web/common/components/Buttons/IconButton";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import ActivityTermRow from "@sparcs-clubs/web/features/register-club/components/_atomic/ActivityTermRow";

const ActivityTermArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 8px 12px 8px 12px;
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

interface ActivityTermProps {
  startDate: string;
  endDate: string;
}

const SelectActivityTerm = () => {
  const [activityTermList, setActivityTermList] = useState<ActivityTermProps[]>(
    [],
  );
  const [activityTermTmpList, setActivityTermTmpList] = useState<
    ActivityTermProps[]
  >([
    {
      startDate: "",
      endDate: "",
    },
  ]);

  useEffect(() => {
    console.log(activityTermTmpList);
  }, [activityTermTmpList]);

  useEffect(() => {
    console.log("list:", activityTermList);
  }, [activityTermList]);

  const addRow = () => {
    setActivityTermTmpList([
      ...activityTermTmpList,
      {
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const handleDateChange = (index: number, start: string, end: string) => {
    const updatedTerms = activityTermTmpList.map((term, i) =>
      i === index ? { startDate: start, endDate: end } : term,
    );
    setActivityTermTmpList(updatedTerms);
  };

  const handleTerm = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} onClose={close}>
        <CancellableModalContent
          onClose={() => {
            if (activityTermList.length > 0) {
              setActivityTermTmpList(activityTermList);
            } else {
              setActivityTermTmpList([
                {
                  startDate: "",
                  endDate: "",
                },
              ]);
            }

            close();
          }}
          onConfirm={() => {
            setActivityTermList(activityTermTmpList);
            close();
          }}
        >
          <FlexWrapper direction="column" gap={12} style={{ flex: "1 0 0" }}>
            {activityTermTmpList.map((term, index) => (
              <ActivityTermRow
                key={index}
                index={index}
                startDate={term.startDate}
                endDate={term.endDate}
                onDateChange={handleDateChange}
              />
            ))}
            <IconButton
              icon="add"
              onClick={addRow}
              style={{ backgroundColor: "white", color: "black" }}
              type="outlined"
            >
              활동 기간 추가
            </IconButton>
          </FlexWrapper>
        </CancellableModalContent>
      </Modal>
    ));
  };

  return (
    <FlexWrapper direction="column" gap={4} style={{ width: "100%" }}>
      <Typography fw="MEDIUM" fs={16} lh={20}>
        활동 기간
      </Typography>
      <ActivityTermArea onClick={handleTerm}>
        {activityTermList.length > 0
          ? `${activityTermList[0].startDate} ~ ${
              activityTermList[0].endDate
            }${activityTermList.length > 1 ? ` 외 ${activityTermList.length - 1}개` : ""}`
          : ""}
        <Typography
          fw="MEDIUM"
          fs={16}
          lh={20}
          color="PRIMARY"
          style={{ textDecoration: "underline", paddingLeft: "12px" }}
        >
          수정
        </Typography>
      </ActivityTermArea>
    </FlexWrapper>
  );
};

export default SelectActivityTerm;
