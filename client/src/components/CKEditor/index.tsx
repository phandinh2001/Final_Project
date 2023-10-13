// Based on: https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html

import React from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "./style.css";
interface Props {
  setCkEditor: (val: any) => void;
  title?: string;
  context?: string;
}
const CKEditorExam = ({ setCkEditor, title, context }: Props) => {
  const handleCKEditorChanges = (event: any, editor: any) => {
    setCkEditor(editor.getData());
  };
  return (
    <>
      <div className="title">{title}</div>
      <CKEditor
        editor={ClassicEditor}
        onChange={handleCKEditorChanges}
        data={context}
      />
    </>
  );
};

export default CKEditorExam;
