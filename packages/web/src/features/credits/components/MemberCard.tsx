import Card from "@sparcs-clubs/web/common/components/Card";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import styled from "styled-components";
import SparcsLogo from "@sparcs-clubs/web/assets/sparcs-orange.svg";
import Image from "next/image";
import type { Member } from "../credits";

const MemberWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 6px;
`;

const MemberCard = ({
  member,
  isSmall = false,
}: {
  member: Member;
  isSmall?: boolean;
}) => (
  <Card style={{ width: isSmall ? "150px" : "200px" }}>
    <MemberWrapper>
      <Image src={SparcsLogo} alt="SPARCS Logo" height={isSmall ? 20 : 24} />
      <Typography
        ff="RALEWAY"
        fs={isSmall ? 14 : 16}
        lh={isSmall ? 20 : 24}
        fw="EXTRABOLD" // TODO: EXTRABOLD가 적용되지 않는 것 같음
        color="SPARCS.main"
      >
        {member.nickname}
      </Typography>
      {/* TODO: 나눔스퀘어 글꼴 적용 */}
      <Typography
        fs={isSmall ? 10 : 12}
        lh={isSmall ? 16 : 20}
        color="SPARCS.member"
      >
        {member.name}
      </Typography>
    </MemberWrapper>
    <Typography ff="RALEWAY" fw="BOLD" fs={10} lh={16} color="GRAY.600">
      {member.role}
    </Typography>
  </Card>
);

export default MemberCard;
