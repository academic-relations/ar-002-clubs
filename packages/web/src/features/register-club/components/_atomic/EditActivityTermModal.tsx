import React, { useState } from "react";

import IconButton from "@sparcs-clubs/web/common/components/Buttons/IconButton";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";

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

  const addRow = () => {
    setActivityTermList(prevList => [
      ...prevList,
      { startDate: "", endDate: "" },
    ]);
  };

  const handleDelete = (index: number) => {
    const updatedTerms = activityTermList.filter((_, i) => i !== index);
    setActivityTermList(updatedTerms);
  };

  const handleDateChange = (index: number, start: string, end: string) => {
    const updatedTerms = activityTermList.map((term, i) =>
      i === index ? { startDate: start, endDate: end } : term,
    );
    setActivityTermList(updatedTerms);
  };

  const checkChange = () => {
    const differentTerms = activityTermList.filter((term, index) => {
      if (initialData.length <= index) {
        return true;
      }
      const initialTerm = initialData[index];
      return (
        term.startDate !== initialTerm.startDate ||
        term.endDate !== initialTerm.endDate
      );
    });
    return differentTerms.length > 0;
  };

  const handleConfirm = () => {
    onConfirm(activityTermList);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CancellableModalContent
        onClose={onClose}
        onConfirm={handleConfirm}
        disabled={checkChange()}
      >
        <FlexWrapper direction="column" gap={12}>
          {activityTermList.map((term, index) => (
            <ActivityTermRow
              key={index}
              index={index}
              startDate={term.startDate}
              endDate={term.endDate}
              onDateChange={handleDateChange}
              onDelete={handleDelete}
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
  );
};

export default EditActivityTermModal;
