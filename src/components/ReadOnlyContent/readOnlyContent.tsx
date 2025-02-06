// Import necessary functions/components
import React, { useState, useEffect } from "react";
import { Editor, EditorState, convertFromRaw } from "draft-js";

interface ReadOnlyContentProps {
  rawContent: string; // This is the JSON string stored in post.content
}

const ReadOnlyContent: React.FC<ReadOnlyContentProps> = ({ rawContent }) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  useEffect(() => {
    try {
      // Parse the JSON string to a RawDraftContentState object
      const contentState = convertFromRaw(JSON.parse(rawContent));
      // Create an EditorState from the content
      setEditorState(EditorState.createWithContent(contentState));
    } catch (error) {
      console.error("Failed to parse post content", error);
    }
  }, [rawContent]);

  return (
    <div>
      <Editor editorState={editorState} onChange={() => {}} readOnly={true} />
    </div>
  );
};

export default ReadOnlyContent;
