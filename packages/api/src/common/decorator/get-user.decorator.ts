import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ProfileDto } from "../dto/auth.dto";

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): ProfileDto => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
