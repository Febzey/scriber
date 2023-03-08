export default function NavBar() {
    return (
        <nav className="w-full h-20 flex items-center justify-between px-8 relative">
            <ul className="flex flex-row gap-3 items-center justify-center text-neutral-400">
                <li>Home</li>
                <li>Create</li>
            </ul>

            <NavSearch />
        </nav>
    )
}

const NavSearch = () => {
    return (
        <div className="absolute text-center right-0 left-0">
            <div className="flex items-center justify-center gap-2">
                <input
                    type="text"
                    id="searchbar"
                    placeholder="Search for a post or user."
                    className="bg-neutral-700 p-1 text-sm text-center placeholder-neutral-400 rounded text-neutral-100"
                />
                <button className="p-1 text-sm bg-emerald-500 rounded text-black font-bold">Search</button>
            </div>
        </div>
    )
}