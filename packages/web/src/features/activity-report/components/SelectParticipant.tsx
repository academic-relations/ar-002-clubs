import React from "react";
import styled from "styled-components";

interface SelectParticipantProps {
  participants: string;
}

const SelectParticipantInner = styled.div`
  color: ${({ theme }) => theme.colors.BLACK};
`;

const SelectParticipant: React.FC<SelectParticipantProps> = ({
  participants,
}) => <SelectParticipantInner>{participants}</SelectParticipantInner>;

export default SelectParticipant;
