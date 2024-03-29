// eslint-disable-next-line max-classes-per-file
import { HttpException, HttpStatus } from "@nestjs/common";

// export class ClubNotFoundException extends HttpException {
//   constructor() {
//     super(
//       'Club not found',
//       HttpStatus.NOT_FOUND,
//     );
//   }
// }

export class ClubException extends HttpException {
  errorString: string;

  statusCode: number;

  constructor(errorString: string, statusCode: number) {
    super(errorString, statusCode);
    this.errorString = errorString;
    this.statusCode = statusCode;
  }
}

export class ClubNotFoundException extends ClubException {
  constructor() {
    super("Club not found", HttpStatus.NOT_FOUND);
  }
}
