import { z } from "zod";

const koreanPhoneNumberRegex = /^010-(\d{4})-(\d{4})$/;

const zKoreanPhoneNumber = z.custom<`${number}-${number}-${number}`>(val =>
  typeof val === "string" ? koreanPhoneNumberRegex.test(val) : false,
);

type KoreanPhoneNumber = z.infer<typeof zKoreanPhoneNumber>;

// 한국 휴대전화 번호 커스텀 타입 테스트입니다.
// 첫 문자열은 validation을 통과하고, 둘째는 통과하지 못합니다.
const testZKoreanPhoneNumber = () => {
  console.log(zKoreanPhoneNumber.parse("010-1234-5678"));
  console.log(zKoreanPhoneNumber.parse("00-123-578"));
};

export { zKoreanPhoneNumber, testZKoreanPhoneNumber };
export type { KoreanPhoneNumber };
