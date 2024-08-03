import { useState } from "react";

import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Icon from "@sparcs-clubs/web/common/components/Icon";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";

const ClubListWrapper = styled(FlexWrapper)`
  max-height: 300px;
  overflow-y: scroll;
`;

const DivisionInformationCard: React.FC = () => {
  const [showClubList, setShowClubList] = useState<boolean>(false);
  const mockClubList = Array.from({ length: 20 }).map((_, i) => ({
    name: "술박스",
    id: i,
  }));

  return (
    <Card outline padding="32px" gap={32} style={{ flex: 1 }}>
      <Typography ff="PRETENDARD" fw="MEDIUM" fs={20} lh={24}>
        기본 정보
      </Typography>
      <FlexWrapper gap={20} direction="row">
        <Typography
          ff="PRETENDARD"
          fw="MEDIUM"
          fs={16}
          lh={20}
          style={{ flex: 1 }}
        >
          분과명
        </Typography>
        <Tag color="PURPLE">생활체육</Tag>
      </FlexWrapper>
      <FlexWrapper
        gap={8}
        direction="row"
        onClick={() => setShowClubList(!showClubList)}
      >
        {showClubList ? (
          <Icon type="keyboard_arrow_down" size={20} />
        ) : (
          <Icon type="keyboard_arrow_right" size={20} />
        )}
        <FlexWrapper gap={16} direction="column" style={{ flex: 1 }}>
          <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20}>
            {`동아리 목록 (${mockClubList.length}개)`}
          </Typography>
          {showClubList && (
            <ClubListWrapper direction="column" gap={12}>
              {mockClubList.map((club, _) => (
                <Typography
                  ff="PRETENDARD"
                  fw="REGULAR"
                  fs={16}
                  lh={20}
                  key={club.id}
                >
                  {club.name}
                </Typography>
              ))}
            </ClubListWrapper>
          )}
        </FlexWrapper>
      </FlexWrapper>
    </Card>
  );
};

export default DivisionInformationCard;
