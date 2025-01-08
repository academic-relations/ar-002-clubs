/* scss is only used for extra cases. (e.g. this case, using Tiptap editor) */
import "./styles.scss";

import React, { useCallback } from "react";

import { Node } from "@tiptap/core";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import TiptapImage from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Text from "@tiptap/extension-text";

import { EditorContent, useEditor } from "@tiptap/react";

import styled from "styled-components";

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

import IconButton from "@sparcs-clubs/web/common/components/Buttons/IconButton";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";

interface MarkdownProps {
  placeholder?: string;
  initialValue?: string;
  onChange?: (content: string) => void;
  isViewer?: boolean;
}

const ButtonWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  gap: 12px;
`;

// 테이블 이후의 삭제 불가능한 텍스트 노드
const ProtectedParagraph = Node.create({
  name: "protectedParagraph",

  group: "block",

  content: "text*",

  parseHTML() {
    return [{ tag: "p" }];
  },

  renderHTML() {
    return ["p", { class: "protected" }, 0];
  },
});

const StyledEditorContent = styled(EditorContent)`
  * {
    min-height: auto;
    border: none;
    padding: 0;
    font-family: inherit;
  }
`;

const Markdown = ({
  placeholder = "",
  initialValue = "",
  onChange = () => {},
  isViewer = false,
}: MarkdownProps) => {
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
      Placeholder.configure({
        placeholder,
      }),
      ProtectedParagraph,
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
    content: initialValue,
    onUpdate: () => {
      const content = editor?.getHTML();
      if (content) {
        onChange(content); // 부모로 HTML 전달
      }
    },
    editable: !isViewer,
  });

  // 테이블 삽입, 이후 삭제 방지된 텍스트 노드 삽입
  const insertTableAndMoveCursor = useCallback(() => {
    if (editor) {
      editor
        .chain()
        .focus()
        .insertContent([
          {
            type: "protectedParagraph",
            content: [
              {
                type: "text",
                text: " ",
              },
            ],
          },
        ])
        .run();
      editor.commands.setTextSelection(editor.state.selection.$anchor.pos - 1);
      editor
        .chain()
        .focus()
        .insertTable({ rows: 2, cols: 2, withHeaderRow: false })
        .run();
    }
  }, [editor]);

  // 사진 삽입
  const handleImageDrop = useCallback(
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

  const handleBackspace = useCallback(() => {
    if (editor) {
      const { state, view } = editor;
      const { from, to } = state.selection;
      const resolvedPos = state.doc.resolve(from);
      const { nodeBefore, parent } = resolvedPos;

      if (nodeBefore && nodeBefore.type.name === "protectedParagraph") {
        const content = nodeBefore.textContent;
        if (content === " ") {
          return;
        }
      }

      if (parent && parent.type.name === "protectedParagraph") {
        const content = parent.textContent;
        if (content === " ") {
          return;
        }
      }

      editor.state.doc.nodesBetween(from, to, node => {
        if (node.type.name === "table") {
          editor.chain().focus().deleteTable().run();
        }
      });

      if (!editor.isEmpty) view.dispatch(state.tr.deleteRange(from - 1, from));
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return isViewer ? (
    <StyledEditorContent editor={editor} />
  ) : (
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
            onClick={() => {
              editor.chain().focus().deleteTable().run();
              editor.chain().focus().deleteNode("protectedParagraph").run();
            }}
            type={!editor.can().deleteTable() ? "disabled" : "default"}
            icon="grid_off"
            size={20}
          />
          <IconButton
            onClick={() => editor.chain().focus().mergeCells().run()}
            type={!editor.can().mergeCells() ? "disabled" : "default"}
            svg={
              !editor.can().mergeCells()
                ? {
                    name: tableMergeCellsDisabledSvg,
                    alt: "table-merge-cells-disabled",
                  }
                : { name: tableMergeCellsSvg, alt: "table-merge-cells" }
            }
          />
          <IconButton
            onClick={() => editor.chain().focus().splitCell().run()}
            type={!editor.can().splitCell() ? "disabled" : "default"}
            svg={
              !editor.can().splitCell()
                ? {
                    name: tableSplitCellDisabledSvg,
                    alt: "table-split-cell-disabled",
                  }
                : { name: tableSplitCellSvg, alt: "table-split-cell" }
            }
          />
          <IconButton
            onClick={() => editor.chain().focus().addColumnBefore().run()}
            type={!editor.can().addColumnBefore() ? "disabled" : "default"}
            svg={
              !editor.can().addColumnBefore()
                ? {
                    name: tableColumnPlusBeforeDisabledSvg,
                    alt: "table-column-plus-before-disabled",
                  }
                : {
                    name: tableColumnPlusBeforeSvg,
                    alt: "table-column-plus-before",
                  }
            }
          />
          <IconButton
            onClick={() => editor.chain().focus().addColumnAfter().run()}
            type={!editor.can().addColumnAfter() ? "disabled" : "default"}
            svg={
              !editor.can().addColumnAfter()
                ? {
                    name: tableColumnPlusAfterDisabledSvg,
                    alt: "table-column-plus-after-disabled",
                  }
                : {
                    name: tableColumnPlusAfterSvg,
                    alt: "table-column-plus-after",
                  }
            }
          />
          <IconButton
            onClick={() => editor.chain().focus().deleteColumn().run()}
            type={!editor.can().deleteColumn() ? "disabled" : "default"}
            svg={
              !editor.can().deleteColumn()
                ? {
                    name: tableColumnRemoveDisabledSvg,
                    alt: "table-column-remove-disabled",
                  }
                : {
                    name: tableColumnRemoveSvg,
                    alt: "table-column-remove",
                  }
            }
          />
          <IconButton
            onClick={() => editor.chain().focus().addRowBefore().run()}
            type={!editor.can().addRowBefore() ? "disabled" : "default"}
            svg={
              !editor.can().addRowBefore()
                ? {
                    name: tableRowPlusBeforeDisabledSvg,
                    alt: "table-row-plus-before-disabled",
                  }
                : {
                    name: tableRowPlusBeforeSvg,
                    alt: "table-row-plus-before",
                  }
            }
          />
          <IconButton
            onClick={() => editor.chain().focus().addRowAfter().run()}
            type={!editor.can().addRowAfter() ? "disabled" : "default"}
            svg={
              !editor.can().addRowAfter()
                ? {
                    name: tableRowPlusAfterDisabledSvg,
                    alt: "table-row-plus-after-disabled",
                  }
                : {
                    name: tableRowPlusAfterSvg,
                    alt: "table-row-plus-after",
                  }
            }
          />
          <IconButton
            onClick={() => editor.chain().focus().deleteRow().run()}
            type={!editor.can().deleteRow() ? "disabled" : "default"}
            svg={
              !editor.can().deleteRow()
                ? {
                    name: tableRowRemoveDisabledSvg,
                    alt: "table-row-remove-disabled",
                  }
                : {
                    name: tableRowRemoveSvg,
                    alt: "table-row-remove",
                  }
            }
          />
        </ButtonWrapper>
      </FlexWrapper>
      <div className="horizontal-divider" />
      <div
        onDrop={handleImageDrop}
        onKeyDown={event => {
          if (event.key === "Backspace") {
            event.preventDefault();
            handleBackspace();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label="에디터를 클릭하여 편집하세요"
      >
        <EditorContent editor={editor} />
      </div>
    </FlexWrapper>
  );
};

export default Markdown;
