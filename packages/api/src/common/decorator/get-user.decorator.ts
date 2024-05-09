import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { UserDto } from "../dto/user.dto";

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserDto => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);

function roleBasedDecorator(role: string) {
  return createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request.user);
    if (!request.user || !(request.user.role === role)) {
      throw new UnauthorizedException(
        `Access denied: user does not have the ${role} role.`,
      );
    }
    return request.user;
  })();
}

export const GetProfileStudent = roleBasedDecorator("student");
export const GetProfileExecutive = roleBasedDecorator("executive");
export const GetProfileProfessor = roleBasedDecorator("professor");
export const GetProfileEmployee = roleBasedDecorator("employee");
