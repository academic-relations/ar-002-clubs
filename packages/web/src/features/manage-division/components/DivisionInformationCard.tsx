import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Toggle from "@sparcs-clubs/web/common/components/Toggle";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import DivisionCard from "@sparcs-clubs/web/features/manage-division/components/_atomic/DivisionCard";

const ClubListWrapper = styled(FlexWrapper)`
  max-height: 300px;
  overflow-y: scroll;
  width: 100%;
`;

const DivisionInformationCard: React.FC = () => {
  const mockClubList = Array.from({ length: 20 }).map((_, i) => ({
    name: "술박스",
    id: i,
  }));

  return (
    <DivisionCard outline padding="32px" gap={32}>
      <Typography fw="MEDIUM" fs={20} lh={24}>
        기본 정보
      </Typography>
      <FlexWrapper gap={20} direction="row">
        <Typography fw="MEDIUM" fs={16} lh={20} style={{ flex: 1 }}>
          분과명
        </Typography>
        <Tag color="PURPLE">생활체육</Tag>
      </FlexWrapper>
      <Toggle label={`동아리 목록 (${mockClubList.length}개)`}>
        <ClubListWrapper direction="column" gap={12}>
          {mockClubList.map((club, _) => (
            <Typography fs={16} lh={20} key={club.id}>
              {club.name}
            </Typography>
          ))}
        </ClubListWrapper>
      </Toggle>
    </DivisionCard>
  );
};

export default DivisionInformationCard;
