import React, { useState } from "react";

import IconButton from "@sparcs-clubs/web/common/components/Buttons/IconButton";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";

import Typography from "@sparcs-clubs/web/common/components/Typography";

import ActivityTermRow from "./ActivityTermRow";

export interface ActivityTermProps {
  startDate: string;
  endDate: string;
}

interface EditActivityTermModalProps {
  initialData: ActivityTermProps[];
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (terms: ActivityTermProps[]) => void;
}

const EditActivityTermModal: React.FC<EditActivityTermModalProps> = ({
  initialData,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [activityTermList, setActivityTermList] =
    useState<ActivityTermProps[]>(initialData);
  const [hasErrorList, setHasErrorList] = useState<boolean[]>(
    Array.from({ length: initialData.length }, () => false),
  );

  const addRow = () => {
    setActivityTermList(prevList => [
      ...prevList,
      { startDate: "", endDate: "" },
    ]);
    setHasErrorList(prevList => [...prevList, false]);
  };

  const handleDelete = (index: number) => {
    const updatedTerms = activityTermList.filter((_, i) => i !== index);
    const updatedErrorList = hasErrorList.filter((_, i) => i !== index);
    setActivityTermList(updatedTerms);
    setHasErrorList(updatedErrorList);
  };

  const handleDateChange = (index: number, start: string, end: string) => {
    const updatedTerms = activityTermList.map((term, i) =>
      i === index ? { startDate: start, endDate: end } : term,
    );
    setActivityTermList(updatedTerms);
  };

  const handleHasErrorList = (index: number, hasError: boolean) => {
    setHasErrorList(prevErrorList => {
      if (prevErrorList[index] !== hasError) {
        const updatedErrorList = prevErrorList.map((error, i) =>
          i === index ? hasError : error,
        );
        return updatedErrorList;
      }
      return prevErrorList;
    });
  };

  const isEmpty = () => activityTermList.length === 0;

  const isSomethingEmpty = () => {
    if (activityTermList.length === 0) {
      return false;
    }
    return activityTermList.some(
      term => term.startDate === "" || term.endDate === "",
    );
  };

  const checkError = () => hasErrorList.some(error => error);

  const handleConfirm = () => {
    if (isEmpty() || isSomethingEmpty() || checkError()) return;

    onConfirm(activityTermList);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CancellableModalContent onClose={onClose} onConfirm={handleConfirm}>
        <FlexWrapper direction="column" gap={12}>
          {activityTermList.map((term, index) => (
            <ActivityTermRow
              key={index}
              index={index}
              startDate={term.startDate}
              endDate={term.endDate}
              onDateChange={handleDateChange}
              onDelete={handleDelete}
              onError={handleHasErrorList}
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
          {isEmpty() && (
            <Typography fw="MEDIUM" fs={12} lh={18} color="RED.600">
              기간을 하나 이상 추가해주세요.
            </Typography>
          )}
          {isSomethingEmpty() && (
            <Typography fw="MEDIUM" fs={12} lh={18} color="RED.600">
              기간을 입력하거나 해당 항목을 삭제해주세요.
            </Typography>
          )}
        </FlexWrapper>
      </CancellableModalContent>
    </Modal>
  );
};

export default EditActivityTermModal;
