"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

export const NavSearch = () => {

    const [searchInput, setSearch] = useState("")

    return (
        <div className="absolute text-center right-0 left-0 z-0">
            <div className="flex items-center justify-center gap-2 h-8">
                <input
                    type="text"
                    id="searchbar"
                    placeholder="Search for a post or user."
                    onChange={(e)=>setSearch(e.target.value)}
                    value={searchInput}
                    className="bg-neutral-700 px-3 py-2 h-9 text-sm text-center placeholder-neutral-400 rounded text-neutral-100"
                />
                {
                    searchInput !== ""
                        ? <Link href={"/search/paramshere"} className="h-9 bg-gradient-to-r p-0.5 flex rounded">
                            <span className="py-2 text-lg text-white bg-neutral-900">
                                <FaSearch />
                            </span>
                        </Link>
                        : null
                }
            </div>
        </div>
    )
}