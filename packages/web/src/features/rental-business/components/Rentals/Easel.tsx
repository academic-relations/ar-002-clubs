import React from "react";
import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";
import { RentalFrameProps } from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";

const Easel: React.FC<RentalFrameProps & { limit?: number }> = ({
  limit = 99,
  rental,
  setRental,
}) => (
  <ItemNumberInput
    label="이젤 개수"
    placeholder="0개"
    itemLimit={limit}
    value={rental?.easel ? String(rental?.easel) : undefined}
    handleChange={value =>
      setRental({
        ...rental,
        easel: Number(value),
      })
    }
  />
);

export default Easel;
