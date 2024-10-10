// import React from "react";

// import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";
// import { RentalLimitProps } from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";

// const Mat: React.FC<RentalLimitProps> = ({ availableRentals, formCtx }) => {
//   const matLimit =
//     availableRentals?.objects.find(item => item.name === "Mat")?.maximum ?? 0;

//   return (
//     <ItemNumberInput
//       label="돗자리 개수"
//       placeholder="0개"
//       itemLimit={matLimit}
//       value={rental?.mat ? String(rental?.mat) : undefined}
//       handleChange={value =>
//         setRental({
//           ...rental,
//           mat: Number(value),
//         })
//       }
//       setErrorStatus={setHasError}
//     />
//   );
// };

// export default Mat;
