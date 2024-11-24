import React, { useState } from "react";

import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import CheckboxOption from "@sparcs-clubs/web/common/components/CheckboxOption";
import Toggle from "@sparcs-clubs/web/common/components/Toggle";
import Typography from "@sparcs-clubs/web/common/components/Typography";

// 공지사항을 단순이 디스플레이하는 덤 컴포넌트라고 생각되어 컴포넌트단에서 구현했습니다.
// 후에 공지 수정 기능이 추가되면 frame으로 옮기거나 속성을 추가해야 할 것 같아요.
// rental-business의 RentalNoticeFrame 수정하여 활용했습니다

interface StorageNoticeProps {
  setAgreement: React.Dispatch<React.SetStateAction<boolean>>;
}

const StorageNoticeInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const StyledBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const StyledOl = styled.ol`
  counter-reset: item;
  list-style-type: none;
  margin: 0;
  padding: 0;

  > li {
    display: block;
    position: relative;
    padding-left: 15px;

    &:before {
      position: absolute;
      left: 0;
      content: counters(item, ".") ". ";
      counter-increment: item;
    }

    > ol {
      counter-reset: subitem;
      padding-left: 20px;
      > li:before {
        content: counter(subitem, lower-alpha) ". ";
        counter-increment: subitem;
      }
    }
  }
`;

const ToggleWrapper = styled.div`
  padding: 0;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 20px;
`;

const StorageNotice: React.FC<StorageNoticeProps> = ({ setAgreement }) => {
  const [checked, setChecked] = useState(false);

  return (
    <StorageNoticeInner>
      <Card outline gap={16}>
        <Typography fs={20} lh={24} fw="MEDIUM">
          안내사항
        </Typography>
        <Typography fs={16} lh={32} fw="REGULAR">
          <StyledOl>
            <li>
              보관 물품의 규격은 아래와 같습니다.
              <ol>
                <li>가로 37cm, 세로 55cm, 높이 31cm 이하의 직육면체 상자</li>
              </ol>
            </li>
            <li>
              대형 규격을 초과하는 물품이나 직육면체 형태를 크게 벗어나는 물품의
              보관을 위해서는 집행부의 승인이 필요합니다.
            </li>
            <li>
              요금은 1개월 단위로 계산합니다. 규격 내 물품은 1점 당
              1000원입니다. 단, 2번에 해당하는 물품의 요금은 대략
              60cm*60cm*60cm의 부피 당 4000원입니다.
            </li>
            <li>아래에 해당하는 물품은 보관할 수 없습니다. </li>
            <ToggleWrapper>
              <Toggle
                label={
                  <Typography fs={16} lh={24}>
                    펼쳐보기
                  </Typography>
                }
              >
                <ul>
                  <li>
                    발화를 목적으로 한 물품 및 발화성, 인화성, 폭발성 물질
                  </li>
                  <li>화재를 키울 수 있는 산화성 물질</li>
                  <li>연료를 목적으로 한 물품 및 고압 용기</li>
                  <li>
                    독성, 부식성, 가연성 액체 및 기체를 유출시킬 수 있는 물질
                  </li>
                  <li>인체, 주변 물품, 시설 등의 악영향을 미칠 수 있는 물질</li>
                  <li>작동 중인 전자기기 및 고용량 혹은 고전압의 전지</li>
                  <li>
                    균류나 해충의 서식이나 부패, 악취를 유발할 수 있는 물품
                  </li>
                  <li>살아 있는 동식물</li>
                  <li>
                    창고 내의 온도, 습도를 크게 변화시키거나 불시에 소음을
                    발생시킬 수 있는 물품
                  </li>
                  <li>창고의 주 출입구를 통과할 수 없는 크기의 물품</li>
                </ul>
              </Toggle>
            </ToggleWrapper>
            <li>
              식음료는 집행부에서 장기 보관이 가능하다고 판단한 것만 보관이
              가능합니다.
            </li>
            <li>
              창고에서 짐을 찾아가고 싶으실 경우, 늦어도 전날 (토,일,월 개방
              희망 시 목요일) 상근시간까지는 연락을 주시면 감사하겠습니다.
              당일엔 개방이 어려울 수 있습니다.
            </li>
          </StyledOl>
        </Typography>
      </Card>
      <StyledBottom>
        <CheckboxOption
          checked={checked}
          onClick={() => setChecked(prev => !prev)}
          optionText="위의 안내사항을 모두 숙지하였으며, 이에 동의합니다"
        />
        <Button
          type={checked ? "default" : "disabled"}
          onClick={() => setAgreement(true)}
        >
          다음
        </Button>
      </StyledBottom>
    </StorageNoticeInner>
  );
};

export default StorageNotice;
