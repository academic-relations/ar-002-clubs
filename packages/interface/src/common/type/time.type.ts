import { z } from "zod";

const zWeekTime = z.custom<number>(val => {
  const time = z
    .number()
    .int()
    .min(0)
    .max(24 * 7);
  return typeof time.parse(val) === "number";
});

type WeekTime = z.infer<typeof zWeekTime>;

// zod의 커스텀 타입 Validation test 입니다.
// 168까지 정상적으로 validation한 이후 validationerror를 throw합니다.
const testZWeekTimeValidation = () => {
  for (let i = 0; ; i += 1) {
    console.log(zWeekTime.parse(i));
  }
};

export { zWeekTime, testZWeekTimeValidation };
export type { WeekTime };
