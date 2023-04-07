"use client";
import { FaUserPlus } from "react-icons/fa";

export default function FollowUserButton() {

    const handleFollow = () => {

    };

    return (
        <button onClick={() => handleFollow()}
            className="active:bg-emerald-500 text-center bg-white px-3 py-1 rounded-full text-black  font-bold text-sm inline-flex items-center gap-1">
            Follow <FaUserPlus />
        </button>
    )
}