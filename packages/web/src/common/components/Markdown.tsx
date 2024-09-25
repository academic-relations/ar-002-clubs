import "./styles.scss";

import "styled-components";

import React from "react";

import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Italic from "@tiptap/extension-italic";
import Paragraph from "@tiptap/extension-paragraph";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Text from "@tiptap/extension-text";

import { EditorContent, useEditor } from "@tiptap/react";

import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
// import Icon from "@sparcs-clubs/web/common/components/Icon";

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
        <p>내용을 입력하세요.</p>
      `,
  });

  if (!editor) {
    return null;
  }

  return (
    <FlexWrapper direction="column" gap={12}>
      <FlexWrapper direction="row" gap={12}>
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          B
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
          Insert table
        </Button>
        <Button
          onClick={() => editor.chain().focus().addColumnBefore().run()}
          type={!editor.can().addColumnBefore() ? "disabled" : "default"}
        >
          Add column before
        </Button>
        <Button
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          type={!editor.can().addColumnAfter() ? "disabled" : "default"}
        >
          Add column after
        </Button>
        <Button
          onClick={() => editor.chain().focus().deleteColumn().run()}
          type={!editor.can().deleteColumn() ? "disabled" : "default"}
        >
          Delete column
        </Button>
        <Button
          onClick={() => editor.chain().focus().addRowBefore().run()}
          type={!editor.can().addRowBefore() ? "disabled" : "default"}
        >
          Add row before
        </Button>
        <Button
          onClick={() => editor.chain().focus().addRowAfter().run()}
          type={!editor.can().addRowAfter() ? "disabled" : "default"}
        >
          Add row after
        </Button>
        <Button
          onClick={() => editor.chain().focus().deleteRow().run()}
          type={!editor.can().deleteRow() ? "disabled" : "default"}
        >
          Delete row
        </Button>
        <Button
          onClick={() => editor.chain().focus().deleteTable().run()}
          type={!editor.can().deleteTable() ? "disabled" : "default"}
        >
          Delete table
        </Button>
        <Button
          onClick={() => editor.chain().focus().mergeCells().run()}
          type={!editor.can().mergeCells() ? "disabled" : "default"}
        >
          {/* <Icon type="table-column-plus-before" size={20} /> */}
          Merge cell
        </Button>
        <Button
          onClick={() => editor.chain().focus().splitCell().run()}
          type={!editor.can().splitCell() ? "disabled" : "default"}
        >
          Split cell
        </Button>
      </FlexWrapper>
      <EditorContent editor={editor} />
    </FlexWrapper>
  );
};

export default Markdown;
