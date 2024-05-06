import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserTokenDto } from "../dto/user.dto";

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserTokenDto => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
