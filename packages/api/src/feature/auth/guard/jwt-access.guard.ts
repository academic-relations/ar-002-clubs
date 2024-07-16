import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

import {
  IS_PUBLIC_KEY,
  ROLES_KEY,
} from "@sparcs-clubs/api/common/util/decorators/method-decorator";

@Injectable()
export class JwtAccessGuard extends AuthGuard("access") {
  constructor(private reflector: Reflector) {
    super();
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  canActivate(context: ExecutionContext): any {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    const roles = this.reflector.getAllAndMerge<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (roles.includes(user.type) || roles.length === 0) return user;
    throw new UnauthorizedException("Not allowed type");
  }
}
