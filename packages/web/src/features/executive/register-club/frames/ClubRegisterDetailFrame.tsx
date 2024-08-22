import React from "react";

import Card from "@sparcs-clubs/web/common/components/Card";
import Attachment from "@sparcs-clubs/web/common/components/File/attachment";
import ThumbnailPreviewList from "@sparcs-clubs/web/common/components/File/ThumbnailPreviewList";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import ProgressCheckSection, {
  StatusAndDate,
} from "@sparcs-clubs/web/common/components/ProgressCheckSection";

import { ProgressCheckSectionStatusEnum } from "@sparcs-clubs/web/common/components/ProgressCheckSection/progressCheckStationStatus";

import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { ProfessorApprovalTagList } from "@sparcs-clubs/web/constants/tableTagList";

import { ActivityProfessorApprovalEnum } from "@sparcs-clubs/web/features/manage-club/services/_mock/mockManageClub";

import RegisterClubTypeEnum, {
  RegisterClubTypeName,
  RegisterClubTypeTagColor,
} from "../constants/registerClubType";

export interface ClubRegisterDetail {
  statusAndDate: StatusAndDate[];
  registerClubType: RegisterClubTypeEnum;
  clubName: string;
  representativeName: string;
  representativePhoneNumber: string;
  estYear: number;
  divisionName: string;
  fieldKR: string;
  fieldEN: string;
  professorName: string;
  professorPosition: string;
  professorEmail: string;
  clubDetail: Record<string, string>;
  attachmentList: Record<string, Attachment[]>;
  professorApproval: ActivityProfessorApprovalEnum;
}

const ClubRegisterDetailFrame: React.FC<ClubRegisterDetail> = ({
  statusAndDate,
  registerClubType,
  clubName,
  representativeName,
  representativePhoneNumber,
  estYear,
  divisionName,
  fieldKR,
  fieldEN,
  professorName,
  professorPosition,
  professorEmail,
  clubDetail,
  attachmentList,
  professorApproval,
}: ClubRegisterDetail) => {
  const progressCheckSectionLabel = () => {
    switch (statusAndDate[1].status) {
      case ProgressCheckSectionStatusEnum.Approved:
        return "동아리 연합회 승인 완료";
      case ProgressCheckSectionStatusEnum.Canceled:
        return "동아리 연합회 신청 반려";
      default:
        return "승인 대기";
    }
  };

  return (
    <Card padding="32px" gap={20} outline>
      <FlexWrapper gap={16} direction="column">
        <Typography fw="MEDIUM" lh={20} fs={16}>
          신청 상태
        </Typography>
        <ProgressCheckSection
          labels={["신청 완료", progressCheckSectionLabel()]}
          progress={statusAndDate}
        />
      </FlexWrapper>
      <FlexWrapper gap={20} direction="row">
        <Typography fw="MEDIUM" lh={20} fs={16} style={{ flex: 1 }}>
          등록 구분
        </Typography>
        <Tag color={RegisterClubTypeTagColor[registerClubType]}>
          {RegisterClubTypeName[registerClubType]}
        </Tag>
      </FlexWrapper>
      <FlexWrapper gap={12} direction="column">
        <Typography fw="MEDIUM" lh={20} fs={16}>
          기본 정보
        </Typography>
        <Typography lh={20} fs={16}>
          {`\u2022  동아리명: ${clubName}`}
        </Typography>
        <Typography lh={20} fs={16}>
          {`\u2022  대표자 이름: ${representativeName}`}
        </Typography>
        <Typography lh={20} fs={16}>
          {`\u2022  대표자 전화번호: ${representativePhoneNumber}`}
        </Typography>
        <Typography lh={20} fs={16}>
          {`\u2022  설립 연도: ${estYear}`}
        </Typography>
        <Typography lh={20} fs={16}>
          {`\u2022  소속 분과: ${divisionName}`}
        </Typography>
        <Typography lh={20} fs={16}>
          {`\u2022  활동 분야 (국문): ${fieldKR}`}
        </Typography>
        <Typography lh={20} fs={16}>
          {`\u2022  활동 분야 (영문): ${fieldEN}`}
        </Typography>
      </FlexWrapper>
      <FlexWrapper gap={12} direction="column">
        <Typography fw="MEDIUM" lh={20} fs={16}>
          지도교수 정보
        </Typography>
        <Typography lh={20} fs={16}>
          {`\u2022  성함: ${professorName}`}
        </Typography>
        <Typography lh={20} fs={16}>
          {`\u2022  직급: ${professorPosition}`}
        </Typography>
        <Typography lh={20} fs={16}>
          {`\u2022  이메일: ${professorEmail}`}
        </Typography>
      </FlexWrapper>
      <FlexWrapper gap={12} direction="column">
        <Typography fw="MEDIUM" lh={20} fs={16}>
          동아리 정보
        </Typography>
        {Object.keys(clubDetail).map((key, index) => (
          <Typography lh={20} fs={16} key={`${index.toString()}`}>
            {`\u2022  ${key}: ${clubDetail[key]}`}
          </Typography>
        ))}
        {Object.keys(attachmentList).map((key, index) => (
          <>
            <Typography lh={20} fs={16} key={`${index.toString()}`}>
              {`\u2022  ${key}`}
            </Typography>
            <ThumbnailPreviewList fileList={attachmentList[key]} />
          </>
        ))}
      </FlexWrapper>
      <FlexWrapper gap={20} direction="row">
        <Typography fw="MEDIUM" lh={20} fs={16} style={{ flex: 1 }}>
          지도교수 승인
        </Typography>
        <Tag color={ProfessorApprovalTagList[professorApproval].color}>
          {ProfessorApprovalTagList[professorApproval].text}
        </Tag>
      </FlexWrapper>
    </Card>
  );
};

export default ClubRegisterDetailFrame;
