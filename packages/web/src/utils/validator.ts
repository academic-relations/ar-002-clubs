export class EmailValidator {
  static minLength = 3;

  static maxLength = 50;

  static errorMessage = "유효하지 않은 이메일입니다.";

  static validate(
    value: string,
    required?: boolean,
    regex?: RegExp,
  ): string | null {
    if (!required) {
      return null;
    }

    if (
      value.length < EmailValidator.minLength ||
      value.length > EmailValidator.maxLength
    ) {
      return this.errorMessage;
    }

    if (!value.includes("@") || !value.includes(".")) {
      return this.errorMessage;
    }

    if (regex != null && !regex.test(value)) {
      return this.errorMessage;
    }
    return null;
  }
}
