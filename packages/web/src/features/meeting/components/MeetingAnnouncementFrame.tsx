import React from "react";

import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import MeetingAnnouncementForm from "./MeetingAnnouncementForm";

interface MeetingAnnouncementFrameProps {
  isTemplateVisible: boolean;
  isEditMode?: boolean;
}

const MeetingAnnouncementFrame: React.FC<MeetingAnnouncementFrameProps> = ({
  isTemplateVisible = false,
  isEditMode = false,
}) => (
  <FlexWrapper direction="column" gap={40}>
    <SectionTitle>최종 공고</SectionTitle>
    <Card outline gap={32} style={{ marginLeft: 24 }}>
      {!isTemplateVisible ? (
        <Typography
          fs={16}
          lh={24}
          fw="REGULAR"
          color="GRAY.300"
          style={{ textAlign: "center" }}
        >
          공고 템플릿을 생성해주세요
        </Typography>
      ) : (
        <MeetingAnnouncementForm isEditMode={isEditMode} />
      )}
    </Card>
  </FlexWrapper>
);

export default MeetingAnnouncementFrame;
