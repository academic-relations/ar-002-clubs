import { z } from "zod";

// 공용공간을 특정 분류기준을 통해 분류해야할 경우를 대비하여 생성한 열거형입니다.
enum CommonSpace {
  NotUsed,
}

const commonSpaceEnum = z.nativeEnum(CommonSpace);

export { CommonSpace, commonSpaceEnum };
