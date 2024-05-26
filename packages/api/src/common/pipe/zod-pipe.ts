import { PipeTransform, ArgumentMetadata } from "@nestjs/common";
import { ZodSchema } from "zod";

interface RequestZodSchema {
  requestParam: ZodSchema;
  requestQuery: ZodSchema;
  requestBody: ZodSchema;
}

export class ZodPipe implements PipeTransform {
  constructor(private schema: RequestZodSchema) {}

  /*
  요약
  - request의 param, query, body를 zod타입에 맞게 cast하고 validation하는 역할
  작업 과정
  1. interface의 attribute에 coerce 추가
  2. controller에 @UsePipes(new ZodPipe(apiRnt001))와 같은 형태로 데코레이터 추가
  3. controller에서 @Param(), @Query(), @Body()로 pipe 적용
  */
  transform(value: unknown, metadata: ArgumentMetadata) {
    const schemaMap: Record<string, ZodSchema> = {
      param: this.schema.requestParam,
      query: this.schema.requestQuery,
      body: this.schema.requestBody,
    }; // custom type이 없다고 가정.
    const schema = schemaMap[metadata.type];
    return schema.parse(value);
  }
}
