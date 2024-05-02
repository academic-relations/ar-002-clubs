import React from "react";
import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";
import { RentalFrameProps } from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";

const Mat: React.FC<RentalFrameProps & { limit?: number }> = ({
  limit = 99,
  rental,
  setRental,
}) => (
  <ItemNumberInput
    label="돗자리 개수"
    placeholder="0개"
    itemLimit={limit}
    value={rental?.mat ? String(rental?.mat) : undefined}
    handleChange={value =>
      setRental({
        ...rental,
        mat: Number(value),
      })
    }
  />
);

export default Mat;
