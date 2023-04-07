"use client";

import Image from "next/image"
import Link from "next/link"
import { FaLink, FaSpinner } from "react-icons/fa";
import Tooltip from "../../../../components/tooltips/tooltip";
import { useEffect, useState } from "react";
import { useUserContext } from "../../../providers";

interface ProfileCardProps {
    props: {
        user: UserShown,
        userOwnsProfile: boolean,
        publishedPostsCount: number
    }
}

export default function ProfileCard({ props }: ProfileCardProps) {
    const { user, userOwnsProfile, publishedPostsCount } = props;

    const [editProfile, setEditProfile] = useState(false);

    const userProfileContext = useUserContext();

    const userProfile = userProfileContext.user;

    let { description, followers, following, id, image, liked_posts, links, name, realname } = user;

    links = JSON.parse(links as string);

    return (
        <div className="flex w-full lg:w-[40%]  lg:min-h-[40em] lg:h-[30%] flex-col items-center justify-start mx-auto p-4 mb-8 lg:mb-0  rounded-lg lg:p-8">

            <div className="w-full pt-3 flex flex-col">
                <div className="mr-auto flex flex-col-reverse justify-center items-center w-full">

                    <div className="flex flex-col items-center gap-0 w-full border-b-2  border-b-indigo-200/10 pb-8">
                        {
                            userOwnsProfile
                                ?
                                <div className="flex flex-col items-center w-full ">
                                    <Tooltip text="Edit Avatar" tooltipId="edit-avatar">
                                        <Image src={image ?? ""} alt="userprofileimg" width={150} height={150} className="rounded-full mr-auto lg:mx-auto" />
                                    </Tooltip>

                                    <button onClick={() => setEditProfile(true)} className="mb-3 mt-4 rounded-full text-sm px-3 py-1 ring-1 ring-main-purple text-main-purple hover:text-white duration-100 hover:bg-main-purple mr-auto lg:mx-auto">Edit Profile</button>
                                </div>
                                :
                                <Image src={image ?? ""} alt="userprofileimg" width={180} height={180} className="rounded-full mr-auto lg:mx-auto" />

                        }

                        <h1 className="font-bakbak text-3xl  text-main-dark/80 mr-auto">{name}</h1>

                        {
                            !editProfile
                                ?
                                <>
                                    {description && <p className="text-main-dark text-lg break-words mr-auto">{description}</p>}

                                    {links && (links.length > 0 && Array.isArray(links)) && (
                                        <ul className="flex flex-col bg-second-dark ring-main-accent-dark/50 ring-1 mt-2 p-2 px-3 justify-center rounded w-full">
                                            {links.map((link, index) => (
                                                <li key={index} className="inline-flex items-center text-xs text-neutral-200 gap-2">
                                                    <FaLink />
                                                    <a href={link} className="text-main-dark/80 text-sm">{link}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                </>
                                :
                                <EditProfile props={{ userProfileContext, setEditProfile }} />
                        }

                    </div>
                </div>



            </div>



            <div className="mr-auto border-b-2 w-full border-b-indigo-200/10 py-3 flex  flex-col">
                <p className="text-neutral-300 text-xs">Rank: <span className="text-[#ffffff] font-bold">1000</span></p>
                <p className="text-neutral-300 text-xs">Blogs Published: <span className="text-[#ffffff] font-bold">{publishedPostsCount}</span></p>
            </div>

            <div className="mr-auto border-b-2 w-full border-b-indigo-200/10 py-3 flex  flex-col">
                <Link href="" className="text-indigo-300 text-xs">Liked Posts</Link>
            </div>
        </div>
    )
}







interface EditProfileProps {
    props: {
        userProfileContext: UserContextProps,
        setEditProfile: React.Dispatch<boolean>
    }
}

function EditProfile({ props }: EditProfileProps) {
    const { userProfileContext, setEditProfile } = props;

    const { description, id, links } = userProfileContext.user ?? {};

    const [isSaving, setisSaving] = useState(false);

    const [localDescription, setDescription] = useState("");

    const [url1, setUrl1] = useState("");
    const [url2, setUrl2] = useState("");
    const [url3, setUrl3] = useState("");


    useEffect(() => {
        if (links && links.length > 0) {
            setUrl1(links[0] || "");
            setUrl2(links[1] || "");
            setUrl3(links[2] || "");
        };

        if (description) setDescription(description);

    }, [])

    const handleSubmit = async () => {
        const links: string[] = [];

        url1 && !links.includes(url1) &&links.push(url1);
        url2 && !links.includes(url2) &&links.push(url2);
        url3 && !links.includes(url3) &&links.push(url3);

        setisSaving(true);



        await new Promise(r => setTimeout(r, 1000));


        try {
            const res = await fetch("http://localhost:3000/api/user/update/profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id,
                    description: localDescription,
                    links,
                })
            })
            if (!res.ok || !res) return setEditProfile(false);

            userProfileContext.setUser(prev => prev && {
                ...prev,
                description: localDescription,
                links: links.length > 0 ? links : prev.links || [],
            });
            
        } catch (Err) {
            console.error(Err);
        }

        setisSaving(false);
        setEditProfile(false);

    };

    return (
        <div className="w-full h-[30rem] gap-4 flex flex-col items-center justify-start mt-8">

            <div className="flex flex-col w-full">
                <label className="mr-auto text-main-dark/80">Bio</label>
                <textarea
                    value={localDescription}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full ring-1 ring-main-accent-dark bg-white/10 h-[6rem] max-h-[7rem] min-h-[5rem] bg-card/80 rounded p-2 text-slate-200 placeholder-main-dark/60"
                    placeholder={`${description ? description : "Description"}`}
                    maxLength={50}
                />
            </div>

            <div className="flex flex-col w-full gap-3">
                <label className="mr-auto text-main-dark/80">Links</label>

                <div className="gap-1 ring-1 ring-main-accent-dark w-full flex flex-row items-center justify-center bg-white/10 bg-card/80 rounded p-2 text-slate-200">
                    <FaLink />
                    <input
                        value={url1}
                        onChange={(e) => setUrl1(e.target.value)}
                        placeholder="Link"
                        type="text"
                        className="w-full bg-transparent placeholder-main-dark/60 text-sm"
                    />
                </div>
                <div className="gap-1 ring-1 ring-main-accent-dark w-full flex flex-row items-center justify-center bg-white/10 bg-card/80 rounded p-2 text-slate-200">
                    <FaLink />
                    <input
                        value={url2}
                        onChange={(e) => setUrl2(e.target.value)}
                        placeholder="Link"
                        type="text"
                        className="w-full bg-transparent placeholder-main-dark/60 text-sm"
                    />
                </div>
                <div className="gap-1 ring-1 ring-main-accent-dark w-full flex flex-row items-center justify-center bg-white/10 bg-card/80 rounded p-2 text-slate-200">
                    <FaLink />
                    <input
                        value={url3}
                        onChange={(e) => setUrl3(e.target.value)}
                        placeholder="Link"
                        type="text"
                        className="w-full bg-transparent placeholder-main-dark/60 text-sm"
                    />
                </div>


            </div>


            <div className="flex flex-row gap-2 items-center justify-center text-sm ml-auto mt-auto">
                <button onClick={() => setEditProfile(false)} className="text-main-dark underline-offset-2 decoration-2 underline duration-150 hover:text-main-dark/50 active:text-main-dark/30">back</button>
                <button onClick={() => handleSubmit()} className="px-3 py-1 text-white bg-main-purple rounded text-center active:bg-main-purple/50 hover:bg-main-purple/70 duration-150">
                    {
                        !isSaving
                            ? "Save"
                            : <FaSpinner className="text text-lg animate-spin" />
                    }
                </button>

            </div>

        </div>
    )
}