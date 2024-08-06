"use client";

import React from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";
import { overlay } from "overlay-kit";
import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import Typography from "@sparcs-clubs/web/common/components/Typography";
import { mockupData } from "@sparcs-clubs/web/features/meeting/services/_mock/mockupMeetingDetail";

const RowStretchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const MeetingDetailFrame: React.FC = () => {
  const router = useRouter();

  const deleteHandler = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <CancellableModalContent
          onConfirm={() => {
            // TODO. 삭제 요청 api 연결
            close();
            router.replace("/meeting");
          }}
          onClose={close}
        >
          공고를 삭제하면 복구할 수 없습니다.
          <br />
          ㄱㅊ?
        </CancellableModalContent>
      </Modal>
    ));
  };

  // TODO. 공고 상세조회 api 연결
  const data = mockupData;

  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[{ name: "의결기구", path: `/meeting` }]}
        title={data.title}
        enableLast
      />
      <Card outline>
        <Typography fs={16} lh={20} style={{ whiteSpace: "pre-line" }}>
          {data.content}
        </Typography>
      </Card>
      <RowStretchWrapper>
        <Link href="/meeting">
          <Button type="default">목록으로 돌아가기</Button>
        </Link>
        <FlexWrapper direction="row" gap={10}>
          <Button type="default" onClick={deleteHandler}>
            삭제
          </Button>
          <Link href={`/meeting/${data.id}/edit`}>
            <Button type="default">수정</Button>
          </Link>
        </FlexWrapper>
      </RowStretchWrapper>
    </FlexWrapper>
  );
};

export default MeetingDetailFrame;
