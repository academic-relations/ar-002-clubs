import "./styles.scss";

import React from "react";

import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Italic from "@tiptap/extension-italic";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Text from "@tiptap/extension-text";

import { EditorContent, useEditor } from "@tiptap/react";

import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
// import Icon from "@sparcs-clubs/web/common/components/Icon";

const ButtonWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  gap: 12px;
`;

const Markdown = () => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text.configure({
        HTMLAttributes: {
          class: "normal-text",
        },
      }),
      Bold.configure({
        HTMLAttributes: {
          class: "bold-text",
        },
      }),
      Italic.configure({
        HTMLAttributes: {
          class: "italic-text",
        },
      }),
      Placeholder.configure({
        placeholder: "내용을 입력하세요.",
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "table",
        },
      }),
      TableCell,
      TableRow,
      TableHeader,
    ],
    content: `
       
      `,
  });

  if (!editor) {
    return null;
  }

  return (
    <FlexWrapper direction="column" gap={12}>
      <FlexWrapper direction="column" gap={12}>
        <ButtonWrapper>
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            진하게
          </Button>
          <Button
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            }
          >
            표 추가
            {/* <Icon type="grid-on" size={20} /> */}
          </Button>
          <Button
            onClick={() => editor.chain().focus().deleteTable().run()}
            type={!editor.can().deleteTable() ? "disabled" : "default"}
          >
            표 삭제
          </Button>
          <Button
            onClick={() => editor.chain().focus().mergeCells().run()}
            type={!editor.can().mergeCells() ? "disabled" : "default"}
          >
            {/* <Icon type="merge" size={20} /> */}셀 병합
          </Button>
          <Button
            onClick={() => editor.chain().focus().splitCell().run()}
            type={!editor.can().splitCell() ? "disabled" : "default"}
          >
            셀 분리
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button
            onClick={() => editor.chain().focus().addColumnBefore().run()}
            type={!editor.can().addColumnBefore() ? "disabled" : "default"}
          >
            왼쪽에 열 추가
          </Button>
          <Button
            onClick={() => editor.chain().focus().addColumnAfter().run()}
            type={!editor.can().addColumnAfter() ? "disabled" : "default"}
          >
            오른쪽에 열 추가
          </Button>
          <Button
            onClick={() => editor.chain().focus().deleteColumn().run()}
            type={!editor.can().deleteColumn() ? "disabled" : "default"}
          >
            열 삭제
          </Button>
          <Button
            onClick={() => editor.chain().focus().addRowBefore().run()}
            type={!editor.can().addRowBefore() ? "disabled" : "default"}
          >
            위에 행 추가
          </Button>
          <Button
            onClick={() => editor.chain().focus().addRowAfter().run()}
            type={!editor.can().addRowAfter() ? "disabled" : "default"}
          >
            아래에 행 추가
          </Button>
          <Button
            onClick={() => editor.chain().focus().deleteRow().run()}
            type={!editor.can().deleteRow() ? "disabled" : "default"}
          >
            행 삭제
          </Button>
        </ButtonWrapper>
      </FlexWrapper>
      <EditorContent editor={editor} />
    </FlexWrapper>
  );
};

export default Markdown;
