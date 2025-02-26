import { z } from "zod";

import { ProfessorEnum } from "@sparcs-clubs/interface/common/enum/user.enum";

export const zStudent = z.object({
  id: z.number(),
  userId: z.number().optional(),
  studentNumber: z.string(),
  name: z.string(),
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
});

export const zStudentSummary = zStudent.pick({
  id: true,
  userId: true,
  name: true,
  studentNumber: true,
});

export const zProfessor = z.object({
  id: z.number(),
  userId: z.number().nullable(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string().optional(),
  professorEnum: z.nativeEnum(ProfessorEnum),
  department: z.number(),
});

export const zExecutive = z.object({
  id: z.number(),
  userId: z.number().optional(),
  studentNumber: z.string(),
  name: z.string(),
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
  // TODO: 다음 칼럼들 논의 및 추가
  // executiveBureauEnum
  // executiveStatusEnum
  // account: 계좌번호? 이거 테이블엔 없네요?
  // doingClubs: ClubSummary[]; // 이름 정하기 필요
});

export const zExecutiveSummary = zExecutive.pick({
  id: true,
  userId: true,
  name: true,
  studentNumber: true,
});

export type IStudent = z.infer<typeof zStudent>;
export type IStudentSummary = z.infer<typeof zStudentSummary>;
export type IExecutive = z.infer<typeof zExecutive>;
export type IExecutiveSummary = z.infer<typeof zExecutiveSummary>;
export type IProfessor = z.infer<typeof zProfessor>;
