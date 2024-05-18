import { PipeTransform, ArgumentMetadata } from "@nestjs/common";
import { ZodSchema } from "zod";

interface RequestZodSchema {
  requestParam: ZodSchema;
  requestQuery: ZodSchema;
  requestBody: ZodSchema;
}

export class ZodPipe implements PipeTransform {
  constructor(private schema: RequestZodSchema) {}

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
