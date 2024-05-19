import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";
import { ZodSchema } from "zod";

class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      console.log(value);
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      throw new BadRequestException(
        `Validation failed, metadata is data: ${metadata.data}, metatype: ${metadata.metatype}, type: ${metadata.type}`,
      );
    }
  }
}

export default ZodValidationPipe;
