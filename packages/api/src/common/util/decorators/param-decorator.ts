import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetStudent = createParamDecorator((data, ctx: ExecutionContext) =>
  (({ id, sid, name, email, type, studentId, studentNumber }) => ({
    id,
    sid,
    name,
    email,
    type,
    studentId,
    studentNumber,
  }))(ctx.switchToHttp().getRequest().user),
);

export const GetExecutive = createParamDecorator(
  (data, ctx: ExecutionContext) =>
    (({ id, sid, name, email, type, studentId, executiveId }) => ({
      id,
      sid,
      name,
      email,
      type,
      studentId,
      executiveId,
    }))(ctx.switchToHttp().getRequest().user),
);

export const GetProfessor = createParamDecorator(
  (data, ctx: ExecutionContext) =>
    (({ id, sid, name, email, type, professorId }) => ({
      id,
      sid,
      name,
      email,
      type,
      professorId,
    }))(ctx.switchToHttp().getRequest().user),
);

export const GetEmployee = createParamDecorator((data, ctx: ExecutionContext) =>
  (({ id, sid, name, email, type, employeeId }) => ({
    id,
    sid,
    name,
    email,
    type,
    employeeId,
  }))(ctx.switchToHttp().getRequest().user),
);
