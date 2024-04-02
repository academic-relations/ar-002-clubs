import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { ZodSchema } from "zod";

@Injectable()
export class ClubZodPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    if (metadata.type === "body") {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    }
    return value;
  }
}
