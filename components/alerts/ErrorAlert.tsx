"use client";

import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

interface AlertProps {
    props: {
        title: string,
        text: string
    }
}

export default function ErrorAlert({ props }: AlertProps) {
    const { title, text } = props;

    const [isActive, setActive] = useState(true);

    useEffect(() => {
        setTimeout(() => {setActive(false)}, 5000)
    }, [])

    return isActive
        ? (
            <div className="absolute flex-col w-full inset-0 py-12 flex justify-end items-center min-h-screen">
                <div className="bg-orange-100 lg:w-1/3 fixed w-[95%] mx-auto border-l-4 border-orange-500 text-orange-700 p-4" role="alert">

                    <div className="w-full h-full relative">
                        <button onClick={()=>setActive(false)} className="top-0 bottom-0 right-4 absolute text-xl"><FaTimes/></button>
                        <p className="font-bold">{title}</p>
                        <p>{text}</p>
                    </div>
                </div>
            </div>

        )
        : null;
}