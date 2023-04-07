"use client";
import * as Prism from 'prismjs';

//@ts-expect-error
import * as PrismDec from 'draft-js-prism';

import { Editor, EditorState, convertFromRaw, ContentBlock } from "draft-js"
import "prismjs/themes/prism-dark.css";

const styleMap = {
  'STRIKETHROUGH': {
      textDecoration: 'line-through',
  },
  'FONT_SIZE': {
      fontSize: "30px",
  }
};

function getBlockStyle(block: ContentBlock): string {
  switch (block.getType()) {
      case 'code-block': return "bg-gray-900/50 p-1 break-all break-words object-contain whitespace-pre-wrap h-auto text-sm"
      case 'blockquote': return 'bg-gray-900/20 p-2 border-l-4 border-l-[#535886]';
      default: return "";
  }
}


const decorator = new PrismDec({
  prism: Prism,
  defaultSyntax: "javascript"
});


export default function BlogContent({ content }: { content: string }) {
    const contentState = convertFromRaw(JSON.parse(content));
    const editorState = EditorState.createWithContent(contentState, decorator);
  
    return (
      <Editor customStyleMap={styleMap} editorState={editorState} readOnly={true} blockStyleFn={getBlockStyle} onChange={()=>{}} />
    );
}