import React, { useEffect, useState } from "react";

import styled, { useTheme } from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import TextButton from "@sparcs-clubs/web/common/components/Buttons/TextButton";
import Card from "@sparcs-clubs/web/common/components/Card";
import CheckboxOption from "@sparcs-clubs/web/common/components/CheckboxOption";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import Toggle from "@sparcs-clubs/web/common/components/Toggle";
import Typography from "@sparcs-clubs/web/common/components/Typography";

interface AgreementModalProps {
  isOpen: boolean;
  onAgree: () => void;
  onDisagree: () => void;
}

const StyledModalContainer = styled.div`
  width: 536px;
  display: flex;
  flex-direction: column;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    width: 216px;
  }
  gap: 16px;
`;

const TextButtonContainer = styled.div`
  width: 536px;
  display: flex;
  flex-direction: column;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    width: 216px;
  }
  align-items: center;
  gap: 16px;
`;

const ResponsiveTypograpy = styled(Typography)`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    font-size: 14px;
    line-height: 20px;
  }
`;

const StyledOl = styled.ol`
  margin-top: 0px;
  padding-left: 16px;
`;
const AgreementModal: React.FC<AgreementModalProps> = ({
  isOpen,
  onAgree,
  onDisagree,
}) => {
  const theme = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${theme.responsive.BREAKPOINT.sm})`,
    );

    // Check the initial state
    setIsMobile(mediaQuery.matches);

    // Set up an event listener to update the state when the window resizes
    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);

    // Clean up the event listener on component unmount
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, [theme]);

  const [isChecked, setIsChecked] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <StyledModalContainer>
        <ResponsiveTypograpy>
          KAIST 학부 동아리연합회의 회원이 되기 위해서는 아래 개인정보 수집 및
          이용 약관과 제3자 제공 약관에 동의해야 합니다. 동의하지 않을 경우
          Clubs 서비스 사용에 제약이 있을 수 있습니다.
        </ResponsiveTypograpy>
        <Card gap={16} padding="16px" outline>
          <Toggle
            label={
              <Typography fs={isMobile ? 14 : 16} lh={isMobile ? 16 : 20}>
                개인정보 수집 및 이용 약관
              </Typography>
            }
          >
            <Typography fs={isMobile ? 14 : 16} lh={isMobile ? 24 : 28}>
              KAIST 학부 동아리연합회는 개인정보보호법 제15조의 규정에 따라
              개인정보를 수집,이용합니다.
              <StyledOl>
                <li>
                  개인정보의 수집,이용 목적 : KAIST 학부 동아리연합회 회원 정보
                  관리, 사무 처리 및 활동인증서 발급을 위한 기록 보유
                </li>
                <li>
                  수집하려는 개인정보의 항목 : 성명, KAIST 학번, 소속 학과, 소속
                  동아리
                </li>
                <li>
                  개인정보의 보유 및 이용 기간 : 영구 (KAIST 학부 동아리연합회
                  회원인 기간 및 활동확인서 발급에 필요한 기초 기록의 보유를
                  위함입니다.)
                </li>
                <li>
                  귀하는 개인정보의 수집,이용의 동의를 거부할 수 있으며, 동의를
                  거부하는 경우 KAIST 학부 동아리연합회의 회원이 되실 수
                  없습니다.
                </li>
              </StyledOl>
            </Typography>
          </Toggle>
        </Card>
        <Card gap={16} padding="16px" outline>
          <Toggle
            label={
              <Typography fs={isMobile ? 14 : 16} lh={isMobile ? 16 : 20}>
                제3자 이용 약관{" "}
              </Typography>
            }
          >
            <Typography fs={isMobile ? 14 : 16} lh={isMobile ? 24 : 28}>
              KAIST 학부 동아리연합회는 개인정보보호법 제17조의 규정에 따라
              개인정보를 제3자에게 제공합니다.
              <StyledOl>
                <li>개인정보를 제공받는 자 : SPARCS</li>
                <li>
                  개인정보를 제공받는 자의 개인정보 이용 목적 : KAIST 학부
                  동아리연합회 전산화 홈페이지의 운용 및 관리
                </li>
                <li>
                  제공하는 개인정보의 항목 : 성명, KAIST 학번, 소속 학과, 소속
                  동아리
                </li>
                <li>
                  개인정보를 제공받는 자의 개인정보 보유 및 이용 기간 : 영구
                  (KAIST 학부 동아리연합회 회원인 기간 및 활동확인서 발급에
                  필요한 기초 기록의 보유를 위함입니다.)
                </li>
                <li>
                  귀하는 개인정보의 제3자 제공의 동의를 거부할 수 있으며, 동의를
                  거부하는 경우 KAIST 학부 동아리연합회의 회원이 되실 수
                  없습니다.
                </li>
              </StyledOl>
            </Typography>
          </Toggle>
        </Card>
        <CheckboxOption
          checked={isChecked}
          onClick={() => {
            setIsChecked(!isChecked);
          }}
          optionText="개인정보 수집 및 이용, 제3자 제공 약관을 확인하였으며 이에 동의합니다"
        />
        <Button onClick={onAgree} type={isChecked ? "default" : "disabled"}>
          확인
        </Button>
        <TextButtonContainer>
          <TextButton
            onClick={onDisagree}
            text={
              isMobile
                ? "약관에 동의하지 않겠습니다 (비로그인)"
                : "약관에 동의하지 않겠습니다 (비로그인 상태로 서비스 이용)"
            }
            fs={14}
            color="GRAY"
            fw="MEDIUM"
          />
        </TextButtonContainer>
      </StyledModalContainer>
    </Modal>
  );
};

export default AgreementModal;
