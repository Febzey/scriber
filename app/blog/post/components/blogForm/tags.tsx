import { SetStateAction, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

const preMadeTags: Tag[] = [
    { color: "bg-teal-500", text: "Java" },
    { color: "bg-blue-500", text: "JavaScript" },
    { color: "bg-red-500", text: "Python" },
    { color: "bg-yellow-500", text: "React" },
    { color: "bg-green-500", text: "Node.js" },
    { color: "bg-indigo-500", text: "CSS" },
    { color: "bg-purple-500", text: "HTML" },
    { color: "bg-pink-500", text: "Vue.js" },
    { color: "bg-gray-500", text: "Git" },
    { color: "bg-teal-500", text: "TypeScript" },
  ];

interface BlogTagProps {
    tags: Tag[],
    setTags: React.Dispatch<SetStateAction<Tag[]>>
}
export default function BlogTags({ props }: { props: BlogTagProps }) {
    const { tags, setTags } = props;

    const [newTag, setNewTag] = useState("");

    const addNewTag = () => {
        if (!newTag || tags.length > 12) return;

        let tag = { color: null, text: newTag } as Tag;
        const preMade = preMadeTags.filter(obj => obj.text.toLocaleLowerCase().includes(newTag.toLocaleLowerCase()))[0];
        if (preMade) {
            tag = preMade;
        }

        setNewTag("")
        
        if (tags.length === 0) {
            setTags([tag]);
        } else {
            setTags((prevTags) => [...prevTags, tag]);
        }
    }

    const deleteTag = (index: number) => {
        setTags(prevTags => prevTags.filter((tag,i) => i !== index))
    }

    return (
        <div className="w-full max-w-full flex flex-row flex-wrap gap-4 items-center justify-start border-gray-700/50 border-2 p-4 rounded-lg h-auto min-h-[5rem]">

            <div className="flex bg-gray-700/50 p-2 lg:w-24 rounded flex-row items-center justify-center gap-2">
                <input
                    type="text"
                    className="bg-transparent w-full pl-0 placeholder-neutral-300 text-xs text-white"
                    placeholder="New Tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}

                />
                <button type="button" onClick={() => addNewTag()}>
                    <FaPlus className="text-white text-md" />
                </button>
            </div>

            {
                tags.length > 0
                    ?
                    tags.map((tag, index) => (
                        <BlogTag tag={tag} index={index} deleteTag={deleteTag} />
                    ))
                    : null
            }

        </div>
    )
}

const BlogTag = ({ tag, index, deleteTag }: { tag: Tag, index: number, deleteTag: (index: number) => void }) => {
    return (
        <div key={index} className={`${tag.color ? `${tag.color}` : "bg-gray-700/50"} text-xs flex flex-row gap-3 px-4 rounded py-2 items-center justify-center text-white`}>
            <p>{tag.text}</p>
            <button type="button" onClick={()=>deleteTag(index)}>
                <FaTimes/>
            </button>
        </div>
    )
}