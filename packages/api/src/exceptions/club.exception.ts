import { HttpException, HttpStatus } from "@nestjs/common";

export class ClubNotFoundException extends HttpException {
  constructor() {
    super(
      { status: HttpStatus.NOT_FOUND, error: "club found" },
      HttpStatus.NOT_FOUND,
    );
  }
}
