import Card from "@sparcs-clubs/web/common/components/Card";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import styled from "styled-components";
import SparcsLogo from "@sparcs-clubs/web/assets/sparcs-orange.svg";
import Image from "next/image";
import type { Member } from "../credits";

const MemberWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
`;

// TODO: 작은 사이즈 추가
// TODO: style 적용
const MemberCard = ({ member }: { member: Member }) => (
  <Card style={{ width: "200px" }}>
    <MemberWrapper>
      <Image src={SparcsLogo} alt="SPARCS Logo" height={20} />
      <Typography ff="RALEWAY" fs={16} lh={24}>
        {member.nickname}
      </Typography>
      <Typography fs={12} lh={20}>
        {member.name}
      </Typography>
    </MemberWrapper>
    <Typography ff="RALEWAY" fw="BOLD" fs={10} lh={16} color="GRAY.600">
      {member.role}
    </Typography>
  </Card>
);

export default MemberCard;
