import { HttpException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiAut001RequestQuery } from "@sparcs-clubs/interface/api/auth/endpoint/apiAut001";
import { ApiAut002ResponseCreated } from "@sparcs-clubs/interface/api/auth/endpoint/apiAut002";
import { ApiAut003ResponseOk } from "@sparcs-clubs/interface/api/auth/endpoint/apiAut003";
import { ApiAut004RequestQuery } from "@sparcs-clubs/interface/api/auth/endpoint/apiAut004";

import { getSsoConfig } from "@sparcs-clubs/api/env";

import { Request, RequestExtra } from "../dto/auth.dto";
import { SSOUser } from "../dto/sparcs-sso.dto";
import { AuthRepository } from "../repository/auth.repository";
import { Client } from "../util/sparcs-sso";

@Injectable()
export class AuthService {
  private readonly ssoClient;

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {
    const ssoConfig = getSsoConfig();
    const ssoClient = new Client(ssoConfig.ssoClientId, ssoConfig.ssoSecretKey);
    this.ssoClient = ssoClient;
  }

  public async getAuthSignin(query: ApiAut001RequestQuery, req: Request) {
    if (!req.session) {
      // eslint-disable-next-line no-param-reassign
      req.session = {} as RequestExtra["session"];
    }
    // eslint-disable-next-line no-param-reassign
    req.session.next = query.next ?? "/";
    const { url, state } = this.ssoClient.get_login_params();
    // eslint-disable-next-line no-param-reassign
    req.session.ssoState = state;
    return url;
  }

  public async getAuthSigninCallback(
    query: ApiAut004RequestQuery,
    session: Request["session"],
  ) {
    const stateBefore = session.ssoState;
    if (!stateBefore || stateBefore !== query.state) {
      return {
        nextUrl: "/error/invalid-login",
        refreshToken: null,
        refreshTokenOptions: null,
      };
    }

    const ssoProfile: SSOUser = await this.ssoClient.get_user_info(query.code);

    const studentNumber =
      ssoProfile.kaist_info.ku_std_no || process.env.USER_KU_STD_NO;
    const email = ssoProfile.email || process.env.USER_MAIL;
    const sid = ssoProfile.sid || process.env.USER_SID;
    const name = ssoProfile.kaist_info.ku_kname || process.env.USER_KU_KNAME;
    const type =
      ssoProfile.kaist_info.ku_person_type || process.env.USER_KU_PERSON_TYPE;
    const department =
      ssoProfile.kaist_info.ku_kaist_org_id || process.env.USER_KU_KAIST_ORG_ID;

    const user = await this.authRepository.findOrCreateUser(
      email,
      studentNumber,
      sid,
      name,
      type,
      department,
    );
    // executiverepository가 common에서 제거됨에 따라 집행부원 토큰 추가 로직은 후에 재구성이 필요합니다.
    // if(user.executive){
    //   if(!(await this.executiveRepository.findExecutiveById(user.executive.id))) throw new HttpException("Cannot find Executive", 403);
    // }
    const accessToken = this.getAccessToken(user);
    const refreshToken = this.getRefreshToken(user);
    const current = new Date(); // todo 시간 변경 필요.
    const expiresAt = new Date(
      current.getTime() + parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN),
    );
    const nextUrl = session.next ?? "/";

    const token = {
      accessToken,
      refreshToken,
      expiresAt,
    };

    console.log(token.accessToken);

    return (await this.authRepository.createRefreshTokenRecord(
      user.id,
      refreshToken,
      expiresAt,
    ))
      ? {
          next: nextUrl,
          token,
        }
      : (() => {
          throw new HttpException("Cannot store refreshtoken", 500);
        })();
  }

  async postAuthRefresh(_user: {
    id: number;
    sid: string;
    name: string;
    email: string;
  }): Promise<ApiAut002ResponseCreated> {
    const user = await this.authRepository.findUserById(_user.id);
    const accessToken = this.getAccessToken(user);

    return {
      accessToken,
    };
  }

  // TODO: 로직 수정 필요
  async postAuthSignout(
    _user: {
      id: number;
      sid: string;
      name: string;
      email: string;
    },
    refreshToken: string,
  ): Promise<ApiAut003ResponseOk> {
    return (await this.authRepository.deleteRefreshTokenRecord(
      _user.id,
      refreshToken,
    ))
      ? {}
      : (() => {
          throw new HttpException("Cannot delete refreshtoken", 500);
        })();
  }

  getAccessToken(user: {
    id: number;
    sid: string;
    name: string;
    email: string;
    undergraduate?: {
      id: number;
      number: number;
    };
    master?: {
      id: number;
      number: number;
    };
    doctor?: {
      id: number;
      number: number;
    };
    executive?: {
      id: number;
      studentId: number;
    };
    professor?: {
      id: number;
    };
    employee?: {
      id: number;
    };
  }) {
    const accessToken: {
      undergraduate?: string;
      master?: string;
      doctor?: string;
      executive?: string;
      professor?: string;
      employee?: string;
    } = {};

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

  getRefreshToken(user: {
    id: number;
    sid: string;
    name: string;
    email: string;
  }) {
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
