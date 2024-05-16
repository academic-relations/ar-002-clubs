import { z } from "zod";

const krPhoneNumberRegex = /^010-(\d{4})-(\d{4})$/;

const zKrPhoneNumber = z.custom<string>(val =>
  typeof val === "string" ? krPhoneNumberRegex.test(val) : false,
);

type KrPhoneNumber = z.infer<typeof zKrPhoneNumber>;

// 한국 휴대전화 번호 커스텀 타입 테스트입니다.
// 첫 문자열은 validation을 통과하고, 둘째는 통과하지 못합니다.
const testZKrPhoneNumber = () => {
  console.log(zKrPhoneNumber.parse("010-1234-5678"));
  console.log(zKrPhoneNumber.parse("00-123-578"));
};

export { zKrPhoneNumber, testZKrPhoneNumber };
export type { KrPhoneNumber };
