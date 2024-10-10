// import React from "react";

// import Radio from "@sparcs-clubs/web/common/components/Radio";
// import Typography from "@sparcs-clubs/web/common/components/Typography";
// import {
//   RentalFrameProps,
//   RentalLimitProps,
// } from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";

// const Vacuum: React.FC<RentalLimitProps> = ({ availableRentals, formCtx }) => {
//   const cordedLimit =
//     availableRentals?.objects.find(item => item.name === "Vacuum Corded")
//       ?.maximum ?? 0;
//   const cordlessLimit =
//     availableRentals?.objects.find(item => item.name === "Vacuum Cordless")
//       ?.maximum ?? 0;

//   return (
//     <>
//       <Typography fs={16} lh={20} fw="MEDIUM">
//         청소기 종류
//       </Typography>
//       <Radio
//         value={rental?.vacuum as string}
//         onChange={value =>
//           setRental({
//             ...rental,
//             vacuum: value as RentalFrameProps["rental"]["vacuum"],
//           })
//         }
//       >
//         <Radio.Option value="cordless" disabled={cordlessLimit === 0}>
//           무선 청소기
//         </Radio.Option>
//         <Radio.Option value="corded" disabled={cordedLimit === 0}>
//           유선 청소기
//         </Radio.Option>
//       </Radio>
//     </>
//   );
// };

// export default Vacuum;
