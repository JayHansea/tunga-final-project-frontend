"use client";
import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import {
  Fa1,
  Fa2,
  FaBold,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaUnderline,
} from "react-icons/fa6";
import "draft-js/dist/Draft.css";

interface RichEditorProps {
  setContent: (content: string) => void; // Callback to pass content to parent
}

const RichEditor: React.FC<RichEditorProps> = ({ setContent }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);

    // Get plain text content
    const contentState = state.getCurrentContent();
    const plainText = contentState.getPlainText();

    // Update the parent component with the new content
    setContent(plainText);
  };

  const toggleInlineStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="toolbar flex gap-2 mb-4">
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            toggleInlineStyle("BOLD");
          }}
          className="px-2 py-1 rounded bg-gray-100"
        >
          <FaBold />
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            toggleInlineStyle("ITALIC");
          }}
          className="px-2 py-1 rounded bg-gray-100"
        >
          <FaItalic />
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            toggleInlineStyle("UNDERLINE");
          }}
          className="px-2 py-1 rounded bg-gray-100"
        >
          <FaUnderline />
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlockType("header-one");
          }}
          className="px-2 py-1 rounded bg-gray-100"
        >
          <Fa1 />
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlockType("header-two");
          }}
          className="px-2 py-1 rounded bg-gray-100"
        >
          <Fa2 />
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlockType("blockquote");
          }}
          className="px-2 py-1 rounded bg-gray-100"
        >
          <FaQuoteLeft />
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlockType("unordered-list-item");
          }}
          className="px-2 py-1 rounded bg-gray-100"
        >
          <FaListUl />
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlockType("ordered-list-item");
          }}
          className="px-2 py-1 rounded bg-gray-100"
        >
          <FaListOl />
        </button>
      </div>

      {/* Editor */}
      <div className="editor-container p-4 border border-gray-300 rounded">
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          placeholder="Write your blog content here..."
        />
      </div>
    </div>
  );
};

export default RichEditor;
