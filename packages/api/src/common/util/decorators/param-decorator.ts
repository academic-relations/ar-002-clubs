import { createParamDecorator, ExecutionContext } from "@nestjs/common";

interface UserProfile {
  id: number;
  sid: string;
  name: string;
  email: string;
}

export type GetUser = UserProfile;
interface StudentProfile {
  id: number;
  sid: string;
  name: string;
  email: string;
  type: string;
  studentId: number;
  studentNumber: number;
}
export type GetStudent = StudentProfile;
interface ExecutiveProfile {
  id: number;
  sid: string;
  name: string;
  email: string;
  type: string;
  studentId: number;
  executiveId: number;
}
export type GetExecutive = ExecutiveProfile;
interface ProfessorProfile {
  id: number;
  sid: string;
  name: string;
  email: string;
  type: string;
  professorId: number;
}
export type GetProfessor = ProfessorProfile;
interface EmployeeProfile {
  id: number;
  sid: string;
  name: string;
  email: string;
  type: string;
  employeeId: number;
}
export type GetEmployee = EmployeeProfile;
// todo: 위치 변경 필요할 경우 옮기기.

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) =>
  (({ id, sid, name, email }) => ({
    id,
    sid,
    name,
    email,
  }))(ctx.switchToHttp().getRequest().user),
);

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
