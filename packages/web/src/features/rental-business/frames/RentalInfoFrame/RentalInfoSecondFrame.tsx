/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import React, { useState } from "react";

import { overlay } from "overlay-kit";
import styled from "styled-components";

import TextButton from "@sparcs-clubs/web/common/components/Buttons/TextButton";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Info from "@sparcs-clubs/web/common/components/Info";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import Typography from "@sparcs-clubs/web/common/components/Typography";
// import Easel from "@sparcs-clubs/web/features/rental-business/components/Rentals/Easel";
// import HandCart from "@sparcs-clubs/web/features/rental-business/components/Rentals/HandCart";
// import Mat from "@sparcs-clubs/web/features/rental-business/components/Rentals/Mat";
// import Tool from "@sparcs-clubs/web/features/rental-business/components/Rentals/Tool";
// import Vacuum from "@sparcs-clubs/web/features/rental-business/components/Rentals/Vacuum";
import ItemButtonList from "@sparcs-clubs/web/features/rental-business/components/ItemButtonList";
import RentalList from "@sparcs-clubs/web/features/rental-business/components/RentalList";
import SelectRangeCalendar from "@sparcs-clubs/web/features/rental-business/components/SelectRangeCalendar/SelectRangeCalendar";
import { useGetAvailableRentals } from "@sparcs-clubs/web/features/rental-business/service/getAvailableRentals";

import { RentalFrameProps } from "../RentalNoticeFrame";

import { mockExistDates } from "./_atomic/mockExistDate";

const StyledCardInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

const NoneRental: React.FC<RentalFrameProps> = () => <>none</>;

const rentals = {
  none: {
    info: "대충 대여 기간 먼저 선택해야 한다는 안내문구 어딘가에",
    component: NoneRental,
  },
  // easel: {
  //   info: "대충 이젤에 대한 추가 안내사항",
  //   component: Easel,
  // },
  // vacuum: {
  //   info: "대충 청소기에 대한 추가 안내사항",
  //   component: Vacuum,
  // },
  // handCart: {
  //   info: "대충 수레에 대한 추가 안내사항",
  //   component: HandCart,
  // },
  // mat: {
  //   info: "대충 돗자리에 대한 추가 안내사항",
  //   component: Mat,
  // },
  // tool: {
  //   info: "대충 공구에 대한 추가 안내사항",
  //   component: Tool,
  // },
};
const RentalInfoSecondFrame: React.FC<
  RentalFrameProps & { setNextEnabled: (enabled: boolean) => void }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
> = ({ formCtx, setNextEnabled }) => {
  const [value, setValue] = useState<
    "none" | "easel" | "vacuum" | "handCart" | "mat" | "tool"
  >("none");

  const [rentalDate, setRentalDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [pendingDate, setPendingDate] = useState<Date | undefined>();

  // const Rental = rentals[value].component;

  const handleConfirm = (state: "change" | "reset") => {
    if (state === "reset") {
      setRentalDate(undefined);
      setReturnDate(undefined);
    } else if (state === "change") {
      setRentalDate(pendingDate);
      setReturnDate(undefined);
      setPendingDate(undefined);
    }
  };

  const itemOnChange = (
    newValue: "easel" | "vacuum" | "handCart" | "mat" | "tool",
  ) => {
    if (rentalDate && returnDate) {
      setValue(newValue);
    }
  };

  const openPeriodModal = (state: "change" | "reset") => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <CancellableModalContent
          onConfirm={() => {
            handleConfirm(state);
            close();
          }}
          onClose={close}
        >
          대여 기간을 변경하면 입력한 대여 물품 정보가 모두 초기화됩니다.
          <br />
          ㄱㅊ?
        </CancellableModalContent>
      </Modal>
    ));
  };

  return (
    <>
      <Card outline gap={40}>
        <Typography fs={20} lh={24} fw="MEDIUM">
          대여 기간 선택
        </Typography>
        <SelectRangeCalendar
          rentalDate={rentalDate}
          returnDate={returnDate}
          setRentalDate={setRentalDate}
          setReturnDate={setReturnDate}
          workDates={mockExistDates}
          // TODO: 상근일자 받아오기
          openPeriodModal={openPeriodModal}
          pendingDate={pendingDate}
          setPendingDate={setPendingDate}
          // isRentalListEmpty={isRentalListEmpty()}
          isRentalListEmpty={false}
        />
      </Card>
      <ItemButtonList value={value} onChange={itemOnChange} />
      {/* <Info text={rentals[value].info} /> */}
      {value !== "none" && (
        <Card outline gap={40}>
          <StyledCardInner>
            {/* TODO: width 100 필요한지 확인 */}
            <FlexWrapper direction="row" gap={20}>
              <Typography fs={20} lh={24} fw="MEDIUM" style={{ flexGrow: 1 }}>
                세부 물품 정보
              </Typography>
              <TextButton
                text="초기화"
                // disabled={isCurrentItemEmpty()}
                // onClick={handleResetCurrent}
              />
            </FlexWrapper>
            {/* <Rental
              rentalDate={rentalDate ?? new Date()}
              returnDate={returnDate ?? new Date()}
              setHasError={setHasError}
              {...props}
            /> */}
          </StyledCardInner>
        </Card>
      )}
      <Card outline gap={40}>
        <StyledCardInner>
          <FlexWrapper direction="row" gap={20}>
            <Typography fs={20} lh={24} fw="MEDIUM" style={{ flexGrow: 1 }}>
              대여 물품 목록
            </Typography>
            <TextButton
              text="초기화"
              // disabled={isRentalListEmpty()}
              // onClick={handleResetAll}
            />
          </FlexWrapper>
          <RentalList formCtx={formCtx} />
        </StyledCardInner>
      </Card>
    </>
  );
};

export default RentalInfoSecondFrame;
