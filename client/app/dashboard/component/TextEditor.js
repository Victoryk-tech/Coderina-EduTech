import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = ({ content, onContentChange, handleFilePicker }) => {
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      value={content}
      onEditorChange={(newContent) => onContentChange(newContent)}
      init={{
        height: 400,
        menubar: false,
        branding: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "help",
          "wordcount",
          "textcolor",
          "colorpicker",
          "codesample",
        ],
        toolbar:
          "undo redo |styles | formatselect | fontselect fontsizeselect | bold italic underline link forecolor backcolor|bullist numlist   | codesample  image preview | media |  blockquote  | insertdatetime table | code fullscreen | alignleft aligncenter alignright alignjustify | removeformat | help",
        font_formats:
          "Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; Georgia=georgia,palatino; Tahoma=tahoma,arial,helvetica,sans-serif; Verdana=verdana,geneva;",
        fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt 48pt 72pt",
        file_picker_callback: handleFilePicker,
        image_title: true,
        automatic_uploads: true,
        file_picker_types: "image media",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        placeholder: "Start writing your post here...",
      }}
    />
  );
};

export default TextEditor;
