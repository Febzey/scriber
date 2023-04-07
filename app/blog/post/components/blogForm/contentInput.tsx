"use client";

import { useState, useRef, useEffect } from 'react';
import { FaCode, FaBold, FaItalic, FaStrikethrough, FaUnderline, FaFont, FaIndent } from 'react-icons/fa';
import { EditorState, RichUtils, Editor, ContentBlock, DraftBlockType, convertToRaw, convertFromRaw } from "draft-js";
import Tooltip from '../../../../../components/tooltips/tooltip';
//@ts-expect-error
import * as PrismDec from 'draft-js-prism';
import * as Prism from 'prismjs';
import "prismjs/themes/prism-dark.css";
import "prismjs/components/prism-go"
import "prismjs/components/prism-rust"

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


type Language = {
    value: string, label: string
};

interface ContentProps {
    props: {
        content: string;
        setContent: React.Dispatch<string>;
        isRoughDraft: boolean
    }
}
export default function BlogContentInput({ props }: ContentProps) {
    const { content, setContent, isRoughDraft } = props;
    const editorRef = useRef<Editor>(null);

    const decorator = new PrismDec({
        prism: Prism,
        defaultSyntax: "javascript"
    });

    const [editorState, setEditorState] = useState(() => {
        return content !== null && isRoughDraft
            ? EditorState.createWithContent(convertFromRaw(JSON.parse(content)), decorator)
            : EditorState.createEmpty(decorator)
    });

    const handleEditorStateChange = (state: string) => {
        const newState = RichUtils.toggleInlineStyle(editorState, state);
        onChange(newState)
    };

    const toggleBlockType = (blockType: DraftBlockType) => {
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

    useEffect(() => {
        if (content.length <= 0) {
            console.log("Yum")
            setEditorState(EditorState.createEmpty(decorator));
        }
    }, [content]);

    return (
        <div className="w-full min-h-full h-auto  bg-main-second/20 rounded-lg duration-100  active:ring-white/70 ring-2 ring-transparent">
            <div className="w-full min-h-[3rem] p-4 bg-main-second/30 rounded-t-lg  flex items-center justify-start px-4">
                <ul className="flex flex-row items-center justify-start gap-3 text-white text-xl">
                    <Tooltip text='Bold' tooltipId='bold'>
                        <button className={`p-2 rounded-lg  cursor-pointer duration-150 hover:bg-card/40 ${editorState.getCurrentInlineStyle().has("BOLD") ? "bg-main" : "bg-main/30"}`} type="button" onMouseDown={(e) => {
                            e.preventDefault();
                            handleEditorStateChange("BOLD")
                        }}>
                            <FaBold />

                        </button>
                    </Tooltip>

                    <Tooltip text='Italics' tooltipId='Italics'>
                        <button className={`p-2 rounded-lg cursor-pointer duration-150 hover:bg-card/40  ${editorState.getCurrentInlineStyle().has("ITALIC") ? "bg-main" : "bg-main/30"}`} type="button" onMouseDown={(e) => {
                            e.preventDefault();
                            handleEditorStateChange("ITALIC")
                        }}>
                            <FaItalic />
                        </button>
                    </Tooltip>

                    <Tooltip text='Underline' tooltipId='Underline'>

                        <button className={`p-2 rounded-lg cursor-pointer duration-150 hover:bg-card/40  ${editorState.getCurrentInlineStyle().has("UNDERLINE") ? "bg-main" : "bg-main/30"}`} type="button" onMouseDown={(e) => {
                            e.preventDefault();
                            handleEditorStateChange("UNDERLINE")
                        }}>
                            <FaUnderline />
                        </button>
                    </Tooltip>

                    <Tooltip text='StrikeThrough' tooltipId='strike'>

                        <button className={`p-2 rounded-lg cursor-pointer duration-150 hover:bg-card/40  ${editorState.getCurrentInlineStyle().has("STRIKETHROUGH") ? "bg-main" : "bg-main/30"}`} type="button" onMouseDown={(e) => {
                            e.preventDefault();
                            handleEditorStateChange("STRIKETHROUGH")
                        }}>
                            <FaStrikethrough />
                        </button>
                    </Tooltip>

                    <Tooltip text='Header' tooltipId='Header'>

                        <button className={`p-2 rounded-lg cursor-pointer duration-150 hover:bg-card/40  ${editorState.getCurrentInlineStyle().has("FONT_SIZE") ? "bg-main" : "bg-main/30"}`} type="button" onMouseDown={(e) => {
                            e.preventDefault();
                            handleEditorStateChange("FONT_SIZE")
                        }}>
                            <FaFont />
                        </button>
                    </Tooltip>

                    <Tooltip text='Code Blocks' tooltipId='codeblocks'>

                        <button className={`p-2 bg-main/30 rounded-lg cursor-pointer duration-150 hover:bg-card/40 `} type="button" onMouseDown={(e) => {
                            e.preventDefault();
                            toggleBlockType("code-block");
                        }}>
                            <FaCode />
                        </button>
                    </Tooltip>

                    <Tooltip text='Block Quote' tooltipId='bloclquotes'>
                        <button className={`p-2 rounded-lg bg-main/30 cursor-pointer duration-150 hover:bg-card/40 `} type="button" onMouseDown={(e) => {
                            e.preventDefault();
                            toggleBlockType("blockquote");
                        }}>
                            <FaIndent />
                        </button>
                    </Tooltip>
                </ul>
            </div>

            <div className="w-full min-h-[45rem] p-5 text-white" onClick={() => editorRef.current && editorRef.current.focus()}>
                {!content || content === "" ? <p className="animate-pulse">|</p> : null}
                <Editor
                    ref={editorRef}
                    editorState={editorState}
                    onChange={onChange}
                    customStyleMap={styleMap}
                    blockStyleFn={getBlockStyle}
                    autoCorrect="on"
                    spellCheck={true}
                
                />
            </div>
        </div>
    );
}
