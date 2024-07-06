import { Injectable } from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";

import { AuthRepository } from "../repository/auth.repository";

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async postAuthSignin() {
    // TODO: SPARCS SSO 로그인 구현
    const studentNumber = process.env.USER_KU_STD_NO;
    const email = process.env.USER_MAIL;
    const sid = process.env.USER_SID;
    const name = process.env.USER_KU_KNAME;
    const type = process.env.USER_KU_PERSON_TYPE;
    const department = process.env.USER_KU_KAIST_ORG_ID;

    const user = await this.authRepository.findOrCreateUser(
      email,
      studentNumber,
      sid,
      name,
      type,
      department,
    );

    const accessToken = this.getAccessToken({ user });
    const refreshToken = this.getRefreshToken({ user });

    return {
      accessToken,
      refreshToken,
    };
  }

  getAccessToken({ user }): { [key: string]: string } {
    const accessToken: { [key: string]: string } = {};

    if (user.undergraduate) {
      accessToken.undergraduate = this.jwtService.sign(
        {
          id: user.id,
          sid: user.sid,
          name: user.name,
          email: user.email,
          type: "undergraduate",
          studentId: user.undergraduate.id,
          studentNumber: user.undergraduate.number,
        },
        {
          secret: process.env.ACCESS_TOKEN_SECRET_KEY,
          expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        },
      );
    }

    if (user.master) {
      accessToken.master = this.jwtService.sign(
        {
          id: user.id,
          sid: user.sid,
          name: user.name,
          email: user.email,
          type: "master",
          studentId: user.master.id,
          studentNumber: user.master.number,
        },
        {
          secret: process.env.ACCESS_TOKEN_SECRET_KEY,
          expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        },
      );
    }

    if (user.doctor) {
      accessToken.doctor = this.jwtService.sign(
        {
          id: user.id,
          sid: user.sid,
          name: user.name,
          email: user.email,
          type: "doctor",
          studentId: user.doctor.id,
          studentNumber: user.doctor.number,
        },
        {
          secret: process.env.ACCESS_TOKEN_SECRET_KEY,
          expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        },
      );
    }

    if (user.executive) {
      accessToken.executive = this.jwtService.sign(
        {
          id: user.id,
          sid: user.sid,
          name: user.name,
          email: user.email,
          type: "executive",
          executiveId: user.executive.id,
          studentId: user.executive.studentId,
        },
        {
          secret: process.env.ACCESS_TOKEN_SECRET_KEY,
          expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        },
      );
    }

    if (user.professor) {
      accessToken.professor = this.jwtService.sign(
        {
          id: user.id,
          sid: user.sid,
          name: user.name,
          email: user.email,
          type: "professor",
          professorId: user.professor.id,
        },
        {
          secret: process.env.ACCESS_TOKEN_SECRET_KEY,
          expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        },
      );
    }

    if (user.employee) {
      accessToken.employee = this.jwtService.sign(
        {
          id: user.id,
          sid: user.sid,
          name: user.name,
          email: user.email,
          type: "employee",
          employeeId: user.employee.id,
        },
        {
          secret: process.env.ACCESS_TOKEN_SECRET_KEY,
          expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        },
      );
    }

    return accessToken;
  }

  getRefreshToken({ user }) {
    const refreshToken = this.jwtService.sign(
      {
        email: user.email,
        id: user.id,
        sid: user.sid,
        name: user.name,
      },
      {
        secret: process.env.REFRESH_TOKEN_SECRET_KEY,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      },
    );
    return refreshToken;
  }
}
