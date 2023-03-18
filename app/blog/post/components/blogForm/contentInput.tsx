import { useState, useRef, useEffect } from 'react';
import { FaCode, FaBold, FaItalic, FaStrikethrough, FaUnderline, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import ReactDropdown, { ReactDropdownProps } from 'react-dropdown';
import { EditorState, RichUtils, Editor, ContentBlock, DraftBlockType, convertToRaw } from "draft-js";
//import Editor from "@draft-js-plugins/editor";

import * as Prism from 'prismjs';
import "prismjs/themes/prism-dark.css";
import "prismjs/components/prism-go"
import "prismjs/components/prism-rust"
//@ts-expect-error
import * as PrismDec from 'draft-js-prism';

const styleMap = {
    'STRIKETHROUGH': {
        textDecoration: 'line-through',
    },
};

function getBlockStyle(block: ContentBlock): string {
    switch (block.getType()) {
        case 'code-block': return "bg-gray-900/50 p-1 break-all break-words object-contain whitespace-pre-wrap h-auto text-sm"
        case 'blockquote': return '';
        default: return "";
    }
}


type Language = {
    value: string, label: string
};

interface ContentProps {
    props: {
        content: string;
        setContent: React.Dispatch<string>;
    }
}
export default function BlogContentInput({ props }: ContentProps) {
    const { content, setContent } = props;
    const editorRef = useRef<Editor>(null);

    const [lang, setLang] = useState<{ selected: Language }>({
        selected: {
            value: "javascript", label: "JavaScript"
        }
    });

    const decorator = new PrismDec({
        prism: Prism,
        defaultSyntax: lang.selected.value
    });

    const [editorState, setEditorState] = useState(EditorState.createEmpty(decorator))


    const handleEditorStateChange = (state: string) => {
        const newState = RichUtils.toggleInlineStyle(editorState, state);
        onChange(newState)
    };

    const toggleBlockType = (blockType: DraftBlockType) => {
        console.log(lang, " the option");

        onChange(
            RichUtils.toggleBlockType(
                editorState,
                blockType,
            )
        )
    }

    const onChange = (editorState: EditorState) => {
        setEditorState(editorState)
        setContent(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
    };

    return (
        <div className="w-full min-h-full h-auto  bg-gray-800/80 rounded-lg">
            <div className="w-full min-h-[3rem] p-4 bg-gray-700/50 rounded-t-lg  flex items-center justify-start px-4">
                <ul className="flex flex-row items-center justify-start gap-3 text-white text-xl">
                    <button className={`p-2 rounded-lg bg-gray-600/50 cursor-pointer duration-150 hover:bg-gray-500 ${editorState.getCurrentInlineStyle().has("BOLD") ? "bg-gray-900" : ""}`} type="button" onMouseDown={(e) => {
                        e.preventDefault();
                        handleEditorStateChange("BOLD")
                    }}>
                        <FaBold />
                    </button>
                    <button className={`p-2 rounded-lg bg-gray-600/50 cursor-pointer duration-150 hover:bg-gray-500 ${editorState.getCurrentInlineStyle().has("ITALIC") ? "bg-gray-900" : ""}`} type="button" onMouseDown={(e) => {
                        e.preventDefault();
                        handleEditorStateChange("ITALIC")
                    }}>
                        <FaItalic />
                    </button>
                    <button className={`p-2 rounded-lg bg-gray-600/50 cursor-pointer duration-150 hover:bg-gray-500 ${editorState.getCurrentInlineStyle().has("UNDERLINE") ? "bg-gray-900" : ""}`} type="button" onMouseDown={(e) => {
                        e.preventDefault();
                        handleEditorStateChange("UNDERLINE")
                    }}>
                        <FaUnderline />
                    </button>
                    <button className={`p-2 rounded-lg bg-gray-600/50 cursor-pointer duration-150 hover:bg-gray-500 ${editorState.getCurrentInlineStyle().has("STRIKETHROUGH") ? "bg-gray-900" : ""}`} type="button" onMouseDown={(e) => {
                        e.preventDefault();
                        handleEditorStateChange("STRIKETHROUGH")
                    }}>
                        <FaStrikethrough />
                    </button>

                    <button className={`p-2 rounded-lg bg-gray-600/50 cursor-pointer duration-150 hover:bg-gray-500`} type="button" onMouseDown={(e) => {
                        e.preventDefault();
                        toggleBlockType("code-block");
                    }}>
                        <FaCode />
                    </button>
                </ul>
            </div>

            <div className="w-full min-h-[45rem] p-5 text-white" onClick={()=>editorRef.current && editorRef.current.focus()}>
                {!content || content === "" ? <p className="animate-pulse">|</p> : null}
                <Editor
                    ref={editorRef}
                    editorState={editorState}
                    onChange={onChange}
                    customStyleMap={styleMap}
                    blockStyleFn={getBlockStyle}
                />
            </div>
        </div>
    );
}
