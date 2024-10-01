import "./styles.scss";

import React, { useCallback } from "react";

import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import TiptapImage from "@tiptap/extension-image";
import Italic from "@tiptap/extension-italic";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Text from "@tiptap/extension-text";

import { EditorContent, useEditor } from "@tiptap/react";

import Image from "next/image";

import styled from "styled-components";

// TODO: refactor chacha!!!!
import tableColumnPlusAfterDisabledSvg from "@sparcs-clubs/web/assets/table-column-plus-after-disabled.svg";
import tableColumnPlusAfterSvg from "@sparcs-clubs/web/assets/table-column-plus-after.svg";
import tableColumnPlusBeforeDisabledSvg from "@sparcs-clubs/web/assets/table-column-plus-before-disabled.svg";
import tableColumnPlusBeforeSvg from "@sparcs-clubs/web/assets/table-column-plus-before.svg";
import tableColumnRemoveDisabledSvg from "@sparcs-clubs/web/assets/table-column-remove-disabled.svg";
import tableColumnRemoveSvg from "@sparcs-clubs/web/assets/table-column-remove.svg";
import tableMergeCellsDisabledSvg from "@sparcs-clubs/web/assets/table-merge-cells-disabled.svg";
import tableMergeCellsSvg from "@sparcs-clubs/web/assets/table-merge-cells.svg";
import tableRowPlusAfterDisabledSvg from "@sparcs-clubs/web/assets/table-row-plus-after-disabled.svg";
import tableRowPlusAfterSvg from "@sparcs-clubs/web/assets/table-row-plus-after.svg";
import tableRowPlusBeforeDisabledSvg from "@sparcs-clubs/web/assets/table-row-plus-before-disabled.svg";
import tableRowPlusBeforeSvg from "@sparcs-clubs/web/assets/table-row-plus-before.svg";
import tableRowRemoveDisabledSvg from "@sparcs-clubs/web/assets/table-row-remove-disabled.svg";
import tableRowRemoveSvg from "@sparcs-clubs/web/assets/table-row-remove.svg";
import tableSplitCellDisabledSvg from "@sparcs-clubs/web/assets/table-split-cell-disabled.svg";
import tableSplitCellSvg from "@sparcs-clubs/web/assets/table-split-cell.svg";

import Button from "@sparcs-clubs/web/common/components/Button";
import IconButton from "@sparcs-clubs/web/common/components/Buttons/IconButton";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";

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
      Dropcursor,
      TiptapImage.configure({
        inline: true,
        HTMLAttributes: {
          class: "tiptap-image",
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
      Text,
    ],
    content: ``,
  });

  const insertTableAndMoveCursor = useCallback(() => {
    if (editor) {
      editor.chain().focus().insertContent("<p></p><p></p>").run();
      editor.commands.setTextSelection(editor.state.selection.$anchor.pos - 1);
      editor
        .chain()
        .focus()
        .insertTable({ rows: 2, cols: 2, withHeaderRow: false })
        .run();
    }
  }, [editor]);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const { files } = event.dataTransfer;
      if (files.length === 0) {
        return;
      }

      const file = files[0];
      if (!file.type.startsWith("image/")) {
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (editor && reader.result)
          editor
            .chain()
            .focus()
            .setImage({ src: reader.result.toString() })
            .run();
      };
      reader.readAsDataURL(file);
    },
    [editor],
  );

  if (!editor) {
    return null;
  }

  return (
    <FlexWrapper direction="column" gap={12}>
      <FlexWrapper direction="column" gap={12}>
        <ButtonWrapper>
          <IconButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            icon="format_bold"
            size={20}
          />
          <div className="vertical-divider" />
          <IconButton
            onClick={insertTableAndMoveCursor}
            icon="grid_on"
            size={20}
          />
          <IconButton
            onClick={() => editor.chain().focus().deleteTable().run()}
            type={!editor.can().deleteTable() ? "disabled" : "default"}
            icon="grid_off"
            size={20}
          />
          <Button
            onClick={() => editor.chain().focus().mergeCells().run()}
            type={!editor.can().mergeCells() ? "disabled" : "default"}
          >
            {!editor.can().mergeCells() ? (
              <Image src={tableMergeCellsDisabledSvg} alt="table-merge-cells" />
            ) : (
              <Image src={tableMergeCellsSvg} alt="table-merge-cells" />
            )}
          </Button>
          <Button
            onClick={() => editor.chain().focus().splitCell().run()}
            type={!editor.can().splitCell() ? "disabled" : "default"}
          >
            {!editor.can().splitCell() ? (
              <Image
                src={tableSplitCellDisabledSvg}
                alt="table-split-cell-disabled"
              />
            ) : (
              <Image src={tableSplitCellSvg} alt="table-split-cell" />
            )}
          </Button>
          <Button
            onClick={() => editor.chain().focus().addColumnBefore().run()}
            type={!editor.can().addColumnBefore() ? "disabled" : "default"}
          >
            {!editor.can().addColumnBefore() ? (
              <Image
                src={tableColumnPlusBeforeDisabledSvg}
                alt="table-column-plus-before-disabled"
              />
            ) : (
              <Image
                src={tableColumnPlusBeforeSvg}
                alt="table-column-plus-before"
              />
            )}
          </Button>
          <Button
            onClick={() => editor.chain().focus().addColumnAfter().run()}
            type={!editor.can().addColumnAfter() ? "disabled" : "default"}
          >
            {!editor.can().addColumnAfter() ? (
              <Image
                src={tableColumnPlusAfterDisabledSvg}
                alt="table-column-plus-after-disabled"
              />
            ) : (
              <Image
                src={tableColumnPlusAfterSvg}
                alt="table-column-plus-after"
              />
            )}
          </Button>
          <Button
            onClick={() => editor.chain().focus().deleteColumn().run()}
            type={!editor.can().deleteColumn() ? "disabled" : "default"}
          >
            {!editor.can().deleteColumn() ? (
              <Image
                src={tableColumnRemoveDisabledSvg}
                alt="table-column-remove-disabled"
              />
            ) : (
              <Image src={tableColumnRemoveSvg} alt="table-column-remove" />
            )}
          </Button>
          <Button
            onClick={() => editor.chain().focus().addRowBefore().run()}
            type={!editor.can().addRowBefore() ? "disabled" : "default"}
          >
            {!editor.can().addRowBefore() ? (
              <Image
                src={tableRowPlusBeforeDisabledSvg}
                alt="table-row-plus-before-disabled"
              />
            ) : (
              <Image src={tableRowPlusBeforeSvg} alt="table-row-plus-before" />
            )}
          </Button>
          <Button
            onClick={() => editor.chain().focus().addRowAfter().run()}
            type={!editor.can().addRowAfter() ? "disabled" : "default"}
          >
            {!editor.can().addRowAfter() ? (
              <Image
                src={tableRowPlusAfterDisabledSvg}
                alt="table-row-plus-after-disabled"
              />
            ) : (
              <Image src={tableRowPlusAfterSvg} alt="table-row-plus-after" />
            )}
          </Button>
          <Button
            onClick={() => editor.chain().focus().deleteRow().run()}
            type={!editor.can().deleteRow() ? "disabled" : "default"}
          >
            {!editor.can().deleteRow() ? (
              <Image
                src={tableRowRemoveDisabledSvg}
                alt="table-row-remove-disabled"
                className="button-icon"
              />
            ) : (
              <Image
                src={tableRowRemoveSvg}
                alt="table-row-remove"
                className="button-icon"
              />
            )}
          </Button>
        </ButtonWrapper>
      </FlexWrapper>
      <div className="horizontal-divider" />
      <div onDrop={handleDrop}>
        <EditorContent editor={editor} />
      </div>
    </FlexWrapper>
  );
};

export default Markdown;
